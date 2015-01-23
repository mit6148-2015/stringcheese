if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
  });

 //  Meteor.setInterval(function(){
 //  	Meteor.call("connectTwitter",function(err, result){
 //    console.log(result);
 //    });
	// },1200000);
  

 // Template.login.events({

 //    'submit #form-signin' : function(e, t){
 //      e.preventDefault();
 //      // retrieve the input field values
 //      var email = t.find('#inputEmail').value, password = t.find('#inputPassword').value;

 //        // Trim and validate your fields here.... 

 //        // If validation passes, supply the appropriate fields to the
 //        // Meteor.loginWithPassword() function.
 //        Meteor.loginWithPassword(email, password, function(err){
 //        if (err){
 //          alert("Email and password do not match. Please try again.")
 //        }
 //          // The user might not have been found, or their passwword
 //          // could be incorrect. Inform the user that their
 //          // login attempt has failed. 
 //        else {
 //          alert("Welcome" + email + "!");
 //          // The user has been logged in.
 //        }
 //      });
 //         return false; 
 //      } //end function
 //  }); //end login template

 // Template.register.events({
 //    'submit #register-form' : function(e, t) {
 //      e.preventDefault();
 //      var email = t.find('#account-email').value
 //        , password = t.find('#account-password').value;

 //        // Trim and validate the input
 //  //       var trimInput = function(val) {
 //  //   		return val.replace(/^\s*|\s*$/g, "");
 //  // 		}
 //  // 		var email = trimInput(email);

 //  // 		var isValidPassword = function(val) {
	// 	//     return val.length &gt;= 6 ? true : false; 
	// 	// }
	// 	 //if (isValidPassword(userPassword) {
 //    		// Then use the Meteor.createUser() function
 //    		Accounts.createUser({email: email, password : password}, function(err){
	//           if (err) {
	//             alert("account creation failed");
	//           } else {
	//             // Success. Account has been created and the user
	//             // has logged in successfully. 
	//             alert("Account creation successful; you are now logged in");
	//           }

 //        	});
 //  		//} //end isValidPassword



 //      return false;
 //    }
 //  }); //end register template


 /* -------------------------------------------------------------------------------- */


 Template.alert.helpers({
    alert: function() {
        return Session.get('alert');
    }
}); //end alert template

 Template.signUp.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
            password = signUpForm.find('#signUpPassword').val();
            //passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) ) {
        	//&& areValidPasswords(password, passwordConfirm)
            Accounts.createUser({email: email, password: password}, function(err) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        Session.set('alert', 'We\'re sorry but this email is already used.');
                    } else {
                        Session.set('alert', 'We\'re sorry but something went wrong.');
                    }
                } else {
                    Session.set('alert', 'Congrats! You\'re now a new Meteorite!');
                }
            });
        }
        return false;
    },
}); //end signUp 

Template.signOut.events({
    'click #signOut': function(e, t) {
        Meteor.logout(function() {
            Session.set('alert', 'Bye Meteorite! Come back whenever you want!');
        });
        return false;
    }
}); //end signOut 

Template.signIn.events({
    'submit #signInForm': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget),
            email = trimInput(signInForm.find('.email').val().toLowerCase()),
            password = signInForm.find('.password').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    Session.set('alert', 'We\'re sorry but these credentials are not valid.');
                } else {
                    Sesson.set('alert', 'Welcome back New Meteorite!');
                }
            });
        }
        return false;
    },
}); //end signIn  


trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    Session.set('alert', 'Please fill in all required fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    Session.set('alert', 'Please enter a valid email address.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6) {
        Session.set('alert', 'Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        Session.set('alert', 'Your two passwords are not equivalent.');
        return false;
    }
    return true;
};



} //on client




