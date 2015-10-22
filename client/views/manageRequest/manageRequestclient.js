

Template.manageRequest.helpers({

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
    },
    'click .connect' : function (event) {
        event.preventDefault();

        var connect={};

     ///   alert('connect this val' + JSON.stringify(this));
        connect.volunteerAidId = this.aidId;///button.getAttribute('data-aidId');
        connect.volunteerId = this.volunteerId;//button.getAttribute('data-volunteerId');
   //     alert('connect.volunteerId' +connect.volunteerId);
        //connect.volunteerAidId = document.getElementById('volunteerAidId').value;
        //connect.volunteerId = document.getElementById('volunteerId').value;
        connect.requestId = document.getElementById('requestId').value;
        connect.requestDate = document.getElementById('requestDate').value;
        connect.seekerId=Meteor.userId();
        connect.aidId = document.getElementById('aidId').value;
        connect.connectedBy= 'User';
        alert('connect - '+JSON.stringify(connect));
        check(connect,Object);
        Meteor.call("connect",connect, function (error, result) {
            alert('connect - ' + result);
            Router.go("/");
            alert('error - ' + error);

        });
    }
});
