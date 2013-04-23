var app = app || {};

(function () {

// ----- Player Collection (Roster)
	app.Roster = Parse.Collection.extend({

		//specify collection model
		model: app.Player,

		done: function(){
			return this.filter(function(player){return player.get('owned')})
		}

		//insert sorting functions here ?

	});

})();