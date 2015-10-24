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

    isEqual: function(v1, v2) {
        if (v1 === v2){
            return true;}
        return false;
    }
});

Template.registerHelper('formatDateWithTime', function(date) {
    console.log("format date:!!!!:", moment(date).format('MMMM DD, YYYY'));
    return moment(date).format('MMMM DD, YYYY');
});


Template.notifications.events({
    'click #getRequest': function (event) {
        event.preventDefault();
        var connect = {
            _id: event.target.getAttribute("data-id"),
            notificationId: event.target.getAttribute("data-notif-id")
        };

        /*    Meteor.call('getRequest', request, function(err, result) {
         console.log(" result:", JSON.stringify(result));
         Session.set('req', result);
         alert(result);
         Router.go("/manageRequest");
         });

         */
        //call connect, update request status,
        // get connect details for the volunteer to update the connect status to accept/decline

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

    }

});

