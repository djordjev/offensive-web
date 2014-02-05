/**
 * @author djordjev
 */

function storeLoginResponse(response) {
	// store accessToken and facebookId into session
	sessionStorage.setItem('accessToken', response.authResponse.accessToken);
	sessionStorage.setItem('facebookId', response.authResponse.userID);
}

function loginHandler() {
	
}

function registerHandler() {
	window.location = "registration.html";
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
			window.location = "mainPage.html";
		} else if(response.status === 'not_authorized') {
			alert('You have no access to this application');
		} 
	});
	
	FB.getLoginStatus(function(response) {
		if(response.status === 'connected') {
			storeLoginResponse(response);
			window.location = "mainPage.html";
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

