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
    'click .notificationConnect' : function (event) {

        event.preventDefault();
       if (this.type == "Initiated"){
           alert(JSON.stringify(this));
        var connect = {}
        connect._id =this.connectId;
        connect.notificationId =this._id;
         alert(JSON.stringify(connect));
        Meteor.call('getConnectDetails', connect, function(err, result) {
            //  alert(" result:"+ JSON.stringify(result));
            Session.set('connectDetails', result);
            //       alert(result);
            Router.go("/connectUpdate");

        });
       }
        else if (this.type=="Submitted") {
//match
           var request = {};
           request._id = this.requestId;
           Meteor.call("matchRequestVolunteer", request, function (error, result) {
               console.log("Client : error" + error + "result - " + JSON.stringify(result));
               Session.set("match", result);
               Router.go('/manageRequest');
           });
       }

    }

});

