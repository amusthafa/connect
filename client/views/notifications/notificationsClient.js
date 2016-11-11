Template.notifications.helpers({
    notifications: function () {
        var req = Session.get('notifications');
        console.log("helper" + JSON.stringify(Session.get('notifications')));
        return (Session.get('notifications'));
    },

    getCount: function () {
        var req = Session.get('count');
        console.log("Count" + JSON.stringify(Session.get('count')));
        return (Session.get('count'));
    },

    isEqual: function (v1, v2) {
        if (v1 === v2) {
            return true;
        }
        return false;
    }
    ///menu - start
    ,
    menuOpen: function () {
        return Session.get(MENU_KEY) && 'menu-open';
    },
    userMenuOpen: function () {
        return Session.get(USER_MENU_KEY);
    },
    connected: function () {
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

Template.createRequest.rendered = function () {
    // init fastclick
    FastClick.attach(document.body);
};


Template.registerHelper('formatDateWithTime', function (date) {
    console.log("format date:!!!!:", moment(date).format('MMMM DD, YYYY'));
    return moment(date).format('MMMM DD, YYYY');
});

Template.notifications.onRendered(function () {
  Meteor.call('getNotifications', function (err, result) {
        if (err) {
            //   alert("error" + error);
        } else {

            var res = [];
            var count = [];
            for (var i in result) {
                not = result[i];
                for (var x in not.notification) {
                    resfinal = not.notification[x];
                    res.push(resfinal);
                }

                for (var y in not.count) {
                    countFinal = not.count[y];
                    console.log("Count" + countFinal);
                    count.push(countFinal);
                }
            }
            Session.set('notifications', res);
            Session.set('count', count);
        }
    });
});

Template.notifications.events({
    'click .toggle': function () {
        Session.set(MENU_KEY, !Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function (event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
    'click #getRequest': function (event) {
        event.preventDefault();
        var connect = {
            _id: event.target.getAttribute("data-id"),
            notificationId: event.target.getAttribute("data-notif-id")
        };

        Meteor.call('getConnectDetails', connect, function (err, result) {
            console.log(" result:", JSON.stringify(result));
            Session.set('connectDetails', result);
            //       alert(result);
            Router.go("/connectUpdate");

        });
    },
    'submit form': function (event) {
        event.preventDefault();
        //console.log('form submitted');
        console.log('clicked add aid' + event.target.aidName.value);
        var aid = {};
        aid.aid_name = event.target.aidName.value;

        Meteor.call("addAid", aid, function (error, result) {
            console.log("Client : error" + error + "result - " + result);

            Router.go("/");
        });

    },
    'click .notificationConnect': function (event) {

        event.preventDefault();
        if (this.type == "Initiated") {
            //   alert(JSON.stringify(this));
            var connect = {}
            connect._id = this.connectId;
            connect.notificationId = this._id;
            //alert(JSON.stringify(connect));
            Meteor.call('getConnectDetails', connect, function (err, result) {
                //  alert(" result:"+ JSON.stringify(result));
                Session.set('connectDetails', result);
                //       alert(result);
                Router.go("/connectUpdate");

            });
        }
        else if (this.type == "Submitted") {
//match
            var request = {};
            request._id = this.requestId;
            request.notificationId = this._id;
            //alert('req - '+JSON.stringify(request));
            Meteor.call("matchRequestVolunteer", request, function (error, result) {
                console.log("Client : error" + error + "result - " + JSON.stringify(result));
                Session.set("match", result);
                Router.go('/manageRequest');
            });
        }
        else if (this.type == "PendingCompletion") {
            event.preventDefault();
            // alert(JSON.stringify(this));
            var connect = {};
            connect._id = this.connectId;
            connect.notificationId = this._id;
            connect.mode = 'requestorComplete';
            //   alert(JSON.stringify(connect));
            Meteor.call('getConnectDetails', connect, function (err, result) {
                //  alert(" result:"+ JSON.stringify(result));
                Session.set('connectDetails', result);
                //       alert(result);
                Router.go("/connectUpdate");
            });

        }
        else if (this.type == "Completed") {
            event.preventDefault();
            //  alert(JSON.stringify(this));
            var connect = {};
            connect._id = this.connectId;
            connect.notificationId = this._id;
            connect.mode = 'volunteerComplete';
            //  alert(JSON.stringify(connect));
            Meteor.call('getConnectDetails', connect, function (err, result) {
                //  alert(" result:"+ JSON.stringify(result));
                Session.set('connectDetails', result);
                //       alert(result);
                Router.go("/connectUpdate");
            });

        } else if (this.type == "Accepted") {
            var connect = {}
            connect._id = this.connectId;
            connect.notificationId = this._id;
            connect.mode = 'cancel';
            //alert(JSON.stringify(connect));
            Meteor.call('getConnectDetails', connect, function (err, result) {
                //  alert(" result:"+ JSON.stringify(result));
                Session.set('connectDetails', result);
                //       alert(result);
                Router.go("/connectUpdate");
            });
        }

    }

});
