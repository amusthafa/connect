Template.common.helpers ({
    'isUser': function () {
        check();
        return (Session.get('isUser'));
    },
    'isAdmin': function () {
        return (Session.get('isAdmin'));
    }
});