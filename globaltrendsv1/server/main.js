if (Meteor.isServer) {

Meteor.startup(function(){
  if(Countries.find().count() === 0){
  Countries.insert({name: "Italy", id: 23424853, hashtag: null});
  Countries.insert({name: "United States", id: 23424977, hashtag: null}); 
  Countries.insert({name: "Canada", id: 23424775, hashtag: null});
  Countries.insert({name: "Brazil", id: 23424768, hashtag: null}); 
  Countries.insert({name: "Japan", id: 23424856, hashtag: null}); 
  Countries.insert({name: "Norway", id: 23424910, hashtag: null}); 
  Countries.insert({name: "Russia", id: 23424936, hashtag: null});
  Countries.insert({name: "Algeria", id: 23424740, hashtag: null}); 
  Countries.insert({name: "Mexico", id: 23424900, hashtag: null});
  Countries.insert({name: "South Africa", id: 23424942, hashtag: null});
  Countries.insert({name: "Australia", id: 23424748, hashtag: null});
  Countries.insert({name: "Spain", id: 23424950, hashtag: null});
  Countries.insert({name: "Germany", id: 23424829, hashtag: null});

  Meteor.call("connectTwitter",function(err, result){
    console.log(result);
  });
  }
});



 var countryIDList = [23424853, 23424977, 23424775, 23424768, 23424856, 23424910, 23424936, 23424740, 23424900, 23424942, 23424748, 23424950, 23424829];


 Countries = new Mongo.Collection("countries");
 //  Countries.insert({name: "Italy", id: 23424853, hashtag: null});
 //  Countries.insert({name: "United States", id: 23424977, hashtag: null}); 
 //  Countries.insert({name: "Canada", id: 23424775, hashtag: null});
 //  Countries.insert({name: "Brazil", id: 23424768, hashtag: null}); 
 //  Countries.insert({name: "Japan", id: 23424856, hashtag: null}); 
 // // Countries.insert({name: "England", id: 24554868}); //bad
 //  Countries.insert({name: "Norway", id: 23424910, hashtag: null}); 
 //  Countries.insert({name: "Russia", id: 23424936, hashtag: null});
 //  Countries.insert({name: "Algeria", id: 23424740, hashtag: null}); 
 //  Countries.insert({name: "Mexico", id: 23424900, hashtag: null});
 //  Countries.insert({name: "South Africa", id: 23424942, hashtag: null});
 // // Countries.insert({name: "Antartica", id: 28289409}); //bad
 //  Countries.insert({name: "Australia", id: 23424748, hashtag: null});
 //  Countries.insert({name: "Spain", id: 23424950, hashtag: null});
 //  Countries.insert({name: "Germany", id: 23424829, hashtag: null});

  Usernames = new Mongo.Collection("usernames");
    listUsers = Meteor.users.find().fetch();
    for(i=0; i<listUsers.length; i++) {
      Usernames.insert({userId: "Meteor.userId()"});
      //console.log(listUsers);
      //listUsers.splice(i, 1);
  };





Meteor.methods({
 connectTwitter: function() {

    var twit = new TwitMaker({
        // consumer_key: 'ES5GaX3Hd004VOryTvj6dBvxJ',
        // consumer_secret: '2wmBCpzUslGrB9cOE1XSfneJR9Uw4q8LdTz56hMSug3AiobD7T',
        // access_token: '2967109342-5juDANOJFAd1Ib9MzjRwOruLnHW3Lv4agitJaPC',
        // access_token_secret: 'qErlkWRnvM2diQkmg1SlBzOF1IINy1uZxDfvc6kVm12TF'

        consumer_key: '0PvZ5l8rtE36uokYn63f7NH6B',
        consumer_secret: 'onFHlgJ5Om6jVaGd1Bwdg234X8smxD2OQTDJg2RIjU7OAmGIfD',
        access_token: '2981621259-gQLus7QkNolFxs6HtedqPEDv8wopAGwgTREwAsN',
        access_token_secret: 'cGqjr7bfbkQ5exMw0X0OG68wkeKhMzhibSoZa7EEphoCP'
    });

      countryIDList.forEach(function(countryID) {
        twit.get('trends/place',{id: countryID}, Meteor.bindEnvironment(function(err, data, response) {
          if(err===null){
            Countries.update({id: countryID}, {$set: {hashtag: data[0].trends[0].name}}, function(err, doc){
              if (err) {
                console.log(err);
              }
              else {
                console.log("updated the hashtag");
              }
            });
          console.log(": "+data[0].trends[0].name);
        }else{
          console.log("Error: "+ err);
          }
        },
           function(e) {
            console.log("Error in Meteor.bindEnvironment");
           }));
      });
  }, //connectTwitter
  getHashtag: function (countryID) {
    var temp = Countries.find({id: countryID}).fetch();
    return JSON.stringify(temp[0].hashtag);
  },
    getHashtagName: function (countryName) {
    var temp = Countries.find({name: countryName[0]}).fetch();
    console.log("countryName: " + countryName);
     console.log("countryName[0]: " + countryName[0]);
     console.log(temp);
    return JSON.stringify(temp[0].hashtag);
  }

    
}); //Meteor.methods
   
} //on server