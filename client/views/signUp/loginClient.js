Template.login.onRendered(function() {
  this.$('#loginform').validate()
});

Template.login.helpers({
});

Template.login.events({

    'submit form': function (event) {
        event.preventDefault();
        console.log('Logging in');
        var credentials = {};
        credentials.email = event.target.mailId.value;
        credentials.password = event.target.password.value;
        Meteor.loginWithPassword(credentials.email, credentials.password, function(error) {
            if (error) {
              console.log("error body", (error));
              sAlert.error("Email id or password is wrong");
              Router.go("/");
            }
            else{
              console.log("success");
                Router.go("/home");
            }

        });


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
