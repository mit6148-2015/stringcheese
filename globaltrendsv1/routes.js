Router.route('/country/:country', function() {
	var country = this.params.country;
	console.log(this.params, country);
	  this.render('countryTemplate', {
   	 	 data: function () {
     	 	return country;
   	 	 }
  	  });
	
});

Router.map(function(){
  this.route('map', {path: '/'} );
  this.route('world', {path: '/world'});
  this.route('selected', {path: '/selected'});
  this.route('local', {path: '/local'});
  this.route('home', {path: '/home'} );
 //this.route('United States', {path: '/US'});
});