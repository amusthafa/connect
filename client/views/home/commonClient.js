Template.common.helpers ({
    'isUser': function () {
        check();
        return (Session.get('isUser'));
    },
    'isAdmin': function () {
        return (Session.get('isAdmin'));
    }
});


Template.common.onRendered(function() {
    var userId;
    Meteor.call('getUserId', function (err, result) {
        console.log("result:", JSON.stringify(result));
        userId = result;
        console.log("Roles.userIsInRole(userId,'Admin')", Roles.userIsInRole(userId, 'Admin'));
        console.log("Roles.userIsInRole(userId,'User')", Roles.userIsInRole(userId, 'User'));
        if (Roles.userIsInRole(userId, 'Admin')) {
            console.log("UserID: ", userId);
            Session.set('isAdmin', 'true');
            console.log("isAdmin", Session.get('isAdmin'));
        }

        if (Roles.userIsInRole(userId, 'User')) {
            console.log(" userID : ", userId);
            Session.set('isUser', 'true');
            console.log("isUser", Session.get('isUser'));
        }
    })
});