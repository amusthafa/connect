
Template.createRequest.events({

    'submit form': function (event) {
        console.log('form submitted');

        var request = {};
        // request.requestName = $('[id=requestName]').val();
        // request.requestType =  $('[id=requestType]').val();
        // request.creatorId =  $('[id=creatorId]').val();
        // request.requestorId =  $('[id=requestorId]').val();
        // request.aidId = $('[id=aidId]').val();
        // request.aidCategoryId =  $('[id=aidCategoryId]').val();
        // request.requiredBy =  $('[id=requiredBy]').val();
        // request.emergency =  $('[id=emergency]').val();
        // request.status =  $('[id=status]').val();
        // request.addressId =  $('[id=addressId]').val();

        request.requestName =  event.target.requestName.value;
        request.requestType =  event.target.requestType.value;
        request.creatorId =  event.target.creatorId.value;
        request.requestorId =  event.target.requestorId.value;
        request.aidId = event.target.aidId.value;
        request.aidCategoryId =  event.target.aidCategoryId.value;
        request.requiredBy =  event.target.requiredBy.value;
        request.emergency =  event.target.emergency.value;
        request.status =  event.target.status.value;
        request.addressId =  event.target.addressId.value;

        var requestJson = JSON.stringify(request);
        console.log("REQUEST:" , requestJson);
        // alert('create request ' + requestJson);
        // Router.go("/saveRequest",{query : 1});

        // Meteor.call("abcd", request);

        Meteor.call("saveRequest", request, function (error, result) {
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
