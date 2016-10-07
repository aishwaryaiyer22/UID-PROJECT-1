// function getInfo(containerId, childID){

// var civicInfo = require("civic-info")({apiKey: 'AIzaSyDURNcNFnKTwcwtgO9-x4JUs3g1HT_H9RI'});

// // Alternatively, you can set a GOOGLE_API_KEY environment variable and instantiate like so:
// //var civicInfo = require("civic-info")();
// civicInfo.voterInfo({address: document.getElementById(childID)}, function(error, data) {
//   console.log(data);
// });

// }
GOOGLE_API_KEY = "AIzaSyDURNcNFnKTwcwtgO9-x4JUs3g1HT_H9RI"
//var address = "1263 Pacific Ave. Kansas City, KS"
function getInfo(){
	var string = "";
	var finalUrl = "https://www.googleapis.com/civicinfo/v2/representatives";
	if (document.getElementById("Address").value!= "") {
		finalUrl += "?address="+document.getElementById("Address").value;
		// console.log(document.getElementById("Address").value);
	}
	else {
		window.alert("Please enter address.");
		return;
	}	
	if (document.getElementById("includeOffice")!= null)  
		finalUrl += "&includeOffices="+document.getElementById("includeOffice").value;
	
	if (document.getElementById("levels")!= null) {
		var select1 = document.getElementById("levels");
	    for (var i = 0; i < select1.length; i++) {
	        if (select1.options[i].selected) 
	        	finalUrl += "&levels="+select1.options[i].value;
	    }
    	// console.log(finalUrl);
	}

		
	if (document.getElementById("roles") != null) {
		var select1 = document.getElementById("roles");
	    for (var i = 0; i < select1.length; i++) {
	        if (select1.options[i].selected) 
	        	finalUrl += "&roles="+select1.options[i].value;
	    }
    	// console.log(finalUrl);
	}
		
	finalUrl += "&key="+GOOGLE_API_KEY
	console.log("finalUrl "+finalUrl);
	//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
	  		string = JSON.parse(this.responseText);
	  		// stringified = JSON.stringify(this.responseText);
	  		document.getElementById("output").innerHTML = "Success";
	  		document.getElementById("loadingbutton").innerHTML = "<img src=tumblr_nh1mchoRUh1sqqx06o1_500.gif style=width:40px;height:40px;align:center;>";
	  		document.getElementById("formpage").style.display = "hidden";
	  		open_display(string);
	  		// console.log(stringified);
	  }
	  else {
	  	console.log(this.status);
	  }
	};
	xhttp.open("GET", finalUrl, true);
	xhttp.send();
}