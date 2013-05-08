var app = app || {};

(function ($) {

// ----- Main Team Management View
	app.ManagerView = Parse.View.extend({

		events:{
			//'change #add-player-text'  : 'findPlayer',
			'keypress #add-player-text': 'findPlayerOnEnter',
			'click #add-player-btn'    : 'addPlayer',
			'click .logout-btn'        : 'logOut'
		},

		el: '#content',

		template: _.template($('#manager-template').html()),

		initialize: function(){
			console.log('Initializing Manager View');
			_.bindAll(this, 'findPlayerOnEnter','findPlayer', 'addPlayer', 'logOut');

			this.$el.html(_.template($('#manager-template').html()));

		//	this.input = this.$('#add-player-btn');

			//create collection of players
			this.roster = new app.Roster;

			//set up query for players belonging to current user
			this.roster.query = new Parse.Query(app.Player);
			this.roster.query.equalTo('owned_by', app.User.current());

			//this.roster.bind('add', this.addOne);
			//this.roster.bind('all', this.render);

			//fetch players
			this.roster.fetch();
			console.log(this.roster);
			this.render();
		//	state.on('change', this.filter, this);
		},

		render: function(){
			console.log('Rendering Manager View with roster: ',this.roster);
		},

		addPlayer: function(){
			console.log(this.$('#add-player-text').val());
		},
		findPlayerOnEnter: function(e){
			if (e.keyCode == 13) {
				event.preventDefault();
				this.findPlayer(this.$('#add-player-text').val());
			} else {
				this.findPlayer(this.$('#add-player-text').val());
			}
		},

		findPlayer: function(name){
			//this.$('#add-player-text').blur();
			//console.log(name);
			this.roster.query = new Parse.Query('NFL').contains('Name', name);
			//console.log(this.roster.query);
			this.roster.query.find({
				success: function(results){
					if (results.length < 10 ){
						console.log('count: ',results.length,' results: ',results);

						$('.player-search-results').empty();

						_(results).each(function(item){
							new app.SearchPlayerView({
								model: new app.Player({
									name: item.get('Name'),
									position: item.get('Position'),
									team: item.get('Team')
								})
							})
						});
					}
				},

				error: function(error){
					console.log(error.message);
				}
			});

		},

		logOut: function(e){
			event.preventDefault();
			console.log('Logging Out');
			app.User.logOut();
			$(this.el).empty();
			new app.LogInView();

			this.undelegateEvents();
			delete this;
		}


	});

})(jQuery);