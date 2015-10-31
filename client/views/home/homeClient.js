Template.home.created = function () {
    if (Accounts._verifyEmailToken) {
        Accounts.verifyEmail(Accounts._verifyEmailToken, function (err) {
            if (err != null) {
                console.log("Error :  " + err.reason);
            } else {
                console.log("Verified email");
            }
        });
    }

    if (Accounts._resetPasswordToken) {
        Session.set('resetPasswordToken', Accounts._resetPasswordToken);
    }
};

Template.home.onRendered(function () {
    Meteor.call('getDocInfo', function (err, result) {
        console.log("inside meteor call");
        Session.set("getDocInfo", result);
    });
    Meteor.call('getAilInfo', function (err, result) {
        console.log("inside meteor call");
        Session.set("getAilInfo", result);
    });
    Meteor.call('getEduInfo', function (err, result) {
        console.log("inside meteor call");
        Session.set("getEduInfo", result);
    });
    Meteor.call('getJobInfo', function (err, result) {
        console.log("inside meteor call");
        Session.set("getJobInfo", result);
    });
    Meteor.call('getRightsInfo', function (err, result) {
        console.log("inside meteor call");
        Session.set("getRightsInfo", result);
    });
});


Template.home.helpers({
    notifications: function () {
        var req = Session.get('notifications');
        console.log("helper" + JSON.stringify(Session.get('notifications')));
        return (Session.get('notifications'));
    },

    getCount: function () {
        var req = Session.get('count');
        console.log("helper" + JSON.stringify(Session.get('count')));
        return (Session.get('count'));
    },

    getDocInfo: function () {
        console.log(Session.get('getDocInfo'));
        return (Session.get('getDocInfo'));
    },
    getAilInfo: function () {
        console.log(Session.get('getAilInfo'));
        return (Session.get('getAilInfo'));
    },
    getEduInfo: function () {
        console.log(Session.get('getEduInfo'));
        return (Session.get('getEduInfo'));
    },
    getJobInfo: function () {
        console.log(Session.get('getJobInfo'));
        return (Session.get('getJobInfo'));
    },
    getRightsInfo: function () {
        console.log(Session.get('getRightsInfo'));
        return (Session.get('getRightsInfo'));
    },
    events: function () {
        var fc = $('.fc');
        return function (start, end, tz, callback) {
            var events;
            Meteor.call("getConnectForCalendar", Meteor.userId(), function (error, result) {
                if (error) {
                    console.log("eeror" + error);
                } else {
                    events = result;
                    callback(events);
                }
            });
        };
    },
});