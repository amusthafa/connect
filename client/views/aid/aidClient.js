Template.aid.onDestroyed(function () {

    delete Session.keys['SearchAidforDelete'];
});
Template.aid.helpers({
    'add': function () {
        return "add aid";
    }

    ///menu - start
    ,
    'SearchAidforDelete': function () {
        //console.log("Search" + JSON.stringify('Session.get('searchResult')') );
        return (Session.get('SearchAidforDelete'));
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

Template.aid.events({

    'click .addAid': function (event) {
        event.preventDefault();
        //console.log('form submitted');
        console.log('clicked add aid');
        var aid = {};
        aid.aid_name = $('#aidName').val();

        Meteor.call("addAid", aid, function (error, result) {
          console.log("Admin Add Aid" , JSON.stringify(result));

          if (error) {
            console.log("error body", (error));
            sAlert.error(error.reason);
            Router.go("/loadAid");
          }
          else{
            console.log("success");
            sAlert.success("Aid Added Successfully!");
            sAlert.success('', configOverwrite);
          }

        });
        Router.go("/");
    },
    'click .searchAid' : function(event) {
      event.preventDefault();
      Session.set('getUserProfile',0);
      Session.set('getUserRequest',0);
      Session.set('searchResult',0);
      aidName = $('#aidSearch').val();
      console.log(aidName);
      if(aidName) {
          Meteor.call("SearchAid",aidName, function(error, result) {
            console.log(JSON.stringify(result));
              if (result == 0) {
                  sAlert.error("No Result Found !")
              }
              else
                  Session.set('SearchAidforDelete',result);
          });
      }
      else
          sAlert.error("Please enter a name to search");
    },
    'click .deleteAid': function(event) {
            event.preventDefault();
            console.log("clicked aid delete");
            Meteor.call("DeleteAid", this._id, function (error, result) {
              if (error) {
                console.log("error body", (error));
                sAlert.error(error.reason);
                Router.go("/loadAid");
              }
              else{
                console.log("success");
                sAlert.success("Aid Deleted Successfully!");
              }
            });
            Router.go("/");
    },

    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    }

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

Template.aid.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};
