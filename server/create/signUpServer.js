Meteor.methods({signUp: function (userProfile) {

    console.log('Register');
    console.log(JSON.stringify(userProfile));
    check(userProfile, Object);
    email = userProfile.email;
    password = userProfile.password;
    Accounts.createUser({
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
        "status": "Active",
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
    // address = new Mongo.Collection("Address");
    // tempAddr = address.insert({
    //   line1: userProfile.addr1,
    //   line2: userProfile.addr2,
    //   city: userProfile.city,
    //   state: userProfile.state,
    //   country: userProfile.country,
    //   pinCode: userProfile.pincode,
    //   primary: "Yes"
    // });
    // Profile = new Mongo.Collection("UserProfile");
    // Profile.insert({
    // "firstName": userProfile.firstName,
    // "lastName": userProfile.lastName,
    // "birthday": userProfile.dob,
    // "gender": userProfile.gender,
    // "organization_flag": userProfile.orgFlag,
    // "organization": userProfile.organisationName,
    // "occupation": userProfile.occupation,
    // "phone": userProfile.mobileNo,
    // "share_phone": userProfile.shareNo,
    // "status": "Active",
    // "comments": userProfile.comments,
    // "differently_abled": userProfile.diffAbled,
    // "address": {line1: userProfile.addr1,
    // line2: userProfile.addr2,
    // city: userProfile.city,
    // state: userProfile.state,
    // country: userProfile.country,
    // pinCode: userProfile.pincode,
    // primary: "Yes"},
    // "app_role": userProfile.role
    // });
}});
