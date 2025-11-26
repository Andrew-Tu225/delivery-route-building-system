let selectedPlace = null;
let depotMarker = null;

let selectedPoint = null;
let pointMarker = null;
let pointMarkers = [];

let infoWindow;

function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.65, lng: -79.38 },
    zoom: 12,
  });

  infoWindow = new google.maps.InfoWindow();
  
  window.map = map;
  window.googleMaps = google.maps;
  window.directionsService = new google.maps.DirectionsService();


  const input = document.getElementById("depotInput");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      alert("No details available for this place!");
      return;
    }

    selectedPlace = place;

    // Center and preview marker
    map.setCenter(place.geometry.location);
    map.setZoom(16);

    // If preview marker already exists, remove it
    if (depotMarker) depotMarker.setMap(null);

    depotMarker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });
  });

  const pointInput = document.getElementById("pointInput");
  const pointAutocomplete = new google.maps.places.Autocomplete(pointInput);
  pointAutocomplete.bindTo("bounds", map);

  pointAutocomplete.addListener("place_changed", () => {
    const place = pointAutocomplete.getPlace();

    if (!place.geometry) return;

    selectedPoint = place;
    
    map.setCenter(place.geometry.location);
    map.setZoom(16);

    pointMarker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    });
  });
}