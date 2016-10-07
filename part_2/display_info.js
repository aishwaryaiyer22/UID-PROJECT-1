
var response
function open_display(response_parsed) {
	response = response_parsed; 
	document.open();
	initialHtml = getinitialHtml()
	document.write(initialHtml);

	numberOfficials = response["officials"].length;
	console.log(numberOfficials);
	numberOffices = response["offices"].length;
	var pages;
	if((numberOffices + numberOfficials)%10 == 0)
		pages = (numberOffices + numberOfficials)/10;
	else
		pages = ((numberOffices + numberOfficials)/10) + 1;

	paginationString = "<ul class=pagination>";
	for (i = 1; i<= pages; i++) {
		paginationString += "<li><button onClick=getOfficialsInfoOnPage("+i+")>"+i+"</a></li>"; 
	}
	first_page = getOfficialsInfoOnPage(1);
	document.getElementById("pagination").innerHTML = paginationString;
	document.getElementById("results").innerHTML = first_page;
}

function min(a,b) {
	return a<b?a:b;
}

function getOfficialsInfoOnPage(page) {
	index = (page-1)*10;
	var search_result_html = ""
	if (index == 1) 
		search_result_html = "<div class=container>";
	i = index
	for(i; i<min(index+10,response["officials"].length);i++) {
		search_result_html +="<div class=row><div class = col-md-5 style = width:200px;height=200px;><a href=#><img class=img-responsive src="+response["officials"][i]["photoUrl"]+"></a></div><div class = col-md-5><h4>Name: "+response["officials"][i]["name"]+"</h4>"+"<h4>Party: "+response["officials"][i]["party"]+" </h4><h4>Address: "+response["officials"][i]["address"][0]["line1"]+","+response["officials"][i]["address"][0]["line2"]+","+response["officials"][i]["address"][0]["city"]+","+response["officials"][i]["address"][0]["state"]+"-"+response["officials"][i]["address"][0]["zip"]+"</h4><h4>Phone number: "+response["officials"][i]["phones"][0]+"</h4>";
		channel_string = "<h4>Channels: "
		for (j = 0; j< response["officials"][i]["channels"].length; j++) {
			channel_string += "Type-"+response["officials"][i]["channels"][j]["type"]+" Id-"+response["officials"][i]["channels"][j]["id"]+", ";
		}
		channel_string += "</h4>"
		search_result_html +=channel_string+"</div></div>";
	}
		
	console.log(search_result_html);
	return search_result_html;
}
function getinitialHtml(){
	htmlInitial = "<html><title>Representative Information</title><!-- Bootstrap Sample CSS --><link href=startbootstrap-1-col-portfolio-gh-pages/css/bootstrap.min.css rel=stylesheet><!-- Custom CSS --><link href=startbootstrap-1-col-portfolio-gh-pages/css/1-col-portfolio.css rel=stylesheet><body><div class=row><h1 class=\"col-lg-12\"  id = headerInfo>"+"Officials"+"</h1></div><div id = results></div><hr><!-- Pagination --><div class=row text-center><div class=col-lg-12><div id = pagination></div><script src=startbootstrap-1-col-portfolio-gh-pages/js/jquery.js></script><!-- Bootstrap Core JavaScript --><script src=startbootstrap-1-col-portfolio-gh-pages/js/bootstrap.min.js></script><script src = display_info.js type = text/javascript></script>";
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
// <ul class=pagination><li class="active"><a href="#">1</a></li><li><a href="#">2</a></li>                 <li>
//                         <a href="#">3</a>
//                     </li>
//                     <li>
//                         <a href="#">4</a>
//                     </li>
//                     <li>
//                         <a href="#">5</a>
//                     </li>
                  
//                 </ul>
//             </div>
//         </div>