Template.aid.helpers({
    'add': function () {
        return "add aid";
    }
});

Template.aid.events({

    'click .getaid' : function (event) {
        event.preventDefault();
        Meteor.call("getAid", function (error, result) {
            console.log('getaid' + result);
   });
    }
    ,

    'submit form': function (event) {
        event.preventDefault();
        //console.log('form submitted');
        console.log('clicked add aid' + event.target.aidName.value);
        var aid = {};
        aid.aid_name = event.target.aidName.value;

        // var aidJson = JSON.stringify(aid);
        // alert('client ' + paramsJson);
        //Router.go("/addAid",{query : 1});


        Meteor.call("addAid", aid, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
          /*  if (error) {
                console.log("error" + error);
            }*/
         //   console.log("routing to home");
        //    else
         //       Router.go("/");

            /*if (error.error === "insert-failed") {
             console.log("Please specify mandatory fields.");
             //sAlert.error("Please specify mandatory fields.");
             }*/
            //
           // alert('routing to home');
            Router.go("/");
        });

    }

});

