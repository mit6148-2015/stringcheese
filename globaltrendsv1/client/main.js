if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
  });

  // Meteor.call("connectTwitter",function(err, result){
  //   console.log(result);
  // });
} //on client