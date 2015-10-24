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
});

//Feedback

Template.feedback.helpers({getUserDetails : function() {
  check();
  var userDetails = {
    name: Meteor.user().profile.firstName,
    email : Meteor.user().emails[0].address
  }
  return (userDetails);
}
});

Template.feedback.events({

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
      alert("!");
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
});

Template.viewFeedbacks.events({

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
