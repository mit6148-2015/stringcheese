if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
}

if (Meteor.isServer) {
  var Countries = new Mongo.Collection("countries");
  Countries.insert({country: "Italy", id: "23424853"});
  Countries.insert({country: "United States", id: "23424977"});
  Countries.insert({country: "Canada", id: "23424775"});
  Countries.insert({country: "Brazil", id: "23424768"});
  Countries.insert({country: "Japan", id: "23424856"});
  Countries.insert({country: "England", id: "24554868"});
  Countries.insert({country: "Norway", id: "23424910"});
  Countries.insert({country: "Russia", id: "23424936"});
  Countries.insert({country: "Algeria", id: "23424740"});
  Countries.insert({country: "Mexico", id: "23424900"});
  Countries.insert({country: "South Africa", id: "23424942"});
  Countries.insert({country: "Antartica", id: "28289409"});
  Countries.insert({country: "Australia", id: "23424748"});
  Countries.insert({country: "Spain", id: "23424950"});
  Countries.insert({country: "Germany", id: "23424829"});

  // for(var i =0; i<Countries.count; i++){
  //   Countries[i].insert({hashtag: hash[i]}); //have some other array that contains the hashtag for a country
  // }

}
Router.map(function(){
  this.route('map', {path: '/'} );
  this.route('selected', {path: '/selected'});
  this.route('local', {path: '/local'});
});