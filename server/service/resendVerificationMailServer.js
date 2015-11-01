Meteor.methods({
  resendVerificationEmail: function (data) {
    check(data,Object);
    console.log('resend verification mail' + data.mail);
    userMail = Meteor.users.findOne({'emails.0.address' : data.mail}, {'emails' : 1});
    console.log(userMail.emails[0].verified);
    isMailVerified = userMail.emails[0].verified;
    if (isMailVerified == false) {
      userId = Meteor.users.findOne({'emails.0.address' : data.mail}, {_id : 1});
      console.log(userId._id);
      Accounts.sendVerificationEmail(userId._id, data.mail, function(error, result){
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
});
