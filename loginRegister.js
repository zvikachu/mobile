//REGISTRATION
	
	function localRegister(){
	var nameOk= false;
	var emailOk= false;
	var passwordOk= false;
	var phoneOk= false;
	var licenceOk= false;
	var birthOk= false;
	
	
var name = $("#name").val();
var email = $("#email").val();
var  password = $("#password").val();
var  password2 = $("#password2").val();
var  phone= $("#phone").val();
var  mobile= $("#mobile").val();
var  licence= $("#licence").val();
var  birth= $("#date").val();
email = email.toLowerCase();


if(name==""){
$( "#nameRegError" ).fadeTo( "fast" , 0.0)
$( "#nameRegError" ).fadeTo( "slow" , 1.0)
nameOk=false;
}else{
$( "#nameRegError" ).fadeTo( "fast" , 0.0)
nameOk=true;
}

if(email=="" || email.indexOf("@")==-1){
$( "#emailRegError" ).fadeTo( "fast" , 0.0)
$( "#emailRegError" ).fadeTo( "slow" , 1.0)
emailOk=false;
}else{
$( "#emailRegError" ).fadeTo( "fast" , 0.0)
emailOk=true;
}


if(password==""){
$( "#passRegError" ).fadeTo( "fast" , 0.0)
$( "#passRegError" ).fadeTo( "slow" , 1.0)
passwordOk=false;
}else{
$( "#passRegError" ).fadeTo( "fast" , 0.0)
passwordOk=true;
}

if(password2!=password){
$( "#pass2RegError" ).fadeTo( "fast" , 0.0)
$( "#pass2RegError" ).fadeTo( "slow" , 1.0)
passwordOk=false;
}else{
$( "#pass2RegError" ).fadeTo( "fast" , 0.0)
passwordOk=true;
}

if(phone=="" && mobile==""){
$( "#phoneRegError" ).fadeTo( "fast" , 0.0)
$( "#phoneRegError" ).fadeTo( "slow" , 1.0)
phoneOk=false;
}else{
$( "#phoneRegError" ).fadeTo( "fast" , 0.0)
phoneOk=true;
}

if(mobile==""&& phone==""){
$( "#mobileRegError" ).fadeTo( "fast" , 0.0)
$( "#mobileRegError" ).fadeTo( "slow" , 1.0)
phoneOk=false;
}else{
$( "#mobileRegError" ).fadeTo( "fast" , 0.0)
phoneOk=true;
}

if(licence==""){
$( "#licenceRegError" ).fadeTo( "fast" , 0.0)
$( "#licenceRegError" ).fadeTo( "slow" , 1.0)
licenceOk=false;
}else{
$( "#licenceRegError" ).fadeTo( "fast" , 0.0)
licenceOk=true;
}

if(birth.length!=10){
$( "#dateRegError" ).fadeTo( "fast" , 0.0)
$( "#dateRegError" ).fadeTo( "slow" , 1.0)
birthOk=false;
}else{
$( "#dateRegError" ).fadeTo( "fast" , 0.0)
birthOk=true;
}





if(	!nameOk || !emailOk || !passwordOk || !phoneOk || !licenceOk || !birthOk)return;
var registerFool = { 
	'name': name,
	'email': email,
	'password': password,
	'phone': phone,
	'mobile': mobile,
	'licence': licence,
	'birth': birth,
	'car': "" 
	};
	

///////////var archive = allStorage();
/////////var retrievedObject = localStorage.getItem(email);
if(localStorage.getItem(email)==null){//if the user already exist
localStorage.setItem((email+password), JSON.stringify(registerFool));
$( "#regSuccess" ).fadeTo( "fast" , 0.0)
$( "#regSuccess" ).fadeTo( "slow" , 1.0)
setTimeout(function() { 
$.mobile.navigate( "#home" );//go back home
resetAllFields();
}, 3000);

}else{
$( "#emailExistRegError" ).fadeTo( "fast" , 0.0)
$( "#emailExistRegError" ).fadeTo( "slow" , 1.0)
}

}




//LOGIN
function localLogin(){
var emailOk= false;
var passwordOk= false;

var email = $("#emailLogin").val();
var  password = $("#passwordLogin").val();
email = email.toLowerCase();


if(email=="" || email.indexOf("@")==-1){
 $( "#emailLoginError" ).fadeTo( "fast" , 0.0)
$( "#emailLoginError" ).fadeTo( "slow" , 1.0)
emailOk = false;
}else{
 $( "#emailLoginError" ).fadeTo( "fast" , 0.0)
 emailOk = true;
 }
 
 
 if(password==""){
 $( "#passLoginError" ).fadeTo( "fast" , 0.0)
 $( "#passLoginError" ).fadeTo( "slow" , 1.0)
passwordOk= false;
}else{
$( "#passLoginError" ).fadeTo( "fast" , 0.0)
passwordOk= true;
}

var login = email+password;
if(!passwordOk||!emailOk)return

if(localStorage.getItem(login)==null){
 $( "#incorrectLogin" ).fadeTo( "fast" , 0.0)
 $( "#incorrectLogin" ).fadeTo( "slow" , 1.0)
}else{
 $( "#incorrectLogin" ).fadeTo( "fast" , 0.0)
var thisUser = localStorage.getItem(login);
localStorage.setItem('currentUser', thisUser);

if(refferer==1){//1 means its from rent page
	$.mobile.navigate( "#rent" );//go back to rent
	refferer="";//reset refferer back to nothing
	resetAllFields();
 }
else $.mobile.navigate( "#home" );//go back home
$( "#pleaseLogin" ).hide();
returnCarDisplay();
reloadNav();
resetAllFields();

}

}



		//LOG OUT
		function logOut(){
		localStorage.setItem("currentUser", "");
		reloadNav()
		returnCarDisplay()
		}
		
		
		function refreshPage() {
  $.mobile.changePage(
    window.location.href,
    {
      allowSamePageTransition : true,
      transition              : 'none',
      showLoadMsg             : false,
      reloadPage              : true
    }
  );
}
function resetAllFields(){
$("#emailLogin").val("");
$("#passwordLogin").val("");
$("#name").val("");
$("#email").val("");
$("#password").val("");
$("#password2").val("");
$("#phone").val("");
$("#mobile").val("");
$("#licence").val("");
$("#date").val("");
}
