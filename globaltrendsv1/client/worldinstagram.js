Template.world.rendered = function(){
  Meteor.call("getAllCountries", function(err, result){
    if(err){
      console.log("Error in getUserSavedCountries: "+ err)
    }else{
      var theTag;
      var countries = JSON.parse(result);
      console.log("MEOW COUNTRIES: " +countries);
      for(var i=0; i<countries.length; i++){
        Meteor.call("getHashtagName", countries[i], function(err, result){
          var temp = result;
          theTag = temp.substring(1,temp.length-1);

          //check if there's a hashtag
          if(theTag.charAt(0)==="#"){
            theHashTag = theTag.substring(1,temp.length);
          } else {
            theHashTag = theTag;
          }

          console.log("the result: " + theHashTag);

          var feed = new Instafeed({
          clientId: '356506ebf9c442bea6bd28d6a368ba9a',
          //tags
          get: 'tagged',
          // tagName: 'mit', 
          tagName: theHashTag,
          // get:'location',
          // locationId: '',
          sortBy: 'most-recent',
          //limit: 20, //shows 20 images at most, for now
          template: '<article><div id="instagram_container"><a href="{{link}}"><img id="instaimage" src="{{image}}" /></a><textarea id="instabox">{{caption}}}</textarea></div></article>',
          });
          feed.run();
        });
      }
     }
  });
};