Template.notifications.helpers({notifications: function() {
    check();
    var req = Session.get('notifications');
    return (Session.get('notifications'));
}

});

Template.notifications.onRendered(function() {
    var user = { userId :Meteor.userId() };


        Meteor.call('getNotifications', user, function(err, result) {

            alert('result - '+JSON.stringify(result));
            console.log("on rendered result:", JSON.stringify(result));
            Session.set('notifications', result);
        });

});



Template.notifications.events({

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

