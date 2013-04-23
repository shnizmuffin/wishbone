var app = app || {};

(function () {
	'use strict';
// ----- Player Model
	app.Player = Parse.Object.extend('Player', {

		//default attributes for all NFL players
		defaults:{
			name: 'Some Player',
			position: 'N/A',
			team: 'FA',
			owned:false,
			owned_by:'No One',
			targeted:false,
			targeted_by:[],
			keeper:false,
			ontheblock:false
		},

		//prepopulate player with default data, if none exists
		initialize: function(){
			if (!this.get('content')) {
				this.set({'content': this.defaults.content});
			}
		},

		//toggles 'OTB' status
		toggleOTB: function() {
			console.log('On the Block toggled for '+this.get('name'));
			this.save({ontheblock: !this.get('ontheblock')})
		},

		//toggles "TAR" status
		toggleTAR: function() {
			console.log('target toggled for '+this.get('name'));
			this.save({targeted: !this.get('targeted')})
		},

		toggleK: function() {
			console.log('Keeper toggled for '+this.get('name'));
			this.save({keeper: !this.get('keeper')})
		}
	});
})();