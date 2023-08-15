//hold the button action  in a variable
let addToFavsBtn = document.getElementById("addtofavorites");

//hold the event handler  of the button 
//function to get the routes Id  if exist,otherwise we create it.
addToFavsBtn.onclick = function() {
	const url = $(location).attr("search"); 
	const params = new URLSearchParams(url);
	let routesID = params.get("routesId");
	let routes;
	if (localStorage.getItem("routes") === null ) {
		routes = [];
	} else {
		routes = JSON.parse(localStorage.getItem("routes"));
	}
	if(routes.indexOf(routesID) === -1) { 
	routes.push(routesID);
	localStorage.setItem('routes', JSON.stringify(routes));	
	}else{
		alert('already saved');
	}
}

