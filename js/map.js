function initMap() {
  var mapCenter = {lat: 59.9367, lng: 30.3215};
  var mishka = {lat: 59.9363, lng: 30.3217};

  var map = new google.maps.Map(document.querySelector(".contacts__map-container"), {
    zoom: 16,
    center: mapCenter
  });

  var marker = new google.maps.Marker({
    position: mishka,
    map: map,
    title: "Мишка: Милые штуки ручной работы для дома",
    icon: "img/icon-map-pin.svg"
  });
}
