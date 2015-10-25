Template.updateProfile.helpers({
    getUserDetails: function () {
        console.log(Session.get("userDetails"));
        return (Session.get('userDetails'));
    },

    isEqual: function (v1, v2) {
        if (v1 === v2) {
            return true;
        }
        return false;
    }
});

Template.updateProfile.onRendered(function () {
    Meteor.call('getAddress', Meteor.userId(), function (err, result) {
        console.log("onrender" + JSON.stringify(result));
        Session.set("userDetails", result);
    });
});

Template.registerHelper('formatDateProfile', function (date) {
    console.log("format date:!!!!:", moment(date).format('MM/DD/YYYY'));
    return moment(date).format('YYYY-MM-DD');
});