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

Template.home.helpers({
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


