Template.header.helpers({
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
});

Template.header.onRendered(function () {
    var user = {userId: Meteor.userId()};
    console.log(user);
    Meteor.call('getNotifications', user, function (err, result) {
        if (err) {
            console.log("error" + error);
           // alert("hi");
        } else {
          //  alert("on rendered result:", JSON.stringify(result));
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
            console.log("NEW" + JSON.stringify(res));
            console.log("NEW" + JSON.stringify(count));
            Session.set('notifications', res);
            Session.set('count', count);
        }
    });


});