var app = app || {};

(function ($) {

// ----- Main Team Management View
	app.ManagerView = Parse.View.extend({

		events:{
			'keypress #add-player-btn': 'createOnEnter'
		},

		el: '#content',

		initialize: function(){
			var self = this;

			_.bindAll(this, 'addOne', 'render', 'logOut', 'createOnEnter');

			//main management template
			this.$el.html(_.template($('#manager-template').html()));

			this.input = this.$('#add-player-btn');

			//create collection of players
			this.players = new PlayerList;

			//set up query for players belonging to current user
			this.players.query = new Parse.Query(Player);
			this.players.query.equalTo('user', Parse.User.current());

			this.players.bind('add', this.addOne);
			this.players.bind('all', this.render);

			//fetch players
			this.players.fetch();

			state.on('change', this.filter, this);
		},

		//log out, show login view, break everything, kill self
		logOut: function(e){
			Parse.User.logOut();
			new LogInView();
			this.undelegateEvents();
			delete this;
		},

		render: function(){
			var done
		}


	});

})(jQuery);