Template.resetPassword.events({
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
                message = 'There was an issue: ' + error.reason;
            } else {
                message = 'You reset your password!'
            }
        });
    }
});