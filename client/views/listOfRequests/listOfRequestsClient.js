
Template.listOfRequests.helpers({getRequestList : function() {
  check();
  return (Session.get('ListOfRequests'));
},
    aidList: function () {
        console.log(Session.get('aidList'));
        return (Session.get('aidList'));
    },
    isEqual: function(v1, v2) {
        if (v1 === v2){
            return true;}

        return false;
    }

});

Template.listOfRequests.onRendered(function() {
  // if ( _.isEmpty(Session.get('req')) ) {
    var creatorId = Meteor.user()._id ;
    var request = {creatorId:creatorId};
 //  alert(JSON.stringify(request));
    console.log("list of requests: request:", JSON.stringify(request));
 //  alert("list of  requests with session set:" + JSON.stringify(request));
    check(request, Object);
    Meteor.call('getListOfRequest', request, function(err, result) {
     console.log("err" + err + "result:" + JSON.stringify(result));
      Session.set('ListOfRequests',result);
    });
  // }
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
    'click .match' : function (event) {
        event.preventDefault();
       var request = {};
          request._id = this._id;
        Meteor.call("matchRequestVolunteer", request, function (error, result) {
            console.log("Client : error" + error + "result - " + JSON.stringify(result));
            Session.set("match",result);
            Router.go('/manageRequest');
        });
    },

    'click .respond' : function (event) {
        event.preventDefault();
     //   alert(JSON.stringify(this));
        var connect = {}
        connect._id = this._id;
        if (this.notification)
            connect.notificationId =this.notification._id;
       // alert(JSON.stringify(connect));
        Meteor.call('getConnectDetails', connect, function(err, result) {
            //  alert(" result:"+ JSON.stringify(result));
            Session.set('connectDetails', result);
            //       alert(result);
            Router.go("/connectUpdate");

        });
    },


    'click .edit' : function (event) {
        event.preventDefault();
        requestId = this._id;
        console.log("requestId in edit request:", requestId);
        Session.set('requestId',requestId);
        Router.go("/createRequest");
    },
    'click .cancel' : function (event) {
        event.preventDefault();
        alert(JSON.stringify(this));
        var connect ={};
        connect._id = this._id;
        connect.mode='cancel';
        alert(JSON.stringify(connect));
        Meteor.call('getConnectDetails', connect, function(err, result) {
            //  alert(" result:"+ JSON.stringify(result));
            Session.set('connectDetails', result);
            //       alert(result);
            Router.go("/connectUpdate");

        });
    },
    'click .viewConnect' : function (event) {
        event.preventDefault();
        alert(JSON.stringify(this));
        var connect ={};
        connect._id = this._id;
        connect.mode='viewConnect';
        alert(JSON.stringify(connect));
        Meteor.call('getConnectDetails', connect, function(err, result) {
            //  alert(" result:"+ JSON.stringify(result));
            Session.set('connectDetails', result);
            //       alert(result);
            Router.go("/connectUpdate");
        });
    },
    'click .requestorComplete' : function (event) {
        event.preventDefault();
        alert(JSON.stringify(this));
        var connect ={};
        connect._id = this._id;
        connect.mode='requestorComplete';
        alert(JSON.stringify(connect));
        Meteor.call('getConnectDetails', connect, function(err, result) {
            //  alert(" result:"+ JSON.stringify(result));
            Session.set('connectDetails', result);
            //       alert(result);
            Router.go("/connectUpdate");
        });
    },

    'click .volunteerComplete' : function (event) {
        event.preventDefault();
        alert(JSON.stringify(this));
        var connect ={};
        connect._id = this._id;
        connect.mode='volunteerComplete';
        alert(JSON.stringify(connect));
        Meteor.call('getConnectDetails', connect, function(err, result) {
            //  alert(" result:"+ JSON.stringify(result));
            Session.set('connectDetails', result);
            //       alert(result);
            Router.go("/connectUpdate");
        });
    },



    'click .delete': function(event){
      event.preventDefault();
      console.log("DELETE REQUEST!!!");
      var requestId = this._id;
      console.log("requestId in delete request", requestId);
      Meteor.call("deleteRequest", requestId , function (error, result) {
          console.log("Client : error" + error + "result - " + JSON.stringify(result));
          if (error) {
          console.log("error body", (error));
          sAlert.error(error.reason);
          Router.go("/");
        }
        else{
          console.log("success");
          sAlert.success("Successfully deleted your request.");
          Router.go("/");
        }

      });
      }

});

Template.registerHelper('formatDate', function(date) {
    console.log("format date:!!!!:", moment(date).format('MM-DD-YYYY'));
    return moment(date).format('MM-DD-YYYY');
});
