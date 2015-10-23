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



Template.home.onRendered(function () {
  var user = {userId: Meteor.userId()};
  console.log(user);
  alert("1");
  Meteor.call('getNotifications', user, function (err, result) {
    if (err) {
      alert("2");
      console.log("error" + error);
    } else {
      alert("3");
      console.log("on rendered result:", JSON.stringify(result));
      var res = [];
      var count = [];
      for (var i in result) {
        not = result[i];
        for (var x in not.notification) {
          resfinal = not.notification[x];
          res.push(resfinal);
        }

        for (var y in not.count){
          countFinal = not.count[y];
          count.push(countFinal);
        }
      }


      console.log("NEW" + JSON.stringify(res));
      console.log("Count" + JSON.stringify(count));
      Session.set('notifications', res);
      Session.set('count', count);
    }
  });
})
;


