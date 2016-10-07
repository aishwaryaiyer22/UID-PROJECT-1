
var response;
var doc;
function open_display(response_parsed) {
	response = response_parsed; 
	doc = document.open();
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

	paginationString = get_pagination_for(1, pages);
	first_page = getOfficialsInfoOnPage(1);
	// document.getElementById("pagination").innerHTML = paginationString;
	// document.getElementById("results").innerHTML = first_page;
	populate_page(first_page, paginationString);
	
	function populate_page (html_string, paginationString) {
		document.getElementById("pagination").innerHTML = paginationString;
		document.getElementById("results").innerHTML = html_string;
	}

}

function min(a,b) {
	return a<b?a:b;
}

function get_pagination_for(page, total_pages) {
	paginationString = "<ul class=pagination>";
	for (i = 1; i<= total_pages; i++) {
		if (i == page) {
			paginationString += "<li><button onClick=getOfficialsInfoOnPage("+i+") class = active>"+i+"</a></li>"
		}
		else
			paginationString += "<li><button onClick=getOfficialsInfoOnPage("+i+")>"+i+"</a></li>"; 
	}
	console.log(paginationString);
}

function getOfficialsInfoOnPage(page) {
	index = (page-1)*10;
	var search_result_html = ""
	if (index == 1) 
		search_result_html = "<div class=container>";
	i = index
	for(i; i<min(index+10,response["officials"].length);i++) {
		//get image
		if(response["officials"][i]["photoUrl"]) 
			search_result_html +="<div class=row><div class = col-md-5 style = width:200px;height=200px;><a href=#><img class=img-responsive src="+response["officials"][i]["photoUrl"]+"></a></div>";
		else 
			search_result_html +="<div class=row><div class = col-md-5 style = width:200px;height=200px;><a href=#><img class=img-responsive src= image-not-found.jpg></a></div>";		
		//get name
			search_result_html += "<div class = col-md-5><h4>Name: "+response["officials"][i]["name"]+"</h4>";

		//get party
			search_result_html += "<h4>Party: "+response["officials"][i]["party"]+" </h4>";

		//get Address
		if(response["officials"][i]["address"] != null){
			search_result_html += "<h4>Address: "+response["officials"][i]["address"][0]["line1"]+","+response["officials"][i]["address"][0]["line2"]+","+response["officials"][i]["address"][0]["city"]+","+response["officials"][i]["address"][0]["state"]+"-"+response["officials"][i]["address"][0]["zip"]+"</h4>";
		}

		//get phone
		if(response["officials"][i]["phones"] != null) {
			search_result_html += "<h4>Phone number: "+response["officials"][i]["phones"][0]+"</h4>";
		}

		//get channel
		channel_string = ""
		if(response["officials"][i]["channels"] != null) 
			for (j = 0; j< response["officials"][i]["channels"].length; j++) {
				channel_string += "Type-"+response["officials"][i]["channels"][j]["type"]+" Id-"+response["officials"][i]["channels"][j]["id"]+", ";
			}
		channels_final = "<h4>Channels: "+channel_string+"</h4>"
		search_result_html +=channels_final+"</div></div><br>";
	}
		
	//console.log(search_result_html);
	return search_result_html;
}
function getinitialHtml(){
	htmlInitial = "<html><title>Representative Information</title><!-- Bootstrap Sample CSS --><link href=startbootstrap-1-col-portfolio-gh-pages/css/bootstrap.min.css rel=stylesheet><!-- Custom CSS --><link href=startbootstrap-1-col-portfolio-gh-pages/css/1-col-portfolio.css rel=stylesheet><body style = margin-left: 20%;><div class=row><h1 class=\"col-lg-12\"  id = headerInfo>"+"Officials"+"</h1></div><div id = results></div><hr><!-- Pagination --><div class=row text-center><div class=col-lg-12><div id = pagination></div><script src=startbootstrap-1-col-portfolio-gh-pages/js/jquery.js></script><!-- Bootstrap Core JavaScript --><script src=startbootstrap-1-col-portfolio-gh-pages/js/bootstrap.min.js></script><script src = display_info.js type = text/javascript></script>";
	//console.log(htmlInitial);
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