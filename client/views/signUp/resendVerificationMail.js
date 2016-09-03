Template.resendVerificationMail.onRendered(function() {
  this.$('#resendVerificationMail').validate()
});

Template.resendVerificationMail.events({
    'submit #resendVerificationMail': function (event) {
        event.preventDefault();
        var data={};
        data.email=event.target.mailId.value;
        console.log(data.email);
        Meteor.call('resendVerificationEmail', data, function (err, result) {
            if(err) {
              sAlert.error(err.reason);
            }
            else {
              sAlert.success('Verification mail has been sent to you. Please confirm to activate your account',{beep: 'alerts/verifyEmail.mp3'});
            }
        });
        Router.go("/login");
        }
});
