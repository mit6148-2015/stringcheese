Router.route('/country/:country', function() {
	var country = this.params.country;
	Meteor.call("getAllCountries", function(err, result){
      var temp = JSON.parse(result);

      var inDatabase = false;

      for(var i=0; i<13;i++){
        if(country===temp[i]){
          inDatabase = true;
        }
      }

      if(!inDatabase){
		window.location.assign("/notFound");
		return;
      }
    });



	Meteor.apply("getHashtagName", [country], true, function(err, result){
		      console.log("Error: " + err);
		      console.log("Result(Hashtag from Country): "+ result);
		      $("#countryHashtag").html(result);		    
	});
	Meteor.apply("getSavedState", [country], true, function(err, result){
		if(err){
			console.log("Error: "+ err);
		}else{
			if(result===null){
				//hide button
			  $("#saveCountryButton").hide();
			}else{
			  $("#saveCountryButton").show();
			  $("#saveCountryButton").html(result);
			}
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
Router.configure({
//  layoutTemplate: 'layout',
//  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  // waitOn: function(){
  //   return Meteor.subscribe('userData');
  // }
});
Router.map(function(){
  this.route('home', {path: '/'} );
  this.route('world', {path: '/world'});
  this.route('saved', {path: '/saved'});
  this.route('map', {path: '/map'});
  this.route('notFound', {path: '/notFound'});
 // this.route('notFound', {path: '*' });
});

