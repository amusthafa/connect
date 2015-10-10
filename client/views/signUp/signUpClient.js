Session.setDefault("isOrg", "No");

Template.signUp.helpers({
  'isOrganisation' : function(event) {
    return (Session.get("isOrg") === "Yes");
  }
});

Template.signUp.events({
  'change #organisation': function (event) {
     console.log(event.currentTarget.name);
      Session.set("isOrg", event.currentTarget.value);
      console.log(Session.get("isOrg"));
  },
    'submit form': function (event) {
        event.preventDefault();
        console.log('form submitted');
        var userProfile = {};
        userProfile.firstName = event.target.firstName.value;
        userProfile.lastName = event.target.lastName.value;
        userProfile.email = event.target.mailId.value;
        userProfile.password = event.target.password.value;
        userProfile.mobileNo = event.target.mobileNo.value;
        if (event.target.shareNo.value == "Yes")
          userProfile.shareNo = true;
        else
          userProfile.shareNo = false;
        userProfile.addr1 = event.target.addr1.value;
        userProfile.addr2 = event.target.addr2.value;
        userProfile.city = event.target.city.value;
        userProfile.state = event.target.state.value;
        userProfile.country = event.target.country.value;
        userProfile.pincode = event.target.pincode.value;
        userProfile.gender = event.target.gender.value;
        userProfile.diffAbled = event.target.diffAbled.value;
        userProfile.dob = event.target.dob.value;
        userProfile.occupation = event.target.occupation.value;
        userProfile.role = event.target.role.value;
        if (event.target.organisation.value == "Yes")
          userProfile.orgFlag = true;
        else
          userProfile.orgFlag = false;
        if (userProfile.orgFlag)
         userProfile.organisationName = event.target.organisationName.value;
        else
         userProfile.organisationName = "";
        userProfile.comments = event.target.comments.value;
        Session.set("isOrg","No");
        var profile = JSON.stringify(userProfile);
        Meteor.call("signUp", userProfile, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            if (error) {
                console.log("error" + error);
                alert(error);
            }
            if (Meteor.user() == null) {
              console.log("Sign up log in");
              Meteor.loginWithPassword(userProfile.email, userProfile.password);
            }
            else {
              console.log("create profile");
            }
            /*if (error.error === "insert-failed") {
             console.log("Please specify mandatory fields.");
             //sAlert.error("Please specify mandatory fields.");
             }*/
            Router.go("/");
        });
    }

});
