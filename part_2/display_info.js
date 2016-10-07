function open_display(response) {
	// var opened = 
	document.open();
	initialHtml = getinitialHtml()
	document.write(initialHtml);
	console.log(initialHtml);

	numberOfficials = response["officials"].length;
	numberOffices = response["offices"].length;
	var pages;
	if((numberOffices + numberOfficials)%10 == 0)
		pages = (numberOffices + numberOfficials)/10;
	else
		pages = ((numberOffices + numberOfficials)/10) + 1;

	first_page = getOfficialsInfoOnPage(response, 1);
console.log(response["officials"][0]["address"][0]["city"]);
	
	// reprImage = "<img src="+response["officials"][0]["photoUrl"]+" style = width:228px;height:228px;>";
	// reprData = "<p>"+response["officials"][0]["name"]+"</p>";

	// for (i = 0; i < response["officials"].length; i++) {

	// }


	// console.log(response["officials"][0]["name"]);
	// newPageHtml = "<body>"
	// for (i =0; i < response["officials"].length; i++)
	// // 	console.log(response["officials"][i]["name"]);
	document.getElementById("results").innerHTML = first_page;


}

function min(a,b) {
	return a<b?a:b;
}

function getOfficialsInfoOnPage(response, page) {
	index = (page-1)*10;
	var search_result_html = ""
	if (index == 1) 
		search_result_html = "<div class=container>";
	i = index
	search_result_html +="<div class=row><div class=\"col-md-5\" style = width:300px;height=200px;><a href=#><img class=img-responsive src="+response["officials"][index]["photoUrl"]+"></a></div><div class=col-md-5><h4>Name: "+response["officials"][index]["name"]+"</h4>"+"<h4>Party: "+response["officials"][index]["party"]+" </h4><h4>Address: "+response["officials"][i]["address"][0]["line1"]+","+response["officials"][i]["address"][0]["line2"]+","+response["officials"][i]["address"][0]["city"]+","+response["officials"][i]["address"][0]["state"]+","+response["officials"][i]["address"][0]["zip"]+"</h4>";
	//console.log(search_result_html);
	for(i; i<min(index+10,response["officials"].length);i++) 
		//search_result_html += "<div class=row><div class=col-md-3><a href=#><img class=img-responsive src="+response["officials"][i]["photoUrl"]+"></a></div><div class=col-md-5><h4>Name: </h4>"+response["officials"][i]["name"]+"<h4>Party:  </h4>"+response["officials"][i]["party"]+"<h4>Address:</h4><p>"+response["officials"][i]["address"][0]["line1"]+" "+[response["officials"][i]["address"][0]["line2"]+" "+response["officials"][i]["address"][0]["city"]+" "+response["officials"][i]["address"][0]["state"]+" "+response["officials"][i]["address"][0]["zip"]+"</p><h4>Phone number:</h4>"+response["officials"][i]["phones"][0]+"</div></div>";
	return search_result_html;
}
function getinitialHtml(){
	htmlInitial = "<html><title>Representative Information</title><!-- Bootstrap Sample CSS --><link href=startbootstrap-1-col-portfolio-gh-pages/css/bootstrap.min.css rel=stylesheet><!-- Custom CSS --><link href=startbootstrap-1-col-portfolio-gh-pages/css/1-col-portfolio.css rel=stylesheet><script src = display_info.js type = text/javascript></script><![endif]--><div class=row><div class=col-lg-12 id = headerInfo>"+"Officials"+"</div></div><script src=startbootstrap-1-col-portfolio-gh-pages/js/jquery.js></script><!-- Bootstrap Core JavaScript --><script src=startbootstrap-1-col-portfolio-gh-pages/js/bootstrap.min.js></script><body><div id = results></div>";
	console.log(htmlInitial);
	return htmlInitial;
}

// name, photo, party, address, phone number, and channels

// "<div class=row>
//             <div class=col-md-3>
//                 <a href=#>
//                     <img class=img-responsive src="+response["officials"][index]["photoUrl"]+">
//                 </a>
//             </div>
//             <div class=col-md-5>
//                 <h4>Name: </h4>"+response["officials"][index]["name"]+"
//                 <h4>Party:  </h4>"+response["officials"][index]["party"]+"
//                 <h4>Address:</h4> <p>"+response["officials"][index]["address"]["line1"]+" "+[response["officials"][index]["address"]["line2"]+" "+response["officials"][index]["address"]["city"]+" "+response["officials"][index]["address"]["state"]+" "+response["officials"][index]["address"]["zip"]+"</p>
//                 <h4>Phone number:</h4>"+response["officials"][index]["phones"][0]+"
//             </div>
//         </div>"