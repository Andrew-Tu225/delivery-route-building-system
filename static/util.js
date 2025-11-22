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

  depotDiv.id = "depot-data";

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
  let numPeople = document.createElement("p");
  let cancelBtn = document.createElement("button");

  cancelBtn.textContent = "cancel";
  cancelBtn.onclick = () => cancelPoint(newPointDiv)

  name.textContent = `Address: ${selectedPoint.name}`;
  numPeople.textContent = `Demand: ${demand}`;

  newPointDiv.dataset.name = selectedPoint.name;
  newPointDiv.dataset.lat = selectedPoint.geometry.location.lat();
  newPointDiv.dataset.lng = selectedPoint.geometry.location.lng();
  newPointDiv.dataset.demand = demand;

  newPointDiv.appendChild(name);
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

async function generateRoutes(){
  const depotDiv = document.getElementById("depot-data");

  depot = {
    name : depotDiv.dataset.name,
    lat : depotDiv.dataset.lat,
    lng : depotDiv.dataset.lng
  }

  points = [];
  const pointsContainer = document.getElementById("pointContainer");
  const pointsDiv = pointsContainer.querySelectorAll("div");

  pointsDiv.forEach(pointDiv => {
    point = {
      name : pointDiv.dataset.name,
      lat : pointDiv.dataset.lat,
      lng : pointDiv.dataset.lng,
      demand : pointDiv.dataset.demand
    }
    points.push(point);
  })

  const res = await fetch("api/generate-routes", {
    method : "POST",
    headers : { "Content-Type": "application/json" },
    body : JSON.stringify({
      depot,
      points,
      vehicleCapacity: 30,
    }),
  })

  console.log(res);
}