function init() {
	document.getElementById('dietplanForm').addEventListener('submit', validateOptions);
}
;

function validateOptions(ev) {
	var hasErrors = false;
	var dietplan = document.getElementById('dietPlan').value;
	
	var mealsSelection = {};
	
	var generalFormErrors = document.getElementById('generalFormError');
	generalFormErrors.style.display = 'none';
	
	var fieldsNames = ['breakfast', 'lunch', 'dinner', 'snack'];

	for (var i = 0; i < fieldsNames.length; i++) {
		var field = $('input[name='+fieldsNames[i]+']:checked');
		var fieldValue = field.val();
		var fieldErrorId = fieldsNames[i] + 'Error';
		var fieldError = document.getElementById(fieldErrorId);
		fieldError.style.display = 'none';
		
		if (!fieldValue) {
			hasErrors = true;
			fieldError.style.display = 'block';
		} else {
			mealsSelection[fieldsNames[i]] = fieldValue;
		}
	}

	if (hasErrors) {
		ev.preventDefault();
		generalFormErrors.style.display = 'block';
		
		$('html, body').animate(
			{
				scrollTop: document.getElementById('dietplanForm').offsetTop
			},
			800
		);
	} else {
		
		var storeName = 'dietplan' + dietplan;
		
		localStorage.setItem(storeName, JSON.stringify(mealsSelection));
	}
}

document.addEventListener("DOMContentLoaded", init);