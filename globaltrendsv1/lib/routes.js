Router.route('/country/:country', function() {
	var country = this.params.country;

	Meteor.apply("getHashtagName", [country], true, function(err, result){
		      console.log("Error: " + err);
		      console.log("Result(Hashtag from Country): "+ result);
		      $("#countryHashtag").html(result);		    
	});
	Meteor.apply("getSavedState", [country], true, function(err, result){
		if(err){
			console.log("Error: "+ err);
		}else{
			$("#saveCountryButton").html(result);
		}
	});
	this.render('countryTemplate', {
	    data: function () {
	      return {
			specificCountry: function() {
				console.log("country in specificCountry: "+ country);
			  return country;
			}
		  }
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

