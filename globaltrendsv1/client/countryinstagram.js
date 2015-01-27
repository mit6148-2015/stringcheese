
//We used Instafeed.js (http://instafeedjs.com/) and got help from:
//http://stackoverflow.com/questions/22901985/how-to-obtain-instagram-pictures-from-a-place-consuming-instagram-api 
Template.countryTemplate.rendered = function(){
  var url = document.URL;  
  var res = url.split("/");
  //console.log("THIS IS THE URL: " + res[res.length-1]);

  if(res[res.length-1]==='United%20States'){
    var country = 'United States';
  } else if(res[res.length-1]==='South%20Africa'){
    var country = 'South Africa';
  } else if(res[res.length-1]==='South%20Korea'){
    var country = 'South Korea';
  }else if(res[res.length-1]==='Saudi%20Arabia'){
    var country = 'Saudi Arabia';
  } else {
    var country = res[res.length-1];
  }
  //console.log("THIS IS THE URL country: " + country);

  Meteor.call("getHashtagName", country, function(err, result){
    var tempArray = result.split(" ");
    var temp = "";
    if(tempArray.length===1){
      temp = tempArray[0];
    } else {
      for(var i =0;i<tempArray.length;i++){
        temp += tempArray[i];
        console.log("END: "+ temp);
      }
    }
    var theTag = temp.substring(1,temp.length-1);

    //check if there's a hashtag
    if(theTag.charAt(0)==="#"){
      theHashTag = theTag.substring(1,temp.length);
    } else {
      theHashTag = theTag;
    }

    //console.log("the result: " + theHashTag);

    var feed = new Instafeed({
    clientId: '356506ebf9c442bea6bd28d6a368ba9a',
    //tags
    get: 'tagged', 
    tagName: theHashTag,
    // get:'location',
    // locationId: '',
    sortBy: 'most-recent',
    //limit: 20, //shows 20 images at most, for now
    template: '<article><div id="instagram_container"><a href="{{link}}"><img id="instaimage" src="{{image}}" /></a><textarea id="instabox">{{caption}}}</textarea></div></article>',
    });
    feed.run();
  });
};