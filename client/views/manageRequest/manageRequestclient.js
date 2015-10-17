
Template.manageRequest.helpers({getRequest : function() {
  check();
  return (Session.get('getRequest'));
}

});

Template.manageRequest.onRendered(function() {
  Session.get('request');
    var requestId = Session.get('requestId');
    var request = {requestId:requestId};
    console.log("manage Request with session set:", JSON.stringify(request));
    Meteor.call('getRequest', request, function(err, result) {
      console.log("on rendered result:", JSON.stringify(result));
      Session.set('getRequest',result);
    });
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});

Template.manageRequest.helpers({
    'isOtherChecked': function (event) {
        return (Session.get("isOther") === "Other");
    },

    getAddress: function () {
        console.log(Session.get("getRequest"));
        return (Session.get('getRequest'));
    },

    searchUser: function () {
        console.log("Search" + JSON.stringify(Session.get('searchResult')));
        return (Session.get('searchResult'));
    },

    userId: function () {
        console.log(Session.get('requestorId'));
        return (Session.get('requestorId'));
    },

    cityList: function () {
      console.log(Session.get('cityList'));
      return (Session.get('cityList'));
    },

    stateList: function () {
        console.log(Session.get('stateList'));
        return (Session.get('stateList'));
    },
    aidList: function () {
        console.log(Session.get('aidList'));
        return (Session.get('aidList'));
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
        request.line1 = event.target.s_line1.value;
        request.line2 = event.target.s_line2.value;
        request.city = Session.get("sCity");
        request.state = Session.get("sState");
        request.country = event.target.s_country.value;
        request.pincode = event.target.s_pincode.value;
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
      else if (event.target.deleteRequest.value === "DeleteRequest"){
        console.log("DELETE REQ!!");

                Meteor.call("deleteRequest", requestID , function (error, result) {
                    console.log("Client : error" + error + "result - " + JSON.stringify(result));
                    if (error) {
                        console.log("error" + error);
                    }
                    else{
                      console.log('form submitted');
                    }

                });
      }
  }

});
