Session.setDefault("isOther", "Self");
Session.setDefault("sCity", "Please Select");
Session.setDefault("sState", "Please Select");

Template.createRequest.helpers({
    'isOtherChecked': function (event) {
        return (Session.get("isOther") === "Other");
    },

    getAddress: function () {
        console.log(Session.get("userDetails"));
        return (Session.get('userDetails'));
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

Template.createRequest.onRendered(function () {
    Meteor.call('getAddress', Meteor.userId(), function (err, result) {
        Session.set("userDetails", result);
    });
});

Template.createRequest.events({
    'click .searchUser': function (event) {
        event.preventDefault();
        Meteor.call("SearchUser", document.getElementById("requestorId").value, function (error, result) {
            Session.set("searchResult", result);
        });
    },

    "change #selectedUser": function (event, template) {
        var requestorId = $(event.currentTarget).val();
        Session.set("requestorId", requestorId);
        console.log(Session.get("requestorId"));
        Meteor.call('getAddress', Session.get("requestorId"), function (err, result) {
            Session.set("userDetails", result);
            console.log("on rendered result:", JSON.stringify(result));
        });
    },

    'change #requestType': function (event) {
        console.log(event.currentTarget.name);
        Session.set("isOther", event.currentTarget.value);
        console.log(Session.get("isOther"));
    },

    "change #scity-select": function (event, template) {
        var city = $(event.currentTarget).val();
        Session.set("sCity", city);
        console.log(Session.get("sCity"));
    }
    ,
    "change #sstate-select": function (event, template) {
        var state = $(event.currentTarget).val();
        Session.set("sState", state);
        console.log(Session.get("sState"));
    },

    'submit form': function (event) {
      console.log("submit start");
        event.preventDefault();
        var request = {};

        if (event.target.requestType.value === "Self") {
            request.requestType = "Self";
            request.creatorId = Meteor.userId();
            request.requestorId = Meteor.userId();
        } else {
            request.requestType = "Other";
            request.creatorId = Meteor.userId();
            request.requestorId = event.target.requestorId.value;
        }
        request.requestName =  event.target.requestName.value;
        request.aidId = event.target.Aid.value;
        request.requiredBy =  event.target.requiredBy.value;
        request.emergency =  event.target.emergency.value;
        request.status =  "Submitted";
        request.line1 = event.target.s_line1.value;
        request.line2 = event.target.s_line2.value;
        request.city = Session.get("sCity");
        request.state = Session.get("sState");
        request.country = event.target.s_country.value;
        request.pincode = event.target.s_pincode.value;
        request.comment = event.target.comment.value;


        var requestJson = JSON.stringify(request);
        console.log("CREATE REQUEST:" , requestJson);

        Meteor.call("saveRequest", request, function (error, result) {
            console.log("Client : error" + error + "result - " + JSON.stringify(result));
            if (error) {
                console.log("error" + error);
            }
            else{
              console.log('crate request form submitted');
            }
          });
    }

});
