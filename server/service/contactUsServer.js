Meteor.methods({
getContactUsDetails : function(){
    check();
  var contacts = ContactUsDetails.find().fetch();
  console.log("Server getContactUsDetails:" , JSON.stringify(contacts));
    return contacts;
},

getAllFeedbacks : function(){
    check();
  var feedbacks = Feedback.find().fetch();
  console.log("Server getAllFeedbacks:", JSON.stringify(feedbacks));
    return feedbacks;
},

addToContactUS : function(contact){
    check(contact,Object);

    var contactEntry = {
        "contactName": contact.contactName,
        "phoneNumber":contact.phoneNumber,
        "emailId": contact.emailId
    }

    ContactUsDetails.insert(contactEntry, function (error, result) {

        console.log("Contact insert " + JSON.stringify(result));
        if (error) {
              console.log("sanitizedError!!!:", error.sanitizedError);
            throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
        }
        else{
        return contactEntry;
      }
    });
},

saveFeedback : function(feedback){
    check(feedback,Object);

    var feedback = {
      "name": feedback.name,
      "emailId":feedback.emailId,
      "subject": feedback.subject,
      "message": feedback.message,
      "status":feedback.status
    };

    Feedback.insert(feedback, function (error, result) {

        console.log("feedback insert " + JSON.stringify(result));
        if (error) {
              console.log("sanitizedError!!!:", error.sanitizedError);
            throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
        }
        else{
        return contactEntry;
      }
    });
},

updateFeedback : function(feedbackID){
    check(feedbackID,String);
    Feedback.update({_id: feedbackID}, { $set: {"status": "Done"}}, function (error, result) {

        console.log("feedback insert " + JSON.stringify(result));
        if (error) {
              console.log("sanitizedError!!!:", error.sanitizedError);
            throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
        }
        else{
        return contactEntry;
      }
    });
},
});
