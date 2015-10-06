Session.setDefault("isOther", "Self");

Template.createOfferPage.helpers({
  'isOtherChecked' : function(event) {
    return (Session.get("isOther") === "Other");
  }
});

Template.createOfferPage.events({
  'change #userType': function (event) {
    console.log(event.currentTarget.name);
    Session.set("isOther", event.currentTarget.value);
    console.log(Session.get("isOther"));
  },
  'submit form': function(event) {
    event.preventDefault();
  var createOfferPage = {};


    if(event.target.userType.value === "Self"){
      createOfferPage.offerType="Self";
      createOfferPage.creatorId=Meteor.userId();
      createOfferPage.volunteerId=Meteor.userId();
    }else{
      createOfferPage.offerType="Other";
      createOfferPage.creatorId=Meteor.userId();
      createOfferPage.requestorId=event.target.requestorId.value;
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
  Router.go("/");
 }

});








