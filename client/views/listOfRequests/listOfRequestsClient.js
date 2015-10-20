
Template.listOfRequests.helpers({getRequestList : function() {
  check();
  return (Session.get('ListOfRequests'));
}

});


Template.editRequest.helpers({getRequest : function() {
  check();
  return (Session.get('getRequest'));
}

});

Template.listOfRequests.onRendered(function() {
  // if ( _.isEmpty(Session.get('req')) ) {
    var requestorId = Meteor.user()._id ;
    var request = {requestorId:requestorId};
    console.log("list of requestss: request:", JSON.stringify(request));
    console.log("list of  requests with session set:", JSON.stringify(request));
    Meteor.call('getListOfRequest', request, function(err, result) {
      console.log("error!!!???:", err);
      console.log("on rendered result:", JSON.stringify(result));
      Session.set('ListOfRequests',result);
    });
  // }
});

Template.editRequest.onRendered(function() {
  Session.get('request');
    var requestId = Session.get('requestId');
    var request = {requestId:requestId};
    console.log("editRequest with session set:", JSON.stringify(request));
    Meteor.call('getRequest', request, function(err, result) {
      console.log("on rendered result:", JSON.stringify(result));
      Session.set('getRequest',result);
    });
});

Template.editRequest.helpers({
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


Template.registerHelper('formatDate', function(date) {
  console.log("format date:!!!!:", moment(date).format('MM-DD-YYYY'));
  return moment(date).format('MM-DD-YYYY');
});

Template.listOfRequests.events({

  'submit form': function (event) {
    event.preventDefault();

    var requestId = document.getElementById('reqID').value;
    console.log("requestId in edit request:", requestId);
    var requestId = document.getElementById('reqID').value;
    console.log("requestId: ", requestId);
    Session.set('requestId',requestId);
    Router.go("/editRequest");
  },

  'click .deleteRequest': function(event){
      event.preventDefault();
      console.log("DELETE REQUEST!!!");
      var requestId = document.getElementById('reqID').value;
      console.log("requestId in delete request", requestId);
      Meteor.call("deleteRequest", requestId , function (error, result) {
          console.log("Client : error" + error + "result - " + JSON.stringify(result));
          if (error) {
          console.log("error body", (error));
          sAlert.error(error.reason);
          Router.go("/listOfRequests");
        }
        else{
          console.log("success");
          sAlert.success("Successfully deleted your request.");
          Router.go("/");
        }

      });
      },

});

Template.editRequest.events({

  'submit form': function (event) {

    var requestID = event.target._id.value;
      console.log("EDIT REQ!! requestID:", requestID);
        var request = {};
        request.requestName =  event.target.requestName.value;
        request.requestType =  event.target.requestType.value;
        request.creatorId =  event.target.creatorId.value;
        request.requestorId =  event.target.requestorId.value;
        request.aidId = event.target.aidId.value;
        request.requiredBy =  event.target.requiredBy.value;
        request.emergency =  event.target.emergency.value;
        request.status =  event.target.status.value;
        request.line1 = event.target.p_line1.value;
        request.line2 = event.target.p_line2.value;
        request.city = Session.get("sCity");
        request.state = Session.get("sState");
        request.country = event.target.p_country.value;
        request.pincode = event.target.p_pincode.value;
        var requestJson = JSON.stringify(request);
        console.log("REQUEST:" , requestJson);

        Meteor.call("editRequest", requestID, request, function (error, result) {
            console.log("Client editRequest" , JSON.stringify(result));
            if (error) {
            console.log("error body", (error));
            // sAlert.error(error.reason);
            Router.go("/editRequest");
          }
          else{
            console.log("success");
            // sAlert.success("Successfully saved your request.");
            Router.go("/");
          }

        });
      }
    });
