 //global variables
	refferer="";
	selectedCar="";
	namerIs = "";
	killLoopCars = false;
	
$(document).ready(function(){



	if(localStorage.getItem("currentUser")==null)localStorage.setItem("currentUser", "");

	 
	if(localStorage.getItem("currentUser")!="")namerIs = JSON.parse(localStorage.getItem("currentUser")).name;
			navBarGuest = 
		'<ul class="ui-grid-c">'+
		  '<li class="ui-block-a"><a href="#home" class="ui-link ui-btn">Home</a></li>'+
		 ' <li class="ui-block-b"><a href="#login" class="ui-link ui-btn">Register/Login</a></li>'+
		 ' <li class="ui-block-c"><a href="#rent" class="ui-link ui-btn">Rent</a></li>'+
		' <li class="ui-block-d"><a href="#returns" class="ui-link ui-btn">Returns</a></li>'+
		'</ul>';
		
			
		navBarLogged = 
		'<ul class="ui-grid-c">'+
		  '<li class="ui-block-a"><a href="#home" class="ui-link ui-btn">Home</a></li>'+
		 ' <li class="ui-block-b"><a onclick ="logOut()" href="#home" class="ui-link ui-btn">Welcome '+namerIs+' / Logout</a></li>'+
		 ' <li class="ui-block-c"><a href="#rent" class="ui-link ui-btn">Rent</a></li>'+
		' <li class="ui-block-d"><a href="#returns" class="ui-link ui-btn">Returns</a></li>'+
		'</ul>';
		
	var currentUser = localStorage.getItem("currentUser");
	if(currentUser=="")$(".navs").html(navBarGuest);
	else $(".navs").html(navBarLogged);

	
	
returnCarDisplay()
});

	function reloadNav(){
	if(localStorage.getItem("currentUser")!="")namerIs = JSON.parse(localStorage.getItem("currentUser")).name;
		navBarLogged = 
	'<ul class="ui-grid-c">'+
      '<li class="ui-block-a"><a href="#home" class="ui-link ui-btn">Home</a></li>'+
     ' <li class="ui-block-b"><a onclick ="logOut()" href="#home" class="ui-link ui-btn">Welcome '+namerIs+' / Logout</a></li>'+
     ' <li class="ui-block-c"><a href="#rent" class="ui-link ui-btn">Rent</a></li>'+
    ' <li class="ui-block-d"><a href="#returns" class="ui-link ui-btn">Returns</a></li>'+
    '</ul>';
	
	var currentUser = localStorage.getItem("currentUser");
if(currentUser=="")$(".navs").html(navBarGuest);
else $(".navs").html(navBarLogged);	

	}


	
function returnCarDisplay(){
	//check if user got a car rented
	var currentUser = localStorage.getItem("currentUser");
	if(currentUser==""){//check if looged in
	var htmlNotLogged="<a href='#login'>Please log in to return Your car</a>"
		$( "#returnCar" ).fadeTo( "fast" , 0.0)
		$( "#returnCar" ).hide();
		$( "#returnsDiv" ).html(htmlNotLogged);
		$( "#returnsDiv" ).show();
	}else if(JSON.parse(localStorage.getItem("currentUser")).car==""){//check if has a car to return
		var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
		var htmlNoCar="You have no car to retun<br><a href='#rent'>Click here to rent a car</a>"
		$( "#returnsDiv" ).html(htmlNoCar);
		$( "#returnCar" ).fadeTo( "fast" , 0.0)
		$( "#returnCar" ).hide();
		$( "#returnsDiv" ).show();
	}else{//the user really has a car to return
	$( "#returnsDiv" ).hide();
	returnTheCar()
	}
}

function returnTheCar(){

		var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
		var currentUserCar = currentUserObj.car;//get the user rented car
		var currentCar = JSON.parse(localStorage.getItem(currentUserCar))
		var currentUserCarName = currentCar.year+" "+currentCar.model;
		var returnCar ="Click here to return your "+currentUserCarName;
		var loggedUserKey = currentUserObj.email+currentUserObj.password;
		$( "#returnCar" ).html(returnCar);
		$( "#returnCar" ).show();
		$( "#returnCar" ).fadeTo( "fast" , 0.0)
		$( "#returnCar" ).fadeTo( "fast" , 1.0)	
		$("#returnCar").click(function(){ 
		$.mobile.navigate( "#home" );//go back home
		$("#"+currentUserCar).html(showCarName(1))
			$( "#"+currentUserCar ).show()//reshow the car in the rent list
			
			currentCar.available=true;
			localStorage.setItem(currentUserCar, JSON.stringify(currentCar))//save the car again as available:true
			
			currentUserObj.car="";//delete the car from the user.
			localStorage.setItem("currentUser", JSON.stringify(currentUserObj))//now currentUser is saved with the rented car
			localStorage.setItem(loggedUserKey, JSON.stringify(currentUserObj))//now currentUser is saved with the rented car
			returnCarDisplay()
		});
}