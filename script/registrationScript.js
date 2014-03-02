/**
 * @author djordjev
 */


function backToLoginHandler() {
	window.location = "index.html";
}

function registerHandler() {
	var username = $("#typedUsername").val();
	var password = $("#typedPassword").val();
	
	$.ajax({
		url: "phpScripts/register_on_server.php",
		type: "post",
		data: {"username" : username, "password" : CryptoJS.MD5(password).toString()},
		datatype: "json",
		success: function(data) {
			handleRegistrationResponse(data);
		},
		error: function() {
			alert("Some error");
		}
	});
}


function handleRegistrationResponse(data) {
	var response = $.parseJSON(data);
	if(response.isSuccessfull === "true") {
		$(location).attr('href', "index.html");
	} else {
		alert("Registration is not successfull");
	}
}
