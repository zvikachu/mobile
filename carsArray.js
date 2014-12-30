

$(document).ready(function(){



function CarMaker (company,model,year,number,gear,price,pic,available){
	this.company=company;
	this.model=model;
	this.year=year;
	this.number=number;
	this.gear=gear;
	this.price=price;
	this.pic=pic;
	this.available=available;
}

var car1 = new CarMaker("Volkswagen","Passat","2007","5789675","Automatic",100,"car1.jpg",true);
var car2 = new CarMaker("Mercedes","SL550","2014","5789675","Automatic",500,"car2.jpg",true);
var car3 = new CarMaker("Toyota","Corolla","2014","3658965","Automatic",130,"car3.jpg",true);
var car4 = new CarMaker("Honda","Civic Hybrid","2007","7414741","Automatic",35,"car4.jpg",true);
var car5 = new CarMaker("Toyota","Yaris","2011","4523589","Automatic",80,"car5.jpg",true);
var car6 = new CarMaker("Mazda","6","2014","1235687","Automatic",150,"car6.jpg",true);
var car7 = new CarMaker("Volkswagen","Polo","2006","741475","Automatic",50,"car7.jpg",true);
var car8 = new CarMaker("Honda","Accord","2008","456423","Automatic",75,"car8.jpg",true);
var car9 = new CarMaker("Honda","Civic","2012","1781615","Automatic",70,"car9.jpg",true);
var car10 = new CarMaker("Volkswagen","Golf","2011","1787675","Automatic",90,"car10.jpg",true);
var cars = new Array();

cars.push.apply(cars,[car1,car2,car3,car4,car5,car6,car7,car8,car9,car10]);
if(localStorage.getItem("car1")===null){
	for(i=0;i<cars.length;i++){
	localStorage.setItem(("car"+(i+1)), JSON.stringify(cars[i]))
	}
}
//check if car is available, if it is, show it

if(JSON.parse(localStorage.getItem("car1")).available==true){
	$("#car1").html(showCarName(1))
	$("#car1").show();	
}
if(JSON.parse(localStorage.getItem("car2")).available==true){
	$("#car2").html(showCarName(2))
	$("#car2").show();	
}
if(JSON.parse(localStorage.getItem("car3")).available==true){
	$("#car3").html(showCarName(3))
	$("#car3").show();	
}
if(JSON.parse(localStorage.getItem("car4")).available==true){
	$("#car4").html(showCarName(4))
	$("#car4").show();	
}
if(JSON.parse(localStorage.getItem("car5")).available==true){
	$("#car5").html(showCarName(5))
	$("#car5").show();	
}
if(JSON.parse(localStorage.getItem("car6")).available==true){
	$("#car6").html(showCarName(6))
	$("#car6").show();	
}
if(JSON.parse(localStorage.getItem("car7")).available==true){
	$("#car7").html(showCarName(7))
	$("#car7").show();	
}
if(JSON.parse(localStorage.getItem("car8")).available==true){
	$("#car8").html(showCarName(8))
	$("#car8").show();	
}
if(JSON.parse(localStorage.getItem("car9")).available==true){
	$("#car9").html(showCarName(9))
	$("#car9").show();	
}
if(JSON.parse(localStorage.getItem("car10")).available==true){
	$("#car10").html(showCarName(10))
	$("#car10").show();	
}




//here the cutomer will be sent to the calc page;
	$("#rentButton").click(function(){
	var currentUser = localStorage.getItem("currentUser");
		if($("#rentButton").html().indexOf("0")==-1){//means no car was selected yet
		$( "#pleaseLogin" ).fadeTo( "fast" , 0.0)  
		$( "#pleaseLogin" ).html("Please select a car");
		$( "#pleaseLogin" ).show(); 
		$( "#pleaseLogin" ).fadeTo( "fast" , 1.0)  	
			return
		}
		else if(currentUser==""){//means user is not logged in
			$( "#pleaseLogin" ).fadeTo( "fast" , 0.0)  	
			$( "#pleaseLogin" ).html('<a href="#login" onClick="setSource(1)">Please Login or Register</a>');
			
			$( "#pleaseLogin" ).show(); 	
			$( "#pleaseLogin" ).fadeTo( "fast" , 1.0)  	
		}	else{
		$.mobile.navigate( "#calc" );
		$( "#pleaseLogin" ).hide();
		
		}
	
		
	
	})
	
	
	
showCarsInLoop();
	
	
	
});

function showCarName(carNum){
	var currentCar = JSON.parse(localStorage.getItem("car"+carNum))
	var company = currentCar.company;
	var model = currentCar.model;
	var year = currentCar.year;
	var carName = company+" "+ model +" "+ year;
	return carName;
	
}

function showCar(carNum){
killLoopCars = true;
$("#car1").removeClass("carName2");
$("#car2").removeClass("carName2");
$("#car3").removeClass("carName2");
$("#car4").removeClass("carName2");
$("#car5").removeClass("carName2");
$("#car6").removeClass("carName2");
$("#car7").removeClass("carName2");
$("#car8").removeClass("carName2");
$("#car9").removeClass("carName2");
$("#car10").removeClass("carName2");
$("#car"+carNum).addClass("carName2");

    selectedCar="car"+carNum;//set the global car to the selection the user made
var currentCar = JSON.parse(localStorage.getItem("car"+carNum))
var company = currentCar.company;
var model = currentCar.model;
var year = currentCar.year;
var number = currentCar.number;
var gear = currentCar.gear;
var price = currentCar.price;
var thisCarHtml = "Maker: "+company+"<br>"
			+"Model: "+model+"<br>"
			+"Year: "+year+"<br>"
			+"Gear: "+gear+"<br>"
			+"Rent Price: ₪ "+price+"<br>";
			
			
var carSummery = "Get The " +company+" "+ model +" "+ year+" Today!";
	$("#showCarInfo").html(thisCarHtml)
	
	$( "#carImage" ).fadeTo( 0, 0.0)
setTimeout(function() {
 $("#carImage").attr("src",currentCar.pic)
	$( "#carImage" ).fadeTo( "fast" , 1.0)     
}, 800);
	$("#rentButton").html(carSummery)
	
	
}

function setSource(source){
refferer = source;
}

function showCarsInLoop(){//loop on rent cars here!
var count = 2;	


window.setInterval(function () {
var currentCar = JSON.parse(localStorage.getItem("car"+count))
var isCarAvalilable = currentCar.available;
if (!isCarAvalilable){
count++
}
	if (killLoopCars)return;
	$("#car1").removeClass("carName2");
	$("#car2").removeClass("carName2");
	$("#car3").removeClass("carName2");
	$("#car4").removeClass("carName2");
	$("#car5").removeClass("carName2");
	$("#car6").removeClass("carName2");
	$("#car7").removeClass("carName2");
	$("#car8").removeClass("carName2");
	$("#car9").removeClass("carName2");
	$("#car10").removeClass("carName2");

		$( "#carImage" ).fadeTo( 0, 0.0)
	setTimeout(function() {
	$("#carImage").attr("src","car"+count+".jpg")
		$( "#carImage" ).fadeTo( "fast" , 1.0)     
	}, 800);

	var company = currentCar.company;
	var model = currentCar.model;
	var year = currentCar.year;
	var number = currentCar.number;
	var gear = currentCar.gear;
	var price = currentCar.price;
	var thisCarHtml = "Maker: "+company+"<br>"
				+"Model: "+model+"<br>"
				+"Year: "+year+"<br>"
				+"Gear: "+gear+"<br>"
				+"Rent Price: ₪ "+price+"<br>";

	$("#showCarInfo").html(thisCarHtml)
	$("#car"+count).addClass("carName2");
	
count++


if(count>10)count = 1;

}, 4000);


}


