Template.countryTemplate.rendered = function(){


  var theTag;
  var countries = "Russia";

  Meteor.call("getHashtagName", countries, function(err, result){
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
    limit: 20, //shows 5 images at most, for now
    template: '<article><div id="instagram_container"><a href="{{link}}"><img id="instaimage" src="{{image}}" /></a><textarea id="instabox">{{caption}}}</textarea></div></article>',
    });
    feed.run();
  });
};



// function getMultipleTags (tags) {
//     var feeds = [];
//     for (var i=0, len=tags.length; i < len; i++) {
//         feeds.push(new Instafeed({
//             // rest of your options
//             get: 'tagged',
//             tagName: tags[i],
//             target: "instafeed-" + tags[i]
//         }));
//     }
//     return feeds;
// }

// // get multiple tags
// var myTags = getMultipleTags(['glass', 'wood', 'rock']);
// // run each instance
// for(var i=0, len=myTags.length; i < len; i++) {
//     myTags[i].run();
// }