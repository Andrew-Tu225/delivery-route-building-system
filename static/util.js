function setDepot() {
  const depotContainer = document.getElementById("depot_data");

  if (!selectedPlace) {
    alert("Please search and select a place first!");
    return;
  }

  // Show depot info
  depotContainer.innerHTML = "";
  const depotDiv = document.createElement("div");
  const name = document.createElement("p");
  const coords = document.createElement("p");
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";

  cancelBtn.onclick = cancelDepot;

  name.textContent = `Depot: ${selectedPlace.name}`;
  coords.textContent = `(${selectedPlace.geometry.location.lat().toFixed(5)}, ${selectedPlace.geometry.location.lng().toFixed(5)})`;

  depotDiv.dataset.name = selectedPlace.name;
  depotDiv.dataset.lat = selectedPlace.geometry.location.lat();
  depotDiv.dataset.lng = selectedPlace.geometry.location.lng();

  depotDiv.appendChild(name);
  depotDiv.appendChild(coords);
  depotDiv.appendChild(cancelBtn);
  depotContainer.appendChild(depotDiv);

  cancelBtn.style.display = "inline-block";
}

function cancelDepot() {
  const depotContainer = document.getElementById("depot_data");

  depotContainer.innerHTML = "";

  // Remove marker and clear selected place
  if (depotMarker) {
    depotMarker.setMap(null);
    depotMarker = null;
  }
  selectedPlace = null;

  document.getElementById("depotInput").value = "";
}

function addPoint(){
  let demand = parseInt(document.getElementById("demandInput").value);

  if(!selectedPoint){
    alert("point cannot be empty");
    return;
  }
  if(!demand || demand <= 0){
    alert("num people cannot be empty and has to be greater than 0");
    return;
  }

  let pointsContainer = document.getElementById("pointContainer");

  let newPointDiv = document.createElement("div");
  let name = document.createElement("p");
  let coordinate = document.createElement("p");
  let numPeople = document.createElement("p");
  let cancelBtn = document.createElement("button");

  cancelBtn.textContent = "cancel";
  cancelBtn.onclick = () => cancelPoint(newPointDiv)

  name.textContent = `Point: ${selectedPoint.name}`;
  coordinate.textContent = `(${selectedPoint.geometry.location.lat().toFixed(5)}, ${selectedPoint.geometry.location.lng().toFixed(5)})`;
  numPeople.textContent = demand;

  newPointDiv.dataset.name = selectedPoint.name;
  newPointDiv.dataset.lat = selectedPoint.geometry.location.lat();
  newPointDiv.dataset.lng = selectedPoint.geometry.location.lng();
  newPointDiv.dataset.demand = demand;

  newPointDiv.appendChild(name);
  newPointDiv.appendChild(coordinate);
  newPointDiv.appendChild(numPeople);
  newPointDiv.appendChild(cancelBtn);

  pointsContainer.appendChild(newPointDiv);
  
  pointMarkers.push({marker:pointMarker, element:newPointDiv});

  pointMarker = null;
  selectedPoint = null;
}

function cancelPoint(pointDiv){
  let deletedMarker = pointMarkers.find(m => m.element === pointDiv);

  if(deletedMarker){
    deletedMarker.marker.setMap(null);
    pointMarkers.filter(m => m !== deletedMarker);
  }

  pointDiv.remove();
  document.getElementById("pointInput").value = "";
  document.getElementById("demandInput").value = "";
}