if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
}

if (Meteor.isServer) {
	WOEID = new Mongo.Collection("WOEID");
}
Router.map(function(){
  this.route('map', {path: '/'} );
  this.route('selected', {path: '/selected'});
  this.route('local', {path: '/local'});
});