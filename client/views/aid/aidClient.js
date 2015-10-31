Template.aid.helpers({
    'add': function () {
        return "add aid";
    }
});

Template.aid.events({

    'submit form': function (event) {
        event.preventDefault();
        //console.log('form submitted');
        console.log('clicked add aid' + event.target.aidName.value);
        var aid = {};
        aid.aid_name = event.target.aidName.value;

        Meteor.call("addAid", aid, function (error, result) {
          console.log("Admin Add Aid" , JSON.stringify(result));

          if (error) {
            console.log("error body", (error));
            sAlert.error(error.reason);
            Router.go("/loadAid");
          }
          else{
            console.log("success");
            sAlert.success("Aid Added Successfully!");
            sAlert.success('', configOverwrite);
          }

        });
        Router.go("/");
    }

});
