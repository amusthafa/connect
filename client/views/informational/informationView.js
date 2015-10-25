Session.setDefault("sType","Please Select");

Template.informationView.helpers({
  typeList: function() {
    console.log("Session.get('typeList')",Session.get('typeList') );
    return (Session.get('typeList'));
  } ,
infoView: function () {
  return (Session.get('infoView'));
}

});

// Template.informationView.onRendered(function () {
//   console.log("Session.get('typeList'):",Session.get('typeList') );
// });

Template.informationView.events({
 "change #stype-select": function (event, template) {
      var type = $(event.currentTarget).val();
      console.log(type);
      Session.set("sType", type);
      Meteor.call("infoView",type, function(error, result){
      Session.set("infoView",result);
  });
}
});
