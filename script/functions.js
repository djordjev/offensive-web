
function getMe(callback) {
	FB.api('/me?access_token=' + sessionStorage.getItem('accessToken'), function (response) {
		callback(response);
	});
}

function getFacebookUserInfo(fbId, callback) {
	FB.api('/' + fbId + '?access_token=' + sessionStorage.getItem('accessToken'), function (response) {
		callback(response);
	});
}
