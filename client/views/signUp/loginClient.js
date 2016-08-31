Template.login.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err){
      if (err != null) {
        console.log("Error :  " + err.reason);
      } else {
        console.log("Verified email");
      }
      });
    }

  if (Accounts._resetPasswordToken) {
      Session.set('resetPasswordToken', Accounts._resetPasswordToken);
  }
};

Template.login.onRendered(function() {
  this.$('#loginform').validate()
});

Template.login.helpers({
});

Template.login.events({

    'submit form': function (event) {
        event.preventDefault();
        console.log('Logging in');
        Meteor.call("getUserRole", Meteor.userId(), function (error, result) {
            console.log("getUserRole!!", result.roles);
            Session.set('userRole', result.roles);
        });
        var credentials = {};
        credentials.email = event.target.mailId.value;
        credentials.password = event.target.password.value;
        Meteor.call("loginVerify", credentials, function (error, result) {
        Meteor.loginWithPassword(credentials.email, credentials.password, function(error) {
          if(error) {
            if (error.error === 902) {
              console.log(error);
              console.log("Email not verified");
              sAlert.error("Email id is not verified. Kindly check your mail and verify the account");
              Router.go("/login");
            }
            else if (error) {
              console.log("error body", (error));
              sAlert.error("Email id or password is wrong");
              Router.go("/login");
            }
          }
            else{
              console.log("success");
              sAlert.success("Logged in Successfully",{timeout: 5000,  position: 'top-right', effect: 'slide'});
              Router.go("/");
            }
        });
        }


      );


        //
        //
        // Meteor.call("loginVerify", credentials, function (error, result) {
        //     console.log("Client : error" + error + "result - " + result);
        //     if (error) {
        //         console.log("error" + error);
        //         alert(error);
        //     }
        //     /*if (error.error === "insert-failed") {
        //      console.log("Please specify mandatory fields.");
        //      //sAlert.error("Please specify mandatory fields.");
        //      }*/
        //      Router.go("/");
        // });
    }
});
