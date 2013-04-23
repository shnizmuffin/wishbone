var app = app || {};
var ENTER_KEY = 13;

$(function(){
	//We'll just jam this on up in here
	Parse.$ = jQuery;

	//Turn the Key to Wishbone Database
	Parse.initialize('3acteeIgd5p8JUXREVYYcz0HKzZzLAazRbB2kFjM', 'ldrn4W1R32mp5oKlrQAdmfLpq984nSeRisuj0q0v');

	// Wishbone Application
	new app.AppView();
});