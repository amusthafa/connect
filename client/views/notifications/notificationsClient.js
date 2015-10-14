Template.notifications.helpers({notifications: function() {
    check();
    var req = Session.get('notifications');
    return (Session.get('notifications'));
}

});

Template.notifications.onRendered(function() {
    var user = { userId :Meteor.userId() };
//    alert('result - ');

        Meteor.call('getNotifications', user, function(err, result) {

  //          alert('result - '+JSON.stringify(result));
            console.log("on rendered result:", JSON.stringify(result));
            Session.set('notifications', result);
        });

});



Template.notifications.events({
    'click #getRequest': function(event) {
        event.preventDefault();
        var connect = {_id : event.target.getAttribute("data-id"),
         notificationId : event.target.getAttribute("data-notif-id")};

    /*    Meteor.call('getRequest', request, function(err, result) {
            console.log(" result:", JSON.stringify(result));
            Session.set('req', result);
           alert(result);
           Router.go("/manageRequest");
        });

*/
        //call connect, update request status,
        // get connect details for the volunteer to update the connect status to accept/decline

        Meteor.call('getConnectDetails', connect, function(err, result) {
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

