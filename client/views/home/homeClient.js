Template.home.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err){
      if (err != null) {
        console.log("Error :  " + err.reason);
      } else {
        console.log("Verified email");
      }
      });
    }

  if (Accounts._resetPasswordToken) {
      Session.set('resetPasswordToken', Accounts._resetPasswordToken);
  }
};
