/**
 * @author djordjev
 */

function getMyInfo() {
	getMe(function(data) {
		document.getElementById("flashClient").playerInfoReceived(data);
	});
}

function getFBUserInfo(facebookId) {
	getFacebookUserInfo(facebookId, function response(data) {
		document.getElementById("flashClient").facebookUserInfoReceived(data);
	});
}
