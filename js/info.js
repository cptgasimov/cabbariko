var info = document.getElementById("info");
var closeBtn = document.getElementById("close");
var mainPage = document.getElementById("main");

function about(){
	info.style.display = "block";
	mainPage.style.opacity = "0.5";
	
	closeBtn.addEventListener("click", close);
}	
	
function close(){
	info.style.display = "none";
	mainPage.style.opacity = "1";
}