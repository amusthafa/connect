Session.setDefault("isOrg", "No");

Template.signUp.helpers({
  'isOrganisation' : function(event) {
    return (Session.get("isOrg") === "Yes");
  },
  'cityList': function () {
      return (Session.get('cityList'));
  },
  'stateList': function () {
      return (Session.get('stateList'));
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

          if (error) {
            console.log("error body", (error));
            sAlert.error(error.reason);
            Router.go("/SignUp");
          }
          else{
            console.log("success");
            sAlert.success("Successfully registered.");
            sAlert.success('', configOverwrite);
            Router.go("/");
          }
        });
    }

});
