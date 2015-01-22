if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
  });

 //  Meteor.setInterval(function(){
 //  	Meteor.call("connectTwitter",function(err, result){
 //    console.log(result);
 //    });
	// },1200000);
  

 Template.login.events({

    'submit #form-signin' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#inputEmail').value, password = t.find('#inputPassword').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err){
        if (err){
          alert("Email and password do not match. Please try again.")
        }
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
        else {
          alert("Welcome" + email + "!");
          // The user has been logged in.
        }
      });
         return false; 
      } //end function
  }); //end login template

 Template.register.events({
    'submit #register-form' : function(e, t) {
      e.preventDefault();
      var email = t.find('#account-email').value
        , password = t.find('#account-password').value;

        // Trim and validate the input

      Accounts.createUser({email: email, password : password}, function(err){
          if (err) {
            // Inform the user that account creation failed
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
          }

        });

      return false;
    }
  }); //end register template

} //on client