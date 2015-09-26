Template.aid.helpers({
    'add': function () {
        return "add aid";
    }
});

Template.aid.events({

    'submit form': function (event) {
        //console.log('form submitted');
        console.log('clicked add aid' + event.target.aidCategory.value);
        console.log('clicked add aid' + event.target.aidName.value);
        var aid = {};
        aid.aid_category_id = event.target.aidCategory.value;
        aid.aid_name = event.target.aidName.value;

        // var aidJson = JSON.stringify(aid);
        // alert('client ' + paramsJson);
        //Router.go("/addAid",{query : 1});


        Meteor.call("addAid", aid, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            if (error) {
                console.log("error" + error);
            }
            /*if (error.error === "insert-failed") {
             console.log("Please specify mandatory fields.");
             //sAlert.error("Please specify mandatory fields.");
             }*/
            //   Router.go("/");
        });
    }

});

