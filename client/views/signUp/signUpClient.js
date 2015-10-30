Session.setDefault("isOrg", "No");
// Session.setDefault("isUpdateFlow", true);
// Session.set("isUpdateFlow", Router.current().params.id);

Template.signUp.helpers({
    'isOrganisation': function (event) {
        console.log("Org" + (Session.get("isOrg") === "Yes"));
        return (Session.get("isOrg") === "Yes");
    },
    'cityList': function () {
        return (Session.get('cityList'));
    },
    'stateList': function () {
        return (Session.get('stateList'));
    },
    'isUpdateFlow': function (event) {
        Session.set("isUpdateFlow", Router.current().params.id);
        console.log(Session.get("isUpdateFlow"));
        return (Session.get("isUpdateFlow"));
    },
    getUserDetails: function () {
        console.log("Now" + JSON.stringify(Session.get("userDetails")));
        return (Session.get('userDetails'));
    },
    isEqual: function (v1, v2) {
        if (v1 === v2) {
            return true;
        }
        return false;
    }
});


Template.signUp.onRendered(function () {
    Meteor.call('getAddress', Meteor.userId(), function (err, result) {
        console.log("onrender" + JSON.stringify(result));
        Session.set("userDetails", result);
    });
});

Template.registerHelper('formatDateProfile', function (date) {
    console.log("format date:!!!!:", moment(date).format('MM/DD/YYYY'));
    return moment(date).format('YYYY-MM-DD');
});

Template.signUp.events({
    'change #organisation': function (event) {
        console.log(event.currentTarget.name);
        Session.set("isOrg", event.currentTarget.value);
        console.log(Session.get("isOrg"));
    },
    'click #Cancel' : function(event) {
      Router.go("/");
    },
    'submit form': function (event) {
        event.preventDefault();
        console.log('form submitted');
        if(Router.current().params.id) {
          console.log("Update");
          var userProfile = {};
          userProfile.mobileNo = event.target.mobileNo.value;
          if (event.target.shareNo.value == "Yes")
              userProfile.shareNo = true;
          else
              userProfile.shareNo = false;
          userProfile.addr1 = event.target.addr1.value;
          userProfile.addr2 = event.target.addr2.value;
          userProfile.city = event.target.city.value;
          userProfile.state = event.target.state.value;
          userProfile.pincode = event.target.pincode.value;
          userProfile.diffAbled = event.target.diffAbled.value;
          userProfile.occupation = event.target.occupation.value;
          userProfile.role = event.target.role.value;
          if (event.target.organisation.value == "Yes") {
              userProfile.orgFlag = true;
              console.log(userProfile.orgFlag);
          }
          else
              userProfile.orgFlag = false;
          if (userProfile.orgFlag)
              userProfile.organisationName = event.target.organisationName.value;
          else
              userProfile.organisationName = "";
          userProfile.comments = event.target.comments.value;
          Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.mobileNo": userProfile.mobileNo, "profile.sharePhone" : userProfile.shareNo, "profile.address.line1" : userProfile.addr1, "profile.address.line2" : userProfile.addr2, "profile.address.city" : userProfile.city,
              "profile.address.state" : userProfile.state, "profile.pinCode." : userProfile.pincode, "profile.differentlyAbled" : userProfile.diffAbled, "profile.occupation" : userProfile.occupation, "profile.appRole" : userProfile.role, "profile.organizationFlag" : userProfile.orgFlag, "profile.organization" : userProfile.organisationName,  "profile.comments" : userProfile.comments}});
          sAlert.success("Profile updated successfully!!");
        }
        else{
          console.log("Insert");
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
        Session.set("isOrg", "No");
        var profile = JSON.stringify(userProfile);
        Meteor.call("signUp", userProfile, function (error, result) {

            if (error) {
                console.log("error body", (error));
                sAlert.error(error.reason);
                Router.go("/SignUp");
            }
            else {
                console.log("success");
                sAlert.success("Verification mail has been sent. Please confirm to activate your account!");
                // sAlert.success('', configOverwrite);
            }
        });
        Router.go("/");
      }

    }
});
