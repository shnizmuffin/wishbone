$(function(){

	//We'll just jam this on up in here
	Parse.$ = jQuery;

	//Turn the Key to Wishbone Database
	Parse.initialize('3acteeIgd5p8JUXREVYYcz0HKzZzLAazRbB2kFjM', 'ldrn4W1R32mp5oKlrQAdmfLpq984nSeRisuj0q0v');

	var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    	testObject.save({foo: "bar"}, {
			success: function(object) {
				$(".success").show();
			},
			error: function(model, error) {
				$(".error").show();
			}
    	});
	
	// ----- Player Model
	var Player = Parse.Object.extend('Player', {

		//default attributes for all players
		defaults:{
			name: 'Unnamed',
			position: 'N/A',
			owned:false,
			targeted:false,
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
			this.save({ontheblock: !this.get('ontheblock')});
		},

		//toggles "TAR" status
		toggleTAR: function() {
			this.save({targeted: !this.get('targeted')})
		}
	});

	// ----- Player Collection (Roster)
	var PlayerList = Parse.Collection.extend({

		//specify collection model
		model: Player,

		done: function(){
			return this.filter(function(player){return player.get('owned')})
		}

		//insert sorting functions here

	});

	// ----- Player View
	var PlayerView = Parse.View.extend({

		//keep it simple for now
		tagName:'li',

		template: _.template($('#player-template').html()),

		events: {
			'blur .edit' : 'close',
			'click .otb' : 'toggleOnTheBlock',
			'click .tar' : 'toggleTargeted',
			'dblclick label.player-content' : 'edit',
			'keypress .edit' : 'updateOnEnter',

			//insert other events here
		},

		initialize: function(){
			_.bindAll(this, 'render', 'close', 'remove');
			this.model.bind('change', this.render);
			this.model.bind('release', this.remove);
		},

		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
			this.input = this.$('.edit');
			return this;
		},

		toggleOnTheBlock: function(){
			this.model.toggleOTB();
		},

		toggleTargeted: function(){
			this.model.toggleTAR();
		},

		edit: function(){
			$(this.el).addClass('editing');
			this.input.focus();
		},

		close: function(){
			this.model.save({content: this.input.val()});
			$(this.el).removeClass('editing');
		},

		updateOnEnter: function(e) {
			if (e.keyCode == 13) {
				this.close();
			};
		},

		clear: function(){
			this.model.destroy();
		}
	});

	// Wishbone Application

	// Main Team Management View
	var ManagePlayersView = Parse.View.extend({

		events:{
			'keypress #add-player-btn': 'createOnEnter'
		},

		el: '#content',

		initialize: function(){
			var self = this;

			_.bindAll(this, 'addOne', 'render', 'logOut', 'createOnEnter');

			//main management template
			this.$el.html(_.template($('#team-template').html()));

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

});