
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
    }
    ,    'isUser': function () {
        check();
        return (Session.get('isUser'));
    },
    'isAdmin': function () {
        return (Session.get('isAdmin'));
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

Template.home.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};

Template.home.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    }
});


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
    }
});

