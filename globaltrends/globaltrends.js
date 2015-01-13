if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


/*
Router.map(function(){
    this.route(name:String, options:Object);
});
*/

// simple route with
// name 'about' that
// matches '/about' and automatically renders
// template 'about'
Router.map( function () {
  this.route('about');
});

// simple route with
// name 'home' that
// matches '/' and automatically renders
// template 'home'
this.route('home', {
  path: '/'
});

// complex route with
// name 'notFound' that for example
// matches '/non-sense/route/that-matches/nothing' and automatically renders
// template 'notFound'
// HINT:
//// Define a global not found route as the very last route in your router
//// Also this is different from the notFoundTemplate in your Iron Router
//// configuration!
this.route('notFound', {
  path: '*'
});