Template.adminAuth.events({

    'submit form': function (event) {
        event.preventDefault();
        //console.log('form submitted');
        var adminAuth = {};
             adminAuth.user = event.target.user.value;
        adminAuth.status = event.target.status.value;

        // var aidJson = JSON.stringify(aid);
         alert('client ' + adminAuth);
        //Router.go("/addAid",{query : 1});

        Meteor.call("updateAdminAuth", adminAuth, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            if (error) {
                console.log("error" + error);
            }
         //   console.log("routing to home");
        //    else
         //       Router.go("/");

            if (error.error === "insert-failed") {
             console.log("Please specify mandatory fields.");
             //sAlert.error("Please specify mandatory fields.");
             }
            //
           // alert('routing to home');
            Router.go("/home");
        });

    }

});

