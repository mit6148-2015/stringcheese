var feed = new Instafeed({
  clientId: '356506ebf9c442bea6bd28d6a368ba9a',
  //tags
  get: 'tagged',
  tagName: $("#countryHashtag").text(),
  // get:'location',
  // locationId: '';
  sortBy: 'most-recent',
  limit: 20, //shows 5 images at most, for now
  template: '<article><div id="instagram_container"><a href="{{link}}"><img id="instaimage" src="{{image}}" /></a><div id="instabox">{{model.created_time}}</div></div></article>',
});
feed.run();