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
    }
});

Template.notifications.onRendered(function () {
    var user = {userId: Meteor.userId()};
    console.log(user);
    alert("1");
    Meteor.call('getNotifications', user, function (err, result) {
        if (err) {
            alert("2");
            console.log("error" + error);
        } else {
            alert("3");
            console.log("on rendered result:", JSON.stringify(result));
            var res = [];
            var count = [];
            for (var i in result) {
                not = result[i];
                for (var x in not.notification) {
                    resfinal = not.notification[x];
                    res.push(resfinal);
                }

                for (var y in not.count){
                    countFinal = not.count[y];
                    count.push(countFinal);
                }
            }


            console.log("NEW" + JSON.stringify(res));
            console.log("Count" + JSON.stringify(count));
            Session.set('notifications', res);
            Session.set('count', count);
        }
    });
})
;


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

