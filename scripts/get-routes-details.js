window.onload = getRouteData;

 //function to set the map
function  initMap(startLat,startLng,endLat,endLng){
	const map = new google.maps.Map(document.getElementById("map-canvas"),{
		zoom :10,
		center: {lat:parseFloat(startLat),lng: parseFloat(startLng)},
		mapTypeId:"roadmap"		 
	 });
	
	 // start  route marker
	const startRouteMarker = new google.maps.Marker({
		position:{lat: parseFloat(startLat), lng: parseFloat(startLng)},
		map: map,	
	 });
	 
	 //window information
	var infowindow1 = new google.maps.InfoWindow({
		content: 'Start Route'
	});
	//pop up message when clicked
	google.maps.event.addListener(startRouteMarker, 'click', function() {
 	// call to open method for Start Marker
		infowindow1.open(map, startRouteMarker);
	});

	//end route marker
	const endRouteMarker = new google.maps.Marker({
		position: {lat: parseFloat(endLat), lng: parseFloat(endLng)},
		map: map,
	});
	//window information
	var infowindow2 = new google.maps.InfoWindow({
		content: 'End Route'
	});
	//pop up message when clicked
	google.maps.event.addListener(endRouteMarker, 'click', function() {
 	// call to open method for Start Marker
		infowindow2.open(map, endRouteMarker);
	});
	
	//route line
	const showRouteCoords = [
		{lat: parseFloat(startLat), lng: parseFloat(startLng)},
		{lat: parseFloat(endLat), lng: parseFloat(endLng)}
	];
	
	const showRoute = new google.maps.Polyline({
    path: showRouteCoords,
    geodesic: true,
    strokeColor: "#F5B041 ",
    strokeOpacity: 1.0,
    strokeWeight: 4
	});
	showRoute.setMap(map);

    //https://developers.google.com/maps/documentation/javascript/geolocation
	// user current position 
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			const pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			const marker = new google.maps.Marker({
				position: pos,
				map: map,
			});
			marker.setIcon("../img/pin.png");
			map.setCenter(pos);
			//window information
			var infowindow3 = new google.maps.InfoWindow({
				content: 'You are Here'
			});
			//pop up message when clicked
			google.maps.event.addListener(marker, 'click', function() {
			// call to open method for user position
				infowindow3.open(map, marker);
			});
		}, 
		function() {
			//location error
			alert("location not supported");
		});
	} else {
	  // Geolocation not supported
	  alert("Geolocation not supported");
	}	
}



 //function to retrieve route details
let xhr = false;

function getRouteData() {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		if (window.ActiveXObject) {
				xhr = newActiveXObject("Microsoft.XMLHTTP");
		}
	}
	if (xhr) {
		xhr.open("GET", "../data/routes.json", true);
		xhr.send(); 
		xhr.onreadystatechange = displayRouteData; 
	} else {
		document.getElementById("statusRoutesMsg").innerHTML = "Error. Request data error";
	}	
}

function displayRouteData () {
	if (xhr.readyState == 4) {
	    if (xhr.status == 200) {
		    const data = JSON.parse(xhr.responseText); 
			let dataText = "";
			const url = $(location).attr("search"); 
			const params = new URLSearchParams(url);
			
			for (let i in data.routes) {
				if (data.routes[i].routesID === params.get("routesId")) {
					dataText += "<tr><td class='text-center'><strong>" + 
					data.routes[i].name + "</strong></td><td class='text-center'>" +
					data.routes[i].day + "</td><td>" +
					data.routes[i].time+ "</td><td>" +
					data.routes[i].highlights + "</td><td>" +
					data.routes[i].start.lat + data.routes[i].start.lng +"</td><td>" +
					data.routes[i].end.lat + data.routes[i].end.lng  + "</td><td>" +
					"<img class='img-fluid' src='../img/" + data.routes[i].image +"'></td></tr>";
					//include route data as parameters for the initMap  function
					initMap(data.routes[i].start.lat, data.routes[i].start.lng, data.routes[i].end.lat, data.routes[i].end.lng)
				}
				
			}
			document.getElementById("insert-route-data").innerHTML = dataText;
		} else {
		    document.getElementById("statusRoutesMsg").innerHTML = "Error. Request data error:  " + xhr.status;
		}
	}
}
