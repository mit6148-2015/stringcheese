if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
}

if (Meteor.isServer) {

}
Router.map(function(){
  this.route('map', {path: '/'} );
});