window.onload = getFavoriteRoutes;

let xhr = false;

function getFavoriteRoutes() {
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
		xhr.onreadystatechange = displayFavoriteRoutes; 
	} else {
        document.getElementById("statusRoutesMsg").innerHTML = "Error. Request data error";
	}	
}

function displayFavoriteRoutes() {
	if (xhr.readyState == 4) {
	    if (xhr.status == 200) {
		    const data = JSON.parse(xhr.responseText); 
			let dataText = "";
			const favorites = getLocalStorage();
			for (let l = 0; l < favorites.length; l++){
				for (let i in data.routes) {
					if (parseInt(favorites[l]) === parseInt(data.routes[i].routesID)){
                        dataText += "<tr><td class='text-center'><strong>" + 
                        data.routes[i].name + "</strong></td><td class='text-center'>" +
                        data.routes[i].day + "</td><td >" +
                        data.routes[i].time+ "</td><td >" +
                        data.routes[i].highlights + "</td><td>" +
						"<a href='route.html?routesId=" + data.routes[i].routesID  + " 'class='btn btn-sm btn-primary'>Details</a>"+
						"</td><td class='text-center'>" + 
						"<button  class='btn btn-sm btn-warning  remove-btn' data-toggle='modal' data-target='#delete-modal'>Delete</button>" + "</td></tr>";				
											
					}
				}
			}
			document.getElementById("insert-route-data").innerHTML = dataText;
			attachRemoveBtnsFavEventListener();

		} else {
		    document.getElementById("statusRoutesMsg").innerHTML = "Error. Request data error:  " + xhr.status;
		}
	}
}
//get item from local storage
function getLocalStorage() {	
	const routeFavorites = JSON.parse(window.localStorage.getItem('routes'));	
		return routeFavorites; 
				
}


//remove item function
//create an event listener for the button to remove the items added in favorute page
function attachRemoveBtnsFavEventListener() {
	const removeFavsBtns = document.querySelectorAll('.remove-btn');
		removeFavsBtns.forEach((btn,index) => {
			btn.onclick = function(e) {
			const routes = getLocalStorage();
			routes.splice(index,1);
			btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode); 
			localStorage.setItem('routes', JSON.stringify(routes));	
		  }
	}); 
}





