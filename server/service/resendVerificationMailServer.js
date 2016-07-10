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
  },

  sendMail : function(user, reqID){
    check(user,Object);
    check(reqID,String);
    var admin = Meteor.users.find({roles:"Admin"}).fetch();
// NOTE: commenting out, as notification is getting sent to the user himself and not for admin

    // console.log('user details!!!! ' + JSON.stringify(user) + "-------- req ID" +  reqID);
    // console.log('admin details!!!! ' + JSON.stringify(admin));
    // var notificationData = {
    //     // requestorId: user._id,
    //     // connectId: connectId,
    //     requestId: reqID,
    //     status: 'Unread',
    //     userId: user._id,
    //     type: 'Submitted',
    //     description: 'Request for a Manual Connect through Admin'
    // };
    //
    // console.log("notificationData!!!:" +  JSON.stringify(notificationData));
    // notiId = Notifications.insert(notificationData, function (error, result) {
    //         console.log("notification id - " + result);
    //         if (error) {
    //             console.log("Errors !!" + error + "  Result - " + result);
    //             //TO-DO: error message()
    //             // throw new Meteor.Error("insert-failed", error.message);
    //             throw new Meteor.Error("insert-failed", error);
    //           }
    //         });

    Email.send({
        to: ['olaamigo.app@gmail.com'],
        cc: user.emails[0].address,
        from: 'olaamigo.app@gmail.com',
        subject: user.profile.firstName + user.profile.lastName + ' Requesting for Manual Connect ',
        text: user.profile.firstName + user.profile.lastName +" has requested Admin to perform a Manual Connect to Any Authentic Volunteer \n \n Thanks, \n Amigos"
    });
    console.log('email sent');
  }
});
