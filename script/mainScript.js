/**
 * @author djordjev
 */

function getMyInfo() {
	getMe(function(data) {
		document.getElementById("flashClient").playerInfoReceived(data);
	});
}
