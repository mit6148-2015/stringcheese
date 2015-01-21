Router.route('/country/:country', function() {
	var country = this.params.country;
	console.log(this.params, country);
	this.render('countryTemplate', {
    data: function () {
      return {
		specificCountry: function() {
		  return country;
		},
		specificHashtag: function(){
			// setTimeout(returnResult, 1000);
		 //  var r;
		 //  console.log("I'm here: " +JSON.stringify(country));
		 //  Meteor.apply("getHashtagName", [JSON.parse(country)], [true], function(err, result){
	  //     console.log("Error: " + err);
	  //     console.log("Result(Hashtag from Country): "+ result);
	  //     r = result;
	  //     console.log("r before: "+ r);
	  //     }); 
	      
	  //    returnResult(r);
	  //    console.log("r: "+ r);
	  return "Top Hashtag Will Be Here";
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

function returnResult(value){
	console.log("value: "+ value);
	return value;

}

function getHashtagFromDB(){
setTimeout(createMap, 1000);
countryIDList.forEach(function(countryID){
    Meteor.apply("getHashtag", [EJSON.parse(countryID)], [true], function(err, result){
      console.log("Error: " + err);
      console.log("Result: "+ result);
      countryHashtag.push(result);
    });  
});
}


