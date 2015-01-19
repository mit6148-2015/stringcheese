if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.setInterval(function(){
    Meteor.call("connectTwitter",function(err, result){
    console.log(result);
    }); },1200000);
} //on client