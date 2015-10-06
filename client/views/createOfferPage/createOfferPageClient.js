Template.createOfferPage.helpers({
  'add' : function () {
    return "create offer";
  }
});

FieldValueIs = new Mongo.Collection("FieldValueIs");
FieldValueIs.attachSchema(new SimpleSchema({
  a: {
    type: String,
    allowedValues: ["Self", "Other"]
  },
  b: {
    type: String
  }
}));

Template.createOfferPage.events({


  'submit form': function(event) {

  var createOfferPage = {};


    if(event.target.offerTypeSelf.checked){
      createOfferPage.offerType="Self";
      createOfferPage.creatorId=Meteor.userId();
    }else{
      createOfferPage.OfferType="Other";
    }
    createOfferPage.offerName=event.target.offerName.value;

    if (event.target.address1.checked) {
    createOfferPage.line1 = event.target.p_line1.value;
    createOfferPage.line2 = event.target.p_line2.value;
    createOfferPage.city = event.target.p_city.value;
    createOfferPage.state = event.target.p_state.value;
    createOfferPage.country = event.target.p_country.value;
    createOfferPage.pincode = event.target.p_pincode.value;
  } else {
      createOfferPage.line1 = event.target.s_line1.value;
      createOfferPage.line2 = event.target.s_line2.value;
      createOfferPage.city = event.target.s_city.value;
      createOfferPage.state = event.target.s_state.value;
      createOfferPage.country = event.target.s_country.value;
      createOfferPage.pincode = event.target.s_pincode.value;
  }

    createOfferPage.aid=event.target.Aid.value;
    createOfferPage.fromDate=event.target.fromDate.value;
    createOfferPage.toDate=event.target.toDate.value;
    createOfferPage.comment=event.target.comment.value;
  Meteor.call("createOffer", createOfferPage);
    Meteor.call("volunteerAid", createOfferPage);
  Router.go("/");
 }

});




