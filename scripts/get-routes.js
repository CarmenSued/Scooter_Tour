window.onload = getRoutes; 

let xhr = false;

function getRoutes() {
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
		xhr.onreadystatechange = displayRoutes; 
	} else {
		document.getElementById("statusRoutesMsg").innerHTML = "Error. Request data error";
	}	
}
// get data from jason and display if there is no errors

function displayRoutes() {
	if (xhr.readyState == 4) {
	    if (xhr.status == 200) {
		    const data = JSON.parse(xhr.responseText); 
			let dataText = "";
			const url = $(location).attr("search"); 
            const params = new URLSearchParams(url);
            console.log(params);
          
			for (let i in data.routes) {
					dataText += "<tr><td><strong>" + 
					data.routes[i].name + "</strong></td><td class='text-center'>" +
					data.routes[i].day + "</td><td>" +
					data.routes[i].time+ "</td><td>" +
					data.routes[i].highlights + "</td><td>" +
					"<a href='route.html?routesId=" + data.routes[i].routesID  + " 'class='btn btn-sm btn-primary'>Details</a>" + 
					"</td></tr>";
			} 
            
			if (dataText.length < 1) {
					document.getElementById("routestable").style.display = "none";
					document.getElementById("statusRoutesMsg").style.display = "block";
					document.getElementById("statusRoutesMsg").innerHTML = "No Routes Found";	
			}
			document.getElementById("insert-route-data").innerHTML = dataText;
		} else {
		document.getElementById("statusRoutesMsg").innerHTML = "Error. Request data error: " + xhr.status;
		}
	}
}