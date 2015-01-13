// function globaltrends(){
if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
}

//     google.load("visualization", "1", {packages:["geochart"]});
//       google.setOnLoadCallback(drawRegionsMap);

//       function drawRegionsMap() {

//         var data = google.visualization.arrayToDataTable([
//           ['Country'],
//           ['Germany'],
//           ['United States'],
//           ['Brazil'],
//           ['Canada'],
//           ['France'],
//           ['Russia']
//         ]);
//       //  var tempWidth = $(window).width();
//         var options = {
//           displayMode: 'text',
//           backgroundColor: '#AEEEEE',
//           enableRegionInteractivity: true,
//           keepAspectRatio: true,
//           width: $(window).width(),
//           datalessRegionColor: '#659D32'
//         };

//         var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));






//         chart.draw(data, options);
//       function myClickHandler(){
//         var selection = chart.getSelection();
//         var message = '';
//         for (var i = 0; i < selection.length; i++) {
//             var item = selection[i];
//             if (item.row != null && item.column != null) {
//                 message += '{row:' + item.row + ',column:' + item.column + '}';
//             } else if (item.row != null) {
//                 message += '{row:' + item.row + '}';
//             } else if (item.column != null) {
//                 message += '{column:' + item.column + '}';
//             }
//         }
//         if (message == '') {
//             message = 'nothing';
//         }
//         alert('You selected ' + message);
//     }
//       }
//   //  google.load('visualization', '1', {packages: ['geochart'], callback: drawMap});
// }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Router.route('/', function () {
  this.route('home', {path: '/'} );

});

/*
Router.map(function(){
    this.route(name:String, options:Object);
});
*/

// simple route with
// name 'about' that
// matches '/about' and automatically renders
// template 'about'
// Router.map( function () {
//   this.route('about');
// });

// simple route with
// name 'home' that
// matches '/' and automatically renders
// template 'home'
// this.route('home', {
//   path: '/'
// });

// complex route with
// name 'notFound' that for example
// matches '/non-sense/route/that-matches/nothing' and automatically renders
// template 'notFound'
// HINT:
//// Define a global not found route as the very last route in your router
//// Also this is different from the notFoundTemplate in your Iron Router
//// configuration!
// this.route('notFound', {
//   path: '*'
// });

