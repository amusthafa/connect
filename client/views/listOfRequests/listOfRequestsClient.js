
Template.listOfRequest.helpers({getRequestList : function() {
  check();
  return (Session.get('ListOfRequests'));
}

});

Template.listOfRequest.onRendered(function() {
  // if ( _.isEmpty(Session.get('req')) ) {
    var requestorId = Meteor.user()._id ;
    var request = {requestorId:requestorId};

    console.log("list of  requests with session set:", JSON.stringify(request));
    Meteor.call('getListOfRequest', request, function(err, result) {
      console.log("on rendered result:", JSON.stringify(result));
      Session.set('ListOfRequests',result);
    });
  // }
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});

Template.listOfRequest.events({

  'submit form': function (event) {

    console.log("event:", event);
    var requestId = event.target.reqID.value;
    console.log("requestId: ", requestId);
    Session.set('requestId',requestId);
    Router.go("/manageRequest");

  }

});
