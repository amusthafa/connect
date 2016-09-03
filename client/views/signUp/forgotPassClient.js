Template.forgotPass.helpers({
  resetPassword: function() {
    return Session.get('resetPasswordToken');
  }
});

Template.forgotPass.onRendered(function() {
  this.$('#forgotPassForm').validate()
});

Template.forgotPass.events({
    'submit #forgotPassForm': function (event) {
        event.preventDefault();
        console.log('forgot password');
        email = event.target.mailId.value;
        console.log(email);
        Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
            message = 'This email does not exist.';
            sAlert.error("This email does not exist.",{beep: 'alerts/noEmailExists.mp3'});
          } else {
            console.log('We are sorry but something went wrong.');
            message = 'We are sorry but something went wrong.';
            sAlert.error("We are sorry but something went wrong.");
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
          message = 'Email Sent. Check your mailbox.';
          sAlert.success("A mail has been sent for password recovery. Please check your mailbox",{beep: 'alerts/passwordRecovery.mp3'})
          sAlert.success('', configOverwrite);
        }
      });
      Router.go("/");
    },
    'submit #setNewPass': function (event) {
      event.preventDefault();
      var password = event.target.password.value;
      Accounts.resetPassword(
          Session.get('resetPasswordToken'),
          password,
          function (error) {
            if (err) {
              template.find('#form-messages').html('There was a problem resetting your password.');
            } else {
               Session.set('resetPasswordToken', null);
            }
      });
    }
});
