var app = app || {};

(function ($) {

// ----- Log In View
	app.LogInView = Parse.View.extend({

		el: $('#content'),

		template: _.template($('#login-template').html()),

		events: {
			'submit form.login-form' : 'logIn',
			'submit form.signup-form': 'signUp'
		},

		initialize: function(){
			_.bindAll(this, 'logIn', 'signUp');
			this.render();
		},

		render: function(){
			this.$el.prepend(_.template($("#login-template").html()));
			//this.delegateEvents();
		},

		logIn: function(e){
			//e.PreventDefault();
			var self = this;
			var username = this.$('#login-username').val();
			var password = this.$('#login-password').val();

			console.log('logging in...');
			//new app.ManagerView();

			app.User.logIn(username, password, {
				success:function(user){
					new app.ManagerView();
					//self.undelegateEvents();
					delete self;
				},

				error:function(user, error){
					console.log('something went wrong:'+error.message);
					self.$(".login-form .error").html(error.message).show();
				}
			});

			return false;
		},

		signUp: function(e){
			e.PreventDefault();
			var self = this;
			var username = this.$('#signup-username').val();
			var password = this.$('#signup-password').val();
			var email = this.$('#signup-email').val();

			console.log('signing up new user...');
			//new app.ManagerView();

			app.User.signUp(username, password, {ACL: new Parse.ACL() },{
				success: function(user) {
					new app.ManagerView();
					//self.undelegateEvents();
					delete self;
					alert('signed up: '+app.User.current());
				},

				error: function(user, error) {
					console.log('something went wrong: '+error.message);
					self.$(".signup-form .error").html(error.message).show();
					alert(error.message);

				}
			});

		},

	});

})(jQuery);