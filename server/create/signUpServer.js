Meteor.methods({
  signUp: function (userProfile) {
    process.env.MAIL_URL='smtp://vardhini.mv25%40gmail.com:11500000@smtp.gmail.com:465/';
    console.log('Register');
    console.log(JSON.stringify(userProfile));
    check(userProfile, Object);
    email = userProfile.email;
    password = userProfile.password;
    userID = Accounts.createUser({
      email:email,
      password: password,
      profile : {
        "firstName": userProfile.firstName,
        "lastName": userProfile.lastName,
        "birthday": userProfile.dob,
        "gender": userProfile.gender,
        "organization_flag": userProfile.orgFlag,
        "organization": userProfile.organisationName,
        "occupation": userProfile.occupation,
        "phone": userProfile.mobileNo,
        "share_phone": userProfile.shareNo,
        "availability_status": "Active",
        "status": "",
        "comments": userProfile.comments,
        "differently_abled": userProfile.diffAbled,
        "address": {line1: userProfile.addr1,
        line2: userProfile.addr2,
        city: userProfile.city,
        state: userProfile.state,
        country: userProfile.country,
        pinCode: userProfile.pincode,
        primary: "Yes"},
        "app_role": userProfile.role
      },
      "roles": "Admin"
    });
    Accounts.sendVerificationEmail(userID, userProfile.email, function(err){
    if (err) {
      console.log('We are sorry but something went wrong.');
    }
    else {
      console.log('Email Sent. Check your mailbox.');
    }
    });
  }
});

// (function () {
//   "use strict";
//   Accounts.urls.resetPassword = function (token) {
//     return Meteor.absoluteUrl('reset-password/' + token);
//   };
//   Accounts.urls.verifyEmail = function (token) {
//     return Meteor.absoluteUrl('verify-email/' + token);
//   };
// })();
