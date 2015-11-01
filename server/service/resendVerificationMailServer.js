Meteor.methods({
  resendVerificationEmail: function (data) {
    check(data,Object);
    console.log('resend verification mail' + data.email);
    userMail = Meteor.users.findOne({'emails.0.address' : data.email}, {'emails' : 1});
    if(userMail == null) {
          throw new Meteor.Error(904, 'User is not registered');
    }
    else {
      console.log(userMail.emails[0].verified);
      isMailVerified = userMail.emails[0].verified;
      if (isMailVerified == false) {
        userId = Meteor.users.findOne({'emails.0.address' : data.email}, {_id : 1});
        console.log(userId._id);
        Accounts.sendVerificationEmail(userId._id, data.email, function(error, result){
          if (error) {
              console.log("sanitizedError!!!:", error.sanitizedError);
              throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
            }
        });
      }
      else {
        throw new Meteor.Error(903, 'Email is verified already');
      }
    }
  }
});
