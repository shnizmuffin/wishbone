var app = app || {};

(function ($) {

// ----- App View
	app.AppView = Parse.View.extend({

		el: $('#content'),

		events: {
			'click #get-started' : 'getStarted'
		},

		initialize: function(){	
			console.log('rendering new app view');
			this.render();
		},

		render: function(){
			if (Parse.User.current()) {
				console.log('rendering new manager view for the logged in user');
				new app.ManagerView();
				
			} else {
				console.log('rendering new login view because no one is logged in');
				new app.LogInView();
			}
		},

		getStarted: function(){
			$('html,body').animate({scrollTop: $('html,body').offset().top},'slow');
		}

	});

})(jQuery);