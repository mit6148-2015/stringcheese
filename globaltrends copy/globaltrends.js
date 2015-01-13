if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
  Template.Local.events({
  'click #clickme': function() {
    Router.go('/local');
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}



Router.route('/', function () {
  this.render('Home');
});

Router.route('/local', function () {
  this.render('Local');
});

Router.route('/selected', function () {
  this.render('Selected');
});

Router.route('/world', function () {
  this.render('World');
});
