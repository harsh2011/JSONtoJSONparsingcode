
function myFunction(){
	var indata = document.getElementById("input").value; 

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://jsontoparsingcode.herokuapp.com/convert", true);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(indata);
	
	xhttp.onload = function () {
		document.getElementById("output").value = xhttp.responseText;
	
	};
}
