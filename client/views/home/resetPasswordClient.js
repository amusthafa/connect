Template.resetPassword.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
    'submit #resetPasswordForm': function (e, t) {
        e.preventDefault();
        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
        currentPassword = resetPasswordForm.find('#currentPassword').val()
        console.log(password);
        console.log(Meteor.userId());
        console.log(currentPassword);
        Accounts.changePassword(currentPassword, password, function(error) {
            if (error) {
                // message = 'There was an issue: ' + error.reason;
                sAlert.error("There was an issue"+ error.reason);
                // alert(message);

            } else {
                // message = 'You reset your password!'
                // alert("success");
                sAlert.success("Password is reset successfully.");
                // sAlert.success('', configOverwrite);
                Router.go("/");
            }
        });
    }
});
Template.resetPassword.helpers({

///menu - start

    menuOpen: function () {
        return Session.get(MENU_KEY) && 'menu-open';
    },
    userMenuOpen: function () {
        return Session.get(USER_MENU_KEY);
    },
    connected: function () {
        if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
            return Meteor.status().connected;
        } else {
            return true;
        }
    }
///menu - end

});


var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, true);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

Meteor.startup(function () {
    // set up a swipe left / right handler
    $(document.body).touchwipe({
        wipeLeft: function () {
            Session.set(MENU_KEY, false);
        },
        wipeRight: function () {
            Session.set(MENU_KEY, true);
        },
        preventDefaultEvents: false
    });

});

Template.resetPassword.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};