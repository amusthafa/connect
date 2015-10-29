Template.manageRequest.helpers({

    isEqual: function(v1, v2) {
        if (v1 === v2){
        //    alert(v1);
            return true;}

        return false;
    },

    isNotEqual: function(v1, v2) {
        if (v1 != v2){
            return true;}

        return false;
    },

    'match': function (event) {
        return ( Session.get("match"));
    },


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




Template.manageRequest.helpers({getRequest : function() {
    check();
    return (Session.get('getRequest'));
}

});

Template.manageRequest.onRendered(function() {
    Session.get('match');
});


Template.registerHelper('formatDate', function(date) {
    console.log("format date:!!!!:", moment(date).format('MM-DD-YYYY'));
    return moment(date).format('MM-DD-YYYY');
});

Template.manageRequest.events({

    'click .edit' : function (event) {
        event.preventDefault();
        requestId = $('#requestId').val();
        console.log("requestId in edit request:", requestId);
        Session.set('requestId',requestId);
        Router.go("/editRequest");
    },

    'click .delete' : function (event) {

        var request = {}
        request._id = this._id;

        Meteor.call('updateStatus', request, function(error, result) {
            if (error) {
                console.log("error body", (error));
                sAlert.error(error.reason);
               // Router.go("/manageRequest");
            }
            else{
                console.log("success");
                sAlert.success("Successfully deleted your request!");
                sAlert.success('', configOverwrite);

            }


        });
        Router.go("/");

    },
    'click .connect' : function (event) {
        event.preventDefault();

        var connect={};

        connect.volunteerAidId = this._id;
        connect.volunteerId = this.volunteerId;

        connect.requestId = document.getElementById('requestId').value;
        connect.requestDate = document.getElementById('requestDate').value;
        connect.seekerId=Meteor.userId();
        connect.aidId = document.getElementById('aidId').value;
        connect.connectedBy= 'User';
     //   alert('connect - '+JSON.stringify(connect));
      //  check(connect,Object);
        Meteor.call("connect",connect, function (error, result) {
         //   alert('connect - ' + result);
            Router.go("/");
           // alert('error - ' + error);

        });
    }
});

Template.registerHelper('formatDate', function(date) {
    console.log("format date:!!!!:", moment(date).format('MM-DD-YYYY'));
    return moment(date).format('MM-DD-YYYY');
});
