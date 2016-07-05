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
        "appRole": userProfile.role,
        "term" : userProfile.term
      }
      // "roles": "User"
    });
    Accounts.sendVerificationEmail(userID, userProfile.email, function(error, result){
      console.log("Signup insert " + JSON.stringify(result));
      if (error) {
          console.log("sanitizedError!!!:", error.sanitizedError);
          throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
      }
      else {
         /* requestDb._id=result;
          return requestDb;*/
      }
    });
    Roles.addUsersToRoles( userID, ['User']);
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
