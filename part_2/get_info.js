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
function getInfo_test(){
	console.log(address);
	var string = "";
	var finalUrl = "https://www.googleapis.com/civicinfo/v2/representatives";
	if (document.getElementById("address")!= null) {
		finalUrl += "?address="+document.getElementById("address").value;
		console.log(document.getElementById("address").value);
	}
	if (document.getElementById("offices")!= null) 
		finalUrl += "&includeOffices="+document.getElementById("offices").value;
	if (document.getElementById("levels")!= null) 
		finalUrl += "&levels="+document.getElementById("levels").value;
	if (document.getElementById("roles") != null) 
		finalUrl += "&roles="+document.getElementById("offices");
	finalUrl += "&key="+GOOGLE_API_KEY
	console.log("finalUrl "+finalUrl);
	//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
	  		string = JSON.stringify(this.responseText);
	  		document.getElementById("output").innerHTML = "Success";
	  		console.log(string);
	  }
	  else {
	  	console.log(this.status);
	  }
	};
	xhttp.open("GET", finalUrl, true);
	xhttp.send();
}