var app = app || {};

(function ($) {

// ----- Player View
	app.PlayerView = Parse.View.extend({

		el: '.roster',

		template: _.template($('#player-template').html()),

		events: {
			'click .otb-btn' : 'toggleOnTheBlock',
			'click .keep-btn' : 'toggleKeeper',
			'click .tar-btn' : 'toggleTargeted',

			//insert other events here
		},

		initialize: function(){
			_.bindAll(this, 'toggleOnTheBlock', 'toggleKeeper', 'toggleTargeted');
			this.render();
		},

		render: function(){
			$(this.el).append(this.template(this.model.toJSON()));
		},

		toggleKeeper: function(){
			this.model.toggleK();
			//console.log(this.model);
		},

		toggleOnTheBlock: function(){
			this.model.toggleOTB();
			//console.log(this.model);
		},

		toggleTargeted: function(){
			this.model.toggleTAR();
			//console.log(this.model);
		}
	});

})(jQuery);