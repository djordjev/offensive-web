/**
 * @author djordjev
 */

function storeLoginResponse(response) {
	// store accessToken and facebookId into session
	sessionStorage.setItem('accessToken', response.authResponse.accessToken);
	sessionStorage.setItem('facebookId', response.authResponse.userID);
}

function loginHandler() {
	var username = $("#txtUsername").val();
	var password = $("#txtPassword").val();
	
	$.ajax({
		url: "phpScripts/login_to_server_no_facebook.php",
		type: "post",
		data: {"username" : username, "password" : CryptoJS.MD5(password).toString()},
		datatype: "json",
		success: function(data) {
			handleLoginResponse(data);
		},
		error: function() {
			alert("Error during login");
		}
	});
}

function handleLoginResponse(data) {
	var response = $.parseJSON(data);
	if(response.userId > 0) {
		sessionStorage.setItem('userId', response.userId);
		$(location).attr('href', "mainPage.html");
	} else {
		alert("Login is not successfull");
	}
}

function registerHandler() {
	$(location).attr('href', "registration.html");
}

window.fbAsyncInit = function() {
	FB.init({
		appId : '237819993056197',
		status : true,
		cookie : true,
		xfbml : true
	});

	FB.Event.subscribe('auth.authResponseChange', function(response) {
		if(response.status === 'connected') {
			storeLoginResponse(response);
			$.ajax({
				url: "phpScripts/login_to_server_facebook.php",
				type: "post",
				data: {"facebookId" : response.authResponse.userID},
				datatype: "json",
				success: function(data) {
					handleLoginResponse(data);
					window.location = "mainPage.html";
				},
				error: function() {
					alert("Error during login");
				}
			});
		} else if(response.status === 'not_authorized') {
			alert('You have no access to this application');
		} 
	});
	
	FB.getLoginStatus(function(response) {
		if(response.status === 'connected') {
			storeLoginResponse(response);
			$.ajax({
				url: "phpScripts/login_to_server_facebook.php",
				type: "post",
				data: {"facebookId" : response.authResponse.userID},
				datatype: "json",
				success: function(data) {
					handleLoginResponse(data);
					window.location = "mainPage.html";
				},
				error: function() {
					alert("Error during login");
				}
			});
		}
	});
};

// load JDK
( function(d) {
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];

		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement('script');
		js.id = id;
		js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));

