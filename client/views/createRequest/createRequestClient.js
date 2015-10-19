Session.setDefault("isOther", "Self");
Session.setDefault("sCity", "Please Select");
Session.setDefault("sState", "Please Select");

Template.createRequest.helpers({
    'isOtherChecked': function (event) {
        return (Session.get("isOther") === "Other");
    },

    getAddress: function () {
        return (Session.get('userDetails'));
    },

    searchUser: function () {
        return (Session.get('searchResult'));
    },

    userId: function () {
        return (Session.get('requestorId'));
    },

    cityList: function () {
      return (Session.get('cityList'));
    },

    stateList: function () {
        return (Session.get('stateList'));
    },
    aidList: function () {
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

        if (event.target.address1.checked) {
            request.line1 = event.target.p_line1.value;
            request.line2 = event.target.p_line2.value;
            request.city = event.target.p_city.value;
            request.state = event.target.p_state.value;
            request.country = event.target.p_country.value;
            request.pincode = event.target.p_pincode.value;
        } else {
            request.line1 = event.target.s_line1.value;
            request.line2 = event.target.s_line2.value;
            request.city = Session.get("sCity");
            request.state = Session.get("sState");
            request.country = event.target.s_country.value;
            request.pincode = event.target.s_pincode.value;
        }

        request.requestName =  event.target.requestName.value;
        request.aidName = event.target.Aid.value;
        request.requiredBy =  event.target.requiredBy.value;

        if(event.target.emergencyYes.checked){
          request.emergency =  event.target.emergencyYes.value;
        }
        else{
          request.emergency =  event.target.emergencyNo.value;
        }
        request.status =  "Submitted";
        request.comment = event.target.comment.value;

        var requestJson = JSON.stringify(request);
        console.log("CREATE REQUEST:" , requestJson);

        Meteor.call("saveRequest", request, function (error, result) {
            console.log("Client save request", JSON.stringify(result));

            if (error) {
              console.log("error body", (error));
              sAlert.error(error.reason);
              Router.go("/createRequest");
            }
            else{
              console.log("success");
              sAlert.success("Successfully created you request.");
              Router.go("/");
              delete Session.keys['isOther'];
              delete Session.keys['sCity'];
              delete Session.keys['sState'];
              delete Session.keys['searchResult'];
              delete Session.keys['cityList'];
              delete Session.keys['stateList'];
              delete Session.keys['aidList'];
              // Object.keys('isOther','sCity','sState','searchResult','cityList','stateList','aidList').forEach(function(key){ console.log(Session.get(key)); })
            }
          });
    }
});
