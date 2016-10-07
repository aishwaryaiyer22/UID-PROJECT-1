function open_display(response) {
	// var opened = 
	document.open();
	htmlstr = "<html><script type=text/javascript source =display_info.js></script><body>Hello<div id=info></div><div id=pagePosition></div></body><html>"
	var table_data;
	for (i = 0; i < response["officials"].length; i++) {

	}
	// console.log(response["officials"][0]["name"]);
	// newPageHtml = "<body>"
	// for (i =0; i < response["officials"].length; i++)
	// 	console.log(response["officials"][i]["name"]);
	// document.write(htmlstr);
	// var newTable = document.createElement('table');
 //    var tableHeadingRow = document.createElement('tr');
 //    var tableHeader = document.createElement('th');
 //    tableHeadingRow.appendChild(tableHeader);
    
	document.getElementById("info").innerHTML = "Whats up";
}

function min(a,b) {
	return a<b?a:b;
}