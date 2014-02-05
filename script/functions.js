
function getMe(callback) {
	FB.api('/me?access_token=' + sessionStorage.getItem('accessToken'), function (response) {
		callback(response);
	});
}
