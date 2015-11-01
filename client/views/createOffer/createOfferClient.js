Session.setDefault("isOther", "Self");
Session.setDefault("sCity", "Please Select");
Session.setDefault("sState", "Please Select");

Template.createOffer.helpers({
    'isOtherChecked': function (event) {
        console.log(Session.get("isOther"));
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
    ///menu - start
    ,
    menuOpen: function() {
        return Session.get(MENU_KEY) && 'menu-open';
    },
    userMenuOpen: function() {
        return Session.get(USER_MENU_KEY);
    },
    connected: function() {
        if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
            return Meteor.status().connected;
        } else {
            return true;
        }
    }
///menu - end
});

var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, true);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

Meteor.startup(function () {
    // set up a swipe left / right handler
    $(document.body).touchwipe({
        wipeLeft: function () {
            Session.set(MENU_KEY, false);
        },
        wipeRight: function () {
            Session.set(MENU_KEY, true);
        },
        preventDefaultEvents: false
    });

});

Template.createRequest.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};


Template.createOffer.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
    'click .searchUser': function (event) {
        event.preventDefault();
        console.log("calling");
        Meteor.call("SearchUser", document.getElementById("requestorId").value, function (error, result) {
            Session.set("searchResult", result);
        });
    },

    "change #selectedUser": function (event, template) {
        var requestorId = $(event.currentTarget).val();
        Session.set("requestorId", requestorId);
        Meteor.call('getAddress', Session.get("requestorId"), function (err, result) {
            Session.set("userDetails", result);
        });
    },

    'change #userType': function (event) {
        Session.set("isOther", event.currentTarget.value);
    },

    "change #scity-select": function (event, template) {
        var city = $(event.currentTarget).val();
        Session.set("sCity", city);
    },

    "change #sstate-select": function (event, template) {
        var state = $(event.currentTarget).val();
        Session.set("sState", state);
    },

    'submit form': function (event) {
        event.preventDefault();
        var createOffer = {};

        if (event.target.userType.value === "Self") {
            createOffer.offerType = "Self";
            createOffer.creatorId = Meteor.userId();
            createOffer.volunteerId = Meteor.userId();
        } else {
            createOffer.offerType = "Other";
            createOffer.creatorId = Meteor.userId();
            createOffer.requestorId = event.target.requestorId.value;
        }
        createOffer.offerName = event.target.offerName.value;
        console.log(event.target.address1.checked);
        if (event.target.address1.checked) {
            createOffer.line1 = event.target.p_line1.value;
            createOffer.line2 = event.target.p_line2.value;
            createOffer.city = event.target.p_city.value;
            createOffer.state = event.target.p_state.value;
            createOffer.country = event.target.p_country.value;
            createOffer.pincode = event.target.p_pincode.value;
        } else {
            createOffer.line1 = event.target.s_line1.value;
            createOffer.line2 = event.target.s_line2.value;
            createOffer.city = Session.get("sCity");
            createOffer.state = Session.get("sState");
            createOffer.country = event.target.s_country.value;
            createOffer.pincode = event.target.s_pincode.value;
        }

        createOffer.aid = event.target.Aid.value;
        createOffer.fromDate = event.target.fromDate.value;
        createOffer.toDate = event.target.toDate.value;
        createOffer.comment = event.target.comment.value;
        Meteor.call("createOffer", createOffer, function (error, result) {
            console.log("Client save offer result", JSON.stringify(result));
            console.log("Client save offer error", JSON.stringify(error));

            if (error) {
              console.log("error body", (error));
              sAlert.error(error.reason);
              Router.go("/createOffer");
            }
            else{
              console.log("success");
              sAlert.success("Successfully created your offer.");
              sAlert.success('', configOverwrite);
            }
        });
        delete Session.keys['isOther'];
        delete Session.keys['searchResult'];
        Router.go("/");
    }
});

Template.createOffer.onRendered(function () {
    Meteor.call('getAddress', Meteor.userId(), function (err, result) {
        Session.set("userDetails", result);
    });
});
