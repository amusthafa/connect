
Template.createRequest.events({

    'submit form': function (event) {
        var request = {};

        request.requestName =  event.target.requestName.value;
        request.requestType =  event.target.requestType.value;
        request.creatorId =  Meteor.user()._id;
        request.requestorId =  Meteor.user()._id;
        request.aidId = event.target.aidId.value;
        request.requiredBy =  event.target.requiredBy.value;
        request.emergency =  event.target.emergency.value;
        request.status =  "Submitted";
        request.addressId =  event.target.addressId.value;

        var requestJson = JSON.stringify(request);
        console.log("CREATE REQUEST:" , requestJson);
        // alert('create request ' + requestJson);
        // Router.go("/saveRequest",{query : 1});

        Meteor.call("saveRequest", request, function (error, result) {
            console.log("Client : error" + error + "result - " + JSON.stringify(result));
            if (error) {
                console.log("error" + error);
            }
            else{
              console.log('form submitted');
            }
          });
    }

});
