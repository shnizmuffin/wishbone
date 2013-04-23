var app = app || {};

(function ($) {

// ----- Player View
	app.SearchPlayerView = Parse.View.extend({

		el: '.player-search',

		template: _.template($('#search-player-template').html()),

		events: {
			'click .add-btn' : 'addToTeam',

			//insert other events here
		},

		initialize: function(){
			_.bindAll(this, 'addToTeam');
			this.render();
		},

		render: function(){
			$(this.el).append(this.template(this.model.toJSON()));
		},

		addToTeam: function(){
			this.model.addToRoster();
			console.log(this.model);
		}


	});

})(jQuery);