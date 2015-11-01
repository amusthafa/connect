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
    ,    'isUser': function () {
        check();
        return (Session.get('isUser'));
    },
    'isAdmin': function () {
        return (Session.get('isAdmin'));
    }
});


