Template.header.helpers({
    notifications: function () {
        var req = Session.get('notifications');
        return (Session.get('notifications'));
    },

    getCount: function () {
        var req = Session.get('count');
        return (Session.get('count'));
    }
});
