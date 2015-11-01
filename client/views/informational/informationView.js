Session.setDefault("sType","Please Select");

Template.informationView.helpers({
  typeList: function() {
    console.log("Session.get('typeList')",Session.get('typeList') );
    return (Session.get('typeList'));
  } ,
infoView: function () {
  return (Session.get('infoView'));
},
Stype: function() {
  return (Session.get("sType"));
},
isEqual: function(v1, v2) {
    if (v1 === v2){
        return true;}

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

Template.home.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};
Template.informationView.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
 "change #stype-select": function (event, template) {
      var type = $(event.currentTarget).val();
      console.log(type);
      Session.set("sType", type);
      Meteor.call("infoView",type, function(error, result){
      Session.set("infoView",result);
  });
},
"change #isVerified": function(event, template) {
  var changeId=event.currentTarget.name;
  console.log("id is"+ changeId);
    if(document.getElementsByName(changeId))
    {
      Meteor.call("infoUpdate",this._id);
      }

  },
  'click .Verify': function (event) {
      event.preventDefault();
      console.log("verify button");
      var Ftype =Session.get('sType');
      //
      Meteor.call("infoView",Ftype, function(error, result){
      Session.set("infoView",result);
  });
}

});
