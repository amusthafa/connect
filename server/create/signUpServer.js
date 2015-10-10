Meteor.methods({
  signUp: function (userProfile) {
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
        "organizationFlag": userProfile.orgFlag,
        "organization": userProfile.organisationName,
        "occupation": userProfile.occupation,
        "phone": userProfile.mobileNo,
        "sharePhone": userProfile.shareNo,
        "availabilityStatus": "Active",
        "status": "",
        "comments": userProfile.comments,
        "differentlyAbled": userProfile.diffAbled,
        "address": {line1: userProfile.addr1,
        line2: userProfile.addr2,
        city: userProfile.city,
        state: userProfile.state,
        country: userProfile.country,
        pinCode: userProfile.pincode,
        primary: "Yes"},
        "appRole": userProfile.role
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
