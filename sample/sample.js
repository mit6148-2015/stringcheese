Router.map(function() {
  this.route('home', {path: '/'} );
  this.route('hello', {path: 'hello'});
});

// if(Meteor.isClient){
//     Template.home.autoredirect = function(){
//         Router.go('hello');
//     }
// }

Router.map(function(){
    this.route('test', {
        path: '/test'
        data: {
          someValue: "Hello, I'm a value.",
          anotherValue: "Hello, I'm another value."
        }
    });
});