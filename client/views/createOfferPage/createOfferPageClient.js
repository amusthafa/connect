Session.setDefault("isOther", "Self");
Session.setDefault("pCity", "Please Select");
Session.setDefault("sCity", "Please Select");
Session.setDefault("pState", "Please Select");
Session.setDefault("sState", "Please Select");

Template.createOfferPage.helpers({
  'isOtherChecked': function (event) {
    return (Session.get("isOther") === "Other");
  }
});


Template.createOfferPage.events({
  'change #userType': function (event) {
    console.log(event.currentTarget.name);
    Session.set("isOther", event.currentTarget.value);
    console.log(Session.get("isOther"));
  },
  "change #pcity-select": function (event, template) {
    var city = $(event.currentTarget).val();
        Session.set("pCity",city);
    console.log(Session.get("pCity"));
     },

  "change #scity-select": function (event, template) {
    var city = $(event.currentTarget).val();
    Session.set("sCity",city);
    console.log(Session.get("sCity"));
  },

  "change #pstate-select": function (event, template) {
    var state = $(event.currentTarget).val();
    Session.set("pState",state);
    console.log(Session.get("pState"));
  },

  "change #sstate-select": function (event, template) {
    var state = $(event.currentTarget).val();
    Session.set("sState",state);
    console.log(Session.get("sState"));
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
    createOfferPage.city = Session.get("pCity");
    createOfferPage.state =Session.get("pState");
    createOfferPage.country = event.target.p_country.value;
    createOfferPage.pincode = event.target.p_pincode.value;
  } else {
      createOfferPage.line1 = event.target.s_line1.value;
      createOfferPage.line2 = event.target.s_line2.value;
      createOfferPage.city = Session.get("sCity");
      createOfferPage.state = Session.get("sState");
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








