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
		data: {"username" : username, "password" : password},
		datatype: "json",
		success: function(data) {
			alert("Kewl " + data);
		},
		error: function() {
			alert("Some error");
		}
	});
}
