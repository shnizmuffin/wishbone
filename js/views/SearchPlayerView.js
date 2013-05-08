var app = app || {};

(function ($) {

// ----- Player View
	app.SearchPlayerView = Parse.View.extend({

		el: '.player-search-results',

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
			//$(this.el.'.player').hide();
			$(this.el).append(this.template(this.model.toJSON()));
			this.input = this.$('.add-btn');
			return this;
		},

		addToTeam: function(){
			this.model.addToRoster();
			console.log(this.model);
		}


	});

})(jQuery);