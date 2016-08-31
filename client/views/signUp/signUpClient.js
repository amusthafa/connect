Session.setDefault("isOrg",false);
Session.setDefault("isVolunteer",false);
// Session.setDefault("isUpdateFlow", true);
// Session.set("isUpdateFlow", Router.current().params.id);

Template.signUp.helpers({
    'isOrganisation': function (event) {
        console.log("Org" + (Session.get("isOrg")));
        return (Session.get("isOrg"));
    },
    'isVolunteer': function (event) {
        console.log("Volunteer" + (Session.get("isVolunteer")));
        return (Session.get("isVolunteer"));
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
    ///menu - start
    ,
    isNotEqual: function (v1, v2) {
        if (v1 != v2) {
            return true;
        }
        return false;
    },
    menuOpen: function() {
        return Session.get(MENU_KEY) && 'menu-open';
    },
    userMenuOpen: function() {
        return Session.get(USER_MENU_KEY);
    },
    connected: function() {
        if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
            return Meteor.status().connected;
        } else {
            return true;
        }
    }
///menu - end

});


var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, true);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

Meteor.startup(function () {
    // set up a swipe left / right handler
    $(document.body).touchwipe({
        wipeLeft: function () {
            Session.set(MENU_KEY, false);
        },
        wipeRight: function () {
            Session.set(MENU_KEY, true);
        },
        preventDefaultEvents: false
    });

});

Template.signUp.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};

Template.signUp.onRendered(function () {
    Meteor.call('getAddress', Meteor.userId(), function (err, result) {
        console.log("onrender" + JSON.stringify(result));
        Session.set("userDetails", result);
    });
});

Template.signUp.onDestroyed(function () {

    delete Session.keys['userDetails'];
    delete Session.keys['isOrg'];
    delete Session.keys['isVolunteer'];
    // delete Session.keys['searchUser'];
});


Template.registerHelper('formatDateProfile', function (date) {
    console.log("format date:!!!!:", moment(date).format('MM/DD/YYYY'));
    return moment(date).format('YYYY-MM-DD');
});

Template.signUp.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
    'change #organisation': function (event) {
        console.log(event.currentTarget.name);
        Session.set("isOrg",document.getElementById("organisation").checked);
        console.log(Session.get("isOrg"));
    },
    'change #role': function (event) {
        console.log(event.currentTarget.name);
        if (event.currentTarget.value != "Seeker") {
          Session.set("isVolunteer", true);
        }
        else {
          Session.set("isVolunteer", false);
        }
        console.log(Session.get("isVolunteer"));
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
         userProfile.shareNo=  document.getElementById("shareNo").checked;
          userProfile.addr1 = event.target.addr1.value;
          userProfile.addr2 = event.target.addr2.value;
          userProfile.city = event.target.city.value;
          userProfile.state = event.target.state.value;
          userProfile.pincode = event.target.pincode.value;
          userProfile.diffAbled=  document.getElementById("diffAbled").checked;
          userProfile.term = $("input[name='term']:checked").val();
          userProfile.occupation = event.target.occupation.value;
          userProfile.role = event.target.role.value;
          userProfile.orgFlag=document.getElementById("organisation").checked;
              console.log(userProfile.orgFlag);

          if (userProfile.orgFlag)
              userProfile.organisationName = event.target.organisationName.value;
          else
              userProfile.organisationName = "";
          userProfile.comments = event.target.comments.value;
          Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.mobileNo": userProfile.mobileNo, "profile.sharePhone" : userProfile.shareNo, "profile.address.line1" : userProfile.addr1, "profile.address.line2" : userProfile.addr2, "profile.address.city" : userProfile.city,
              "profile.address.state" : userProfile.state, "profile.pinCode." : userProfile.pincode, "profile.differentlyAbled" : userProfile.diffAbled, "profile.occupation" : userProfile.occupation, "profile.appRole" : userProfile.role, "profile.term" : userProfile.term, "profile.organizationFlag" : userProfile.orgFlag, "profile.organization" : userProfile.organisationName,  "profile.comments" : userProfile.comments}});
          sAlert.success("Profile updated successfully!!",{timeout: 5000,  position: 'top-right', effect: 'slide'});
        }
        else{
          console.log("Insert");
        var userProfile = {};
        userProfile.firstName = event.target.firstName.value;
        userProfile.lastName = event.target.lastName.value;
        userProfile.email = event.target.mailId.value;
        userProfile.password = event.target.password.value;
        userProfile.mobileNo = event.target.mobileNo.value;
        userProfile.shareNo=  document.getElementById("shareNo").checked;
        userProfile.addr1 = event.target.addr1.value;
        userProfile.addr2 = event.target.addr2.value;
        userProfile.city = event.target.city.value;
        userProfile.state = event.target.state.value;
        userProfile.country = event.target.country.value;
        userProfile.pincode = event.target.pincode.value;
        userProfile.gender = event.target.gender.value;
        userProfile.diffAbled=  document.getElementById("diffAbled").checked;
        userProfile.term = $("input[name='term']:checked").val();
        console.log($("input[name='term']:checked").val());
        userProfile.dob = event.target.dob.value;
        userProfile.occupation = event.target.occupation.value;
        userProfile.role = event.target.role.value;
        userProfile.orgFlag=document.getElementById("organisation").checked;
          console.log(userProfile.orgFlag);
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
                Router.go("/SignUp/0");
            }
            else {
                console.log("success");
                sAlert.success("Verification mail has been sent to the user. Please confirm to activate your account!",{timeout: 8000,  position: 'top-right', effect: 'slide'});
                // sAlert.success('', configOverwrite);
            }
        });
        Router.go("/login");
      }

    }
});
