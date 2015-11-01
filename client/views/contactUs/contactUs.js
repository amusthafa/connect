//contact Us

Template.contactUs.onRendered(function () {
    Meteor.call('getContactUsDetails', function (err, result) {
        console.log("on rendered : getContactUsDetails:", JSON.stringify(result));
        Session.set("contactUsDetails", result);
    });
});

Template.contactUs.helpers({getContactUsDetails : function() {
  check();
  return (Session.get('contactUsDetails'));
}
    ///menu - start
    ,
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

Template.contactUs.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};

Template.feedback.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};

Template.viewFeedbacks.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};

Template.addTocontactUs.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};


//Feedback

Template.feedback.helpers({getUserDetails : function() {
  check();
  var userDetails = {
    name: Meteor.user().profile.firstName,
    email : Meteor.user().emails[0].address
  }
  return (userDetails);
}
    ///menu - start
    ,
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

Template.feedback.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },

    'submit form': function (event) {
        event.preventDefault();
        // console.log('clicked on add contact', event.target.addContact.value);
        var feedback = {
          "name": event.target.name.value,
          "emailId":event.target.emailId.value,
          "subject": event.target.subject.value,
          "message": event.target.message.value,
          // "needAttention":"Yes",
          "status":"Pending"
        };

        console.log("feedback:" , JSON.stringify(feedback));
        Meteor.call("saveFeedback", feedback, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            Router.go("/");
        });
    }
});


// View Feedbacks

Template.viewFeedbacks.onRendered(function () {
    Meteor.call('getAllFeedbacks', function (err, result) {
        console.log("on rendered : getAllFeedbacks:", JSON.stringify(result));
        Session.set("getAllFeedbacks", result);
    });
});

Template.viewFeedbacks.helpers({

  getAllFeedbacks : function() {
    check();
    return (Session.get('getAllFeedbacks'));
  },

  isEqual: function(v1, v2) {
    console.log("v1, v2:", v1, v2);
      if (v1 === v2){
          console.log("true");
          return true;}
      console.log("false");
      return false;
  }
    ///menu - start
    ,
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

Template.viewFeedbacks.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },

    'click .Done': function (event) {
        event.preventDefault();
        feedbackId = this._id;
        console.log('feedbackId', feedbackId);
        Meteor.call("updateFeedback", feedbackId, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            Router.go("/");
        });
    }
});

//Add To Contact Us

Template.addTocontactUs.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },

    'submit form': function (event) {
        event.preventDefault();
        // console.log('clicked on add contact', event.target.addContact.value);
        var addContact = {
          "contactName": event.target.contactName.value,
          "phoneNumber":event.target.phoneNumber.value,
          "emailId": event.target.emailId.value
        };
        console.log("contact to add:" , JSON.stringify(addContact));
        Meteor.call("addToContactUS", addContact, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            Router.go("/");
        });
    }
});

Template.addTocontactUs.helpers({
    ///menu - start

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
