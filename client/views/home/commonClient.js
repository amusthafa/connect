

var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, true);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 1000;

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

    // Don't show the connection error box unless we haven't connected within
    // 1 second of app starting
    setTimeout(function () {
        Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
    }, CONNECTION_ISSUE_TIMEOUT);
});

Template.common.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};

Template.common.helpers({

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
});

Template.common.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
    'click #menu a': function() {

    }
});