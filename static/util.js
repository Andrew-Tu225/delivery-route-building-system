function setDepot() {
  const depotContainer = document.getElementById("depot_data");

  if (!selectedPlace) {
    alert("Please search and select a place first!");
    return;
  }

  // Show depot info
  depotContainer.innerHTML = "";
  const depotDiv = document.createElement("div");
  depotDiv.id = "depot-data";

  depotDiv.dataset.name = selectedPlace.name;
  depotDiv.dataset.lat = selectedPlace.geometry.location.lat();
  depotDiv.dataset.lng = selectedPlace.geometry.location.lng();

  depotContainer.appendChild(depotDiv);

  cancelBtn.style.display = "inline-block";

  addContentInfoToDepotMarker(depotMarker, depotDiv);
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

  newPointDiv.dataset.name = selectedPoint.name;
  newPointDiv.dataset.lat = selectedPoint.geometry.location.lat();
  newPointDiv.dataset.lng = selectedPoint.geometry.location.lng();
  newPointDiv.dataset.demand = demand;

  pointsContainer.appendChild(newPointDiv);
  
  pointMarkers.push({marker:pointMarker, element:newPointDiv});
  addContentInfoToPointMarker(pointMarker, newPointDiv);

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

function addContentInfoToPointMarker(marker, pointDiv){
  const content = `
    <div style="font-size:14px; line-height:1.4">
      <strong>${pointDiv.dataset.name}</strong><br/>
      Lat: ${pointDiv.dataset.lat}<br/>
      Lng: ${pointDiv.dataset.lng}<br/>
      Demand: ${pointDiv.dataset.demand}
      <button id="cancelPointBtn" style="
        margin-top: 10px;
        padding: 6px 10px;
        background: #e63946;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Cancel Point</button>
    </div>
  `;

  marker.addListener("click", () => {
    infoWindow.setContent(content);
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false
    });

    google.maps.event.addListenerOnce(infoWindow, "domready", () => {
    document
      .getElementById("cancelPointBtn")
      .addEventListener("click", () => cancelPoint(pointDiv));
  });
  });
}

function addContentInfoToDepotMarker(marker, depotDiv){
  const content = `
    <div style="font-size:14px; line-height:1.4">
      <strong>${depotDiv.dataset.name}</strong><br/>
      Lat: ${depotDiv.dataset.lat}<br/>
      Lng: ${depotDiv.dataset.lng}<br/>
      <button id="cancelDepotBtn" style="
        margin-top: 10px;
        padding: 6px 10px;
        background: #e63946;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Cancel Depot</button>
    </div>
  `;

  marker.addListener("click", () => {
    infoWindow.setContent(content);
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false
    });

    google.maps.event.addListenerOnce(infoWindow, "domready", () => {
    document
      .getElementById("cancelDepotBtn")
      .addEventListener("click", () => cancelDepot());
  });
  });
}