
var response;
var total_official_pages;
function open_display(response_parsed) {
	response = response_parsed; 
	document.open();
	initialHtml = getinitialHtml()
	document.write(initialHtml);

	numberOfficials = response["officials"].length;
	numberOffices = response["offices"].length;
	console.log(numberOffices);

	total_official_pages = numberOfficials%10==0?numberOfficials/10:numberOfficials/10 +1;
	var total_office_pages = numberOffices%10==0?numberOffices/10:numberOffices/10 +1;
	total_pages = total_office_pages+total_official_pages;

	populate_page(1);
	
}
function populate_page (page) {
		page_attributes = get_page_attributes(page);
		if(page_attributes.kind == 0)
			document.getElementById("headerInfo").innerHTML = "Officials";
		else
			document.getElementById("headerInfo").innerHTML = "Offices";
		document.getElementById("pagination").innerHTML = page_attributes.pagination_menu;
		document.getElementById("results").innerHTML = page_attributes.page_data;
	}

function toggle_pages(page){

}

function get_page_attributes(page) {
	paginationString = get_pagination_for(page, total_pages);
	info_kind = 0;
  if(page > total_official_pages) {
  	info_list = getOffices(page-total_official_pages);
  	info_kind = 1;
  }
  	
  else
  	info_list = getOfficialsInfoOnPage(page);
   return {
      pagination_menu: paginationString,
      page_data: info_list,
      kind: info_kind
  };
}

function min(a,b) {
	return a<b?a:b;
}

function get_pagination_for(page, total_pages) {
	paginationString = "<ul class=pagination>";
	for (i = 1; i<= total_pages; i++) {
		if (i == page) {
			paginationString += "<li><button style = background-color:blue;>"+i+"</button></li>"
		}
		else
			paginationString += "<li><button onclick=populate_page("+i+")>"+i+"</button></li>"; 
	}
	paginationString += "</ul>"
	return paginationString;
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

function getOffices(curr_page) {
	index = (curr_page-1)*10;
	search_result_html = "";
	if (index == 1) 
		search_result_html = "<div class=container>";
	i = index
	for(i; i<min(index+10,response["offices"].length);i++) {
		if (response["offices"][i]) {
			//get name
			search_result_html += "<div class = col-md-5><h4>Name: "+response["offices"][i]["name"]+"</h4>";
			
			//get levels
			levels_string = ""
			if(response["offices"][i]["levels"] != null) 
				for (j = 0; j< response["offices"][i]["levels"].length; j++) {
					levels_string += response["offices"][i]["levels"][j]+", ";
				}
			levels_final = "<h4>Levels: "+levels_string+"</h4>";
			search_result_html +=levels_final;

			//get roles
			role_string = ""
			if(response["offices"][i]["roles"] != null) 
				for (j = 0; j< response["offices"][i]["roles"].length; j++) {
					levels_string += response["offices"][i]["roles"][j]+", ";
				}
			role_final = "<h4>Roles: "+levels_string+"</h4>";
			search_result_html +=role_final+"</div></div><br>";	
		}
	}
	return search_result_html;
		
}


function getinitialHtml(){
	htmlInitial = "<html><title>Representative Information</title><!-- Bootstrap Sample CSS --><link href=startbootstrap-1-col-portfolio-gh-pages/css/bootstrap.min.css rel=stylesheet><!-- Custom CSS --><link href=startbootstrap-1-col-portfolio-gh-pages/css/1-col-portfolio.css rel=stylesheet><body style = margin-left: 20%;><div class=row><h1 class=col-lg-12 id = headerInfo></h1></div><div id = results></div><hr><!-- Pagination --><div class=row text-center><div class=col-lg-12 id = pagination></div></div><script src=startbootstrap-1-col-portfolio-gh-pages/js/jquery.js></script><!-- Bootstrap Core JavaScript --><script src=startbootstrap-1-col-portfolio-gh-pages/js/bootstrap.min.js></script><script src = display_info.js type = text/javascript></script>";
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

// name": "President of the United States",
//    "divisionId": "ocd-division/country:us",
//    "levels": [
//     "country"
//    ],
//    "roles": [
//     "headOfState",
//     "headOfGovernment"
//    ],
