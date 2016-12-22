"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var inject = require("gulp-inject");
var run = require("run-sequence");
var del = require("del");


gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


gulp.task("imageOptimization", function() {
  return gulp.src("img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});


gulp.task("svgOptimization", function() {
  return gulp.src("img/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("build/img"));
});


gulp.task("svgSprite", function() {
  var svgs = gulp
    .src("img/icons/*.svg")
    .pipe(svgstore({ inlineSvg: true}));
  function fileContents(filePath, file) {
    return file.contents.toString();
  }
  return gulp.src("*.html")
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("build/"))
});


gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "js/**"
  ], {
    base: "."
  })
    .pipe(gulp.dest("build"));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "./build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}");
  gulp.watch("*.html").on("change", server.reload);
  gulp.watch("js/**/*.js").on("change", server.reload);
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "imageOptimization",
    "svgOptimization",
    "svgSprite",
  fn);
});

