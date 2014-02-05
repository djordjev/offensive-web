/**
 * @author djordjev
 */

function onMainPageLoad() {

	var mainContent = document.getElementById('mainContent');
	if (sessionStorage.getItem('facebookId')) {
		getMe(function(response) {
			mainContent.innerHTML = "Welcome " + response.name;
		});
	} else {
		mainContent.innerHTML = "Welcome " + sessionStorage.getItem('username');
	}
}
