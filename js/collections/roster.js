var app = app || {};

(function () {

// ----- Player Collection (Roster)
	app.Roster = Parse.Collection.extend({

		//specify collection model
		model: app.Player,

		owned: function(){
			return this.filter(function(player){return player.get('owned')})
		},

		unowned: function(){
			return this.without.apply(this, this.owned());
		}

		//insert sorting functions here ?

	});

})();