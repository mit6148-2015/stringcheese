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

    // Usernames = new Mongo.Collection("usernames");
    //   listUsers = Meteor.users.find().fetch();
    //   for(i=0; i<listUsers.length; i++) {
    //     Usernames.insert({userId: "Meteor.userId()"});
    //     //console.log(listUsers);
    //     //listUsers.splice(i, 1);
    //   };

    // Usernames = new Mongo.Collection("usernames");
    // Accounts.onCreateUser(function(options, user) {

    // if (options.profile) {
    //   user.profile = options.profile;
    //   Usernames.insert(Meteor.user().username);
    //   console.log(Meteor.user().username);
    //   return user;
    //   }
    // });


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
    var temp = Countries.find({name: countryName}).fetch();
    console.log("countryName: " + countryName);
    console.log("hashtag: "+ temp[0].hashtag);
    return JSON.stringify(temp[0].hashtag);
  },

  getAllCountries: function(){
    var temp=[];
    for(var i =0; i < 13; i++){
      temp.push(Countries.find().fetch()[i].name);
    }
    console.log("ARRAY OF COUNTRIES: " + temp);
    return JSON.stringify(temp);
    // return Countries.count();
  },

  updateCountries: function(country){
    var removeCountry;
    console.log("in updateCountries");
    //var userAddress = Meteor.user().emails[0].address; //get email address of logged in user
    var userID = Meteor.user()._id;
    var num = Meteor.users.find({$and: [{_id : userID}, {countries: {$exists: true}}]}).count(); //check if countries exists

   // console.log("element._transform: "+ element._transform);

    if(num == 0){ //if it doesn't exist
     // console.log("element._transform was null");
      Meteor.users.update({_id : userID}, {$set: {countries: [country]}}, [true, true], function(err, doc){
        if (err) {
          console.log("Error in updating the country list: " + err);
        }else {
          console.log("updated the country list: "+ doc);
        }
      });
      //change button to say "Remove Country"
      removeCountry = true;
    }else{ //if it does exist
      //need to get the countrylist and check if the country has already been added
      console.log("got here!");
      var countryArray = Meteor.users.find({_id : userID}).fetch()[0].countries;
      console.log("countryArray: "+ countryArray);
      var countryRemoved = false;
      for(var i = 0; i<countryArray.length; i++){
        if(countryArray[i] === country){
          //country already added, so remove it
          countryArray.splice(i,1);
          countryRemoved = true;
          Meteor.users.update({_id : userID}, {$set: {countries: countryArray}}, function(err, doc){
          if (err) {
            console.log("Error in updating the country list: " + err);
          }else {
            console.log("updated the country list");
          }
          });
          //change button to say "Save Country"
          removeCountry = false;
        }
      }

      if(!countryRemoved){
        //need to add country
        Meteor.users.update({_id : userID}, {$push: {countries: country}}, function(err, doc){
        if (err) {
          console.log("Error in updating the country list: " + err);
        }else {
          console.log("updated the country list");
        }
      });
        //change button to say "Remove Country"
        removeCountry = true;
      }

    }
      return removeCountry;
    }, //close updateCountries

    getSavedState: function(country){
      if(Meteor.user()===null){
        return null;
      }else{
        var userID = Meteor.user()._id;
        var num = Meteor.users.find({$and: [{_id : userID}, {countries: {$exists: true}}]}).count();
        if(num===0){
          return "Save Country";
        }else{
          var countryArray = Meteor.users.find({_id: userID}).fetch()[0].countries;
          for(var i = 0; i<countryArray.length; i++){
            if(countryArray[i]===country){
              return "Remove Country";
            }
          }
          return "Save Country";
        }
      }
    },
    getUserSavedCountries: function(){
      if(Meteor.user() === null){
        return JSON.stringify([]);
      }else{
      var userID = Meteor.user()._id;
      var num = Meteor.users.find({$and: [{_id : userID}, {countries: {$exists: true}}]}).count();
      if(num===0){
        return JSON.stringify([]);
      }else{
        var countryArray = Meteor.users.find({_id: userID}).fetch()[0].countries;
        return JSON.stringify(countryArray);
      }
    }
  }
}); //Meteor.methods
   
} //on server