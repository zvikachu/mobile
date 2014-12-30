$(document).ready(function(){ 
	$("#getAddressButton").click(function(){ 
	if(typeof(Worker) !== "undefined") {
			w = new Worker("webWorker.js");
		
			
			setTimeout(function() {
				w.onmessage = function(event){
				alert (event.data);
			}, 5000)}
		
		
		
		//w.terminate();
		//w = undefined;
} else {

    // because there is no webworker support, just run the function localy
			playMusic()
			setTimeout(function() {
				getAddress();
			}, 5000);
}
	
	
})

})



 var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;


function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var hanayadot = new google.maps.LatLng(31.826, 35.241);
  var mapOptions = {
    zoom:15,
    center: hanayadot
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
  
}

google.maps.event.addDomListener(window, 'load', initialize);
	  

function getAddress(){
var location = $("#location").val();
var destination = $("#destination").val();

var startUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var key = "&key=AIzaSyCjqA7_KFPrUUmRWjMVws2_KTyZameShvk";
var locUrl = startUrl+location+key;
var destUrl = startUrl+destination+key;
var locationObj = JSON.parse(httpGet(locUrl));
var destinationObj = JSON.parse(httpGet(destUrl));
var locationResultStat = locationObj.status;
var destinationResultStat = destinationObj.status;
if(locationResultStat!="OK" || destinationResultStat!="OK"){
$( "#calcResults" ).fadeTo( "fast" , 0.0)
$( "#calcResults" ).fadeTo( "fast" , 1.0)

$( "#distanceValue" ).fadeTo( "fast" , 0.0)
	return;
}
else $( "#calcResults" ).fadeTo( "fast" , 0.0)
var start = locationObj.results[0].formatted_address;
var end = destinationObj.results[0].formatted_address;

calcRoute(start, end);
}


function calcRoute(start, end) {
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
	  var distance = response.routes[0].legs[0].distance.text;//output in KM
	  var distanceNumeric = response.routes[0].legs[0].distance.text.replace(/[A-Za-z$-]/g, "");//output in meters
	  $("#distanceValue").html(distance);
	  $( "#distanceValue" ).fadeTo( "fast" , 0.0)
	  $( "#distanceValue" ).fadeTo( "slow" , 1.0)
		var currentCar = JSON.parse(localStorage.getItem(selectedCar))
		distanceNumeric = distanceNumeric.trim();
		var currentCarPrice = currentCar.price;
		var company = currentCar.company;
		var carModel = currentCar.model;
		var carYear = currentCar.year;
		var number = currentCar.number;
		var gear = currentCar.gear;
		var tripCost = tripCostClac(currentCarPrice, distanceNumeric);
		$("#displayClacResult").html("With your selected car, the "+carYear+" "+carModel+", this trip will cost you <span style='color:tomato;'>"+ tripCost+" NIS</span>");
		$( "#displayClacResult" ).fadeTo( "fast" , 0.0)
		$( "#displayClacResult" ).fadeTo( "slow" , 1.0)
		showRentButton();
	  
	  
	  
	  //the following will occur when a person clicks the rent it button
	  $("#rentIt").click(function(){ 
	  	var currentUser = JSON.parse(localStorage.getItem("currentUser"))
		var userName = currentUser.name;
		var loggedUserKey = currentUser.email+currentUser.password;
		if(currentUser.car!=""){//case the user already has a car, 'return' this function
			var currentUserRentedCar = JSON.parse(localStorage.getItem(currentUser.car))
			var currentUserCarName = currentUserRentedCar.year+" "+currentUserRentedCar.model;
			$("#alreadyHasCar").html("You must return the "+currentUserCarName+" you got before you can rent another car" );
			$( "#alreadyHasCar" ).fadeTo( "fast" , 0.0)
			$( "#alreadyHasCar" ).fadeTo( "fast" , 1.0)	
			return;
		}
	  	$( "#"+selectedCar ).hide()
		currentCar.available=false;
		localStorage.setItem(selectedCar, JSON.stringify(currentCar))

		currentUser.car=selectedCar;//save the car to the user that rented it.
		localStorage.setItem("currentUser", JSON.stringify(currentUser))//now currentUser is saved with the rented car
		localStorage.setItem(loggedUserKey, JSON.stringify(currentUser))//now currentUser is saved with the rented car
		
		
		var carConfirmText = "Congratulations "+userName+"!<br>"
			+"you have successfully rented a "+carYear+" "+carModel+"<br>"
			+"your car is waiting for you at our loot.<br><br>"
			+"Details:<br>"
			+"Model: <span style='color:tomato;'>"+company+" "+carModel+" "+carYear+"</span><br>"
			+"Licence Plate: <span style='color:tomato;'>"+number+"</span><br>"
			+"Price (including selected route): <span style='color:tomato;'>"+tripCost+"</span><br><br>"
			+"We hope to hear from you soon, travel safe!<br>";
			
		$("#confirmImage").attr("src",currentCar.pic)
		$("#confirmCarInfo").html(carConfirmText)
		
		$.mobile.navigate( "#confirmation" );//go back home
		
		
	  returnCarDisplay();
	  })
	 
	 
    }
  });
}


function tripCostClac (carCost, tripDistance){//return the price
	var tripCost;
	if(tripDistance>0 && tripDistance<=90){
		tripCost = tripDistance*1.2;
	}else if(tripDistance>90){
		var firstLeg = 90*1.2;
		var secondLeg = (tripDistance-90)*0.9;
		tripCost = firstLeg + secondLeg;
	}else{
		tripCost = 0;
	}
	tripCost = tripCost+carCost;
	return tripCost;
	

}



function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function showRentButton(){
	var currentCar = JSON.parse(localStorage.getItem(selectedCar))
	var currentCarPrice = currentCar.price;
	var carModel = currentCar.model;
	var carYear = currentCar.year;
	$("#rentIt").html("Click to rent the "+carYear+" "+carModel+" Now!");
	$( "#rentIt" ).show()
	$( "#rentIt" ).fadeTo( "fast" , 0.0)
	$( "#rentIt" ).fadeTo( "slow" , 1.0)
	
}

function playMusic(){
var mp3snd = "music.mp3";
var oggsnd = "home-sound.ogg";

document.write('<audio autoplay="autoplay">');
document.write('<source src="'+mp3snd+'" type="audio/mpeg">');
document.write('<source src="'+oggsnd+'" type="audio/ogg">');
document.write('<!--[if lt IE 9]>');
document.write('<bgsound src="'+mp3snd+'" loop="1">');
document.write('<![endif]-->');
document.write('</audio>');

}
