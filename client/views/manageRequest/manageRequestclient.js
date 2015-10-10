
Template.manageRequest.helpers({getRequest : function() {
  check();
  var req = Session.get('req');
  // console.log("Session:" , JSON.stringify(Session.get('req')) );
  return (Session.get('req'));
}

});

Template.manageRequest.onRendered(function() {
  if ( _.isEmpty(Session.get('req')) ) {
    console.log("Meteor.user", Meteor.user()._id );
    Meteor.call('getRequest', function(err, result) {
      console.log("on rendered result:", JSON.stringify(result));
      Session.set('req', result);
    });
  }
});


Template.manageRequest.events({

  'submit form': function (event) {

    var requestID = event.target._id.value;
    if (event.target.editRequest.value === "EditRequest"){
      console.log("EDIT REQ!!");
        var request = {};
        request.requestName =  event.target.requestName.value;
        request.requestType =  event.target.requestType.value;
        request.creatorId =  event.target.creatorId.value;
        request.requestorId =  event.target.requestorId.value;
        request.aidId = event.target.aidId.value;
        request.requiredBy =  event.target.requiredBy.value;
        request.emergency =  event.target.emergency.value;
        request.status =  event.target.status.value;
        request.addressId =  event.target.addressId.value;
        var requestJson = JSON.stringify(request);
        console.log("REQUEST:" , requestJson);

        Meteor.call("editRequest", requestID, request, function (error, result) {
            console.log("Client : error" + error + "result - " + JSON.stringify(result));
            if (error) {
                console.log("error" + error);
            }
            else{
              console.log('form submitted');
            }

        });

      }
      // else if (event.target.deleteRequest.value === "DeleteRequest"){
      //   console.log("DELETE REQ!!");
      //
      //           Meteor.call("deleteRequest", requestID , function (error, result) {
      //               console.log("Client : error" + error + "result - " + JSON.stringify(result));
      //               if (error) {
      //                   console.log("error" + error);
      //               }
      //               else{
      //                 console.log('form submitted');
      //               }
      //
      //           });
      // }
  }

});
