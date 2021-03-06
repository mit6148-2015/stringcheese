if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.setInterval(function(){
  	Meteor.call("connectTwitter1",function(err, result){
    console.log(result);
    });
    Meteor.call("connectTwitter2",function(err, result){
    console.log(result);
    });
	},1200000);
  

 
Template.alert.helpers({
    alert: function() {
        return Session.get('alert');
    }
}); //end alert template


//In order to create the login we followed and used code snipets from
// this tutorial: https://waaave.com/tutorial/meteor/design-a-complete-authentication-system-with-meteor/
 Template.signUp.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
            password = signUpForm.find('#signUpPassword').val();
            //passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && isValidPassword(password)) {
        	//&& areValidPasswords(password, passwordConfirm)
            Accounts.createUser({email: email, password: password}, function(err) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        Session.set('alert', 'We\'re sorry but this email is already used.');
                          $('#password_error').text("We\'re sorry but this email is already used.");
                          $('#password_error').css({"display":"block"});
                    } else {
                        Session.set('alert', 'We\'re sorry but something went wrong.');
                          $('#password_error').text("We\'re sorry but something went wrong.");
                          $('#password_error').css({"display":"block"});
                    }
                } else {
                    window.location.assign("/map");
                    Session.set('alert', 'Congrats! You\'re now a new Meteorite!');
                    
                }
            });
        }else if((! isEmail(email) )|| (! isNotEmpty(email))) {
            $('#password_error').text("Please enter a valid email.");
            $('#password_error').css({"display":"block"});
        }else if((! isValidPassword(password) )|| (! isNotEmpty(password))){
            $('#password_error').text("Passwords must be at least 6 characters.");
            $('#password_error').css({"display":"block"});
        }
        return false;
    },
}); //end signUp 

Template.signOut.events({
    'click #signOut': function(e, t) {
        Meteor.logout(function() {
            Session.set('alert', 'Bye Meteorite! Come back whenever you want!');
            window.location.assign("/");
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
        $('.btn-group').removeClass('open');

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    $('.btn-group').addClass('open');
                    Session.set('alert', 'We\'re sorry but these credentials are not valid.');
                    $('#login-error').text("We\'re sorry but these credentials are not valid.");
                    $('#login-error').css({"display":"block"});
                } else {
                    window.location.assign("/map");
                    Sesson.set('alert', 'Welcome back New Meteorite!');
                }
            });
        }else if(!isNotEmpty(email) || !isEmail(email)){
             $('.btn-group').addClass('open');
            $('#login-error').text("Invalid email.");
            $('#login-error').css({"display":"block"});            
        }else if(!isNotEmpty(password) || !isValidPassword(password)){
           $('.btn-group').addClass('open');
            $('#login-error').text("Invalid password.");
            $('#login-error').css({"display":"block"});
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

//makes sure menu pop-up doesn't disappear when click on form
   $(function () {
            $('.dropdown-menu input').click(function (event) {
                event.stopPropagation();
            });
    });




$("#signOut").hide();

} //on client

Template.saved.helpers({
    savedCountriesText: function(){
        Meteor.call("getUserSavedCountries", function(err, result){
            if(err){
                console.log(err);
            }else{
                var countries = JSON.parse(result);
                if(countries.length===0){
                    $('#savedCountriesText').html("You currently have no saved countries. Search for the countries you would like to save and then press \"Save Country\".");
                }else{
                    var temp = "";
                    for(var i =0; i<countries.length-1; i++){
                        temp += countries[i] + ", ";
                    }
                    temp += countries[countries.length-1];
                    $('#savedCountriesText').html(temp);
                }
            }
        });
    }
});

