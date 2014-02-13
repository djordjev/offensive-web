/**
 * @author djordjev
 */

function onMainPageLoad() {

	var mainPageContent = document.getElementById('mainContentForSWF');
	if (sessionStorage.getItem('facebookId')) {
		getMe(function(response) {
			mainPageContent.innerHTML = "Welcome " + response.name;
		});
	} else {
		mainPageContent.innerHTML = "Welcome " + sessionStorage.getItem('username');
	}
}
