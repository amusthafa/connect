

Template.adminAuth.helpers({

    'searchUser': function () {
        console.log("Search" + JSON.stringify(Session.get('searchResult')));
        return (Session.get('searchUser'));
    },

    'getUserName': function () {
        console.log("getUserName" + JSON.stringify(Session.get('selectedUser')));
        return (Session.get('selectedUser'));
    },

    'toBeAuthenticatedList': function(){
      console.log("toBeAuthenticated:" + JSON.stringify(Session.get('toBeAuthenticated')));
      return (Session.get('toBeAuthenticated'));
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


Template.adminAuth.onRendered(function () {
  Meteor.call('toBeAuthenticated', function(err, result) {
        console.log("on rendered : toBeAuthenticated: !! result:", JSON.stringify(result));
        Session.set('toBeAuthenticated',result);

});
});

Template.adminAuth.onDestroyed(function () {

    delete Session.keys['selectedUser'];
    delete Session.keys['searchUser'];
});

Template.adminAuth.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
    'click .searchUser': function (event) {
        event.preventDefault();
        console.log("clicked on searchUser!!");

        // Session.set('getUserProfile',0);
        // Session.set('getUserRequest',0);
        Session.set('searchResult', 0);
        EnteredName = $('#Ename').val();

        if (EnteredName) {
            Meteor.call("SearchUser", EnteredName, function (error, result) {
                if (result == 0) {
                    // sAlert.error("No Result Found !")
                }
                else
                    Session.set('searchUser', result);
                // alert('result- '+JSON.stringify(result));
            });
        }
        else
        //  sAlert.error("Please enter a name to search");
            console.log("")
    },

    'click .selectUser': function (event) {
        event.preventDefault();
        console.log("Selcected this user");

        // Meteor.call("SearchProfile", this._id, function(error, result) {
        //     Session.set('getUserProfileforManual',result);
        //     Session.set('getUserRequestforManual',0);
        //     alert('result' +result);
        // });
        Session.set("selectedUser", this._id);
    },

    'click .adminAuth': function (event) {
    //'submit form': function (event) {
        event.preventDefault();
        //console.log('form submitted');
        var adminAuth = {};
       // adminAuth.user = event.target.user.value;
        adminAuth.user = Session.get("selectedUser");
        //adminAuth.status = event.target.status.value;
        adminAuth.status = $("#status").val();
      //  alert('adminauth' +JSON.stringify(adminAuth));

            Meteor.call("updateAdminAuth", adminAuth, function (error, result) {
        //    alert("Client : error" + error + "result - " + result);
            if (error) {
                console.log("error body", (error));
                // sAlert.error(error.reason);

                Router.go("/loadAdminAuth");
            }
            else {
                console.log("success");
                sAlert.success("Updated Successfully", {beep: 'alerts/updatedSuccessfully.mp3'});
                sAlert.success('', configOverwrite);
                var succMsg = "Updated Successfully";
            }
        });
        Router.go("/");
},

'click .updateStatus': function (event) {

  var adminAuth = {};
  adminAuth.user = this._id;
  adminAuth.status = $("#authstatus").val();
  Meteor.call("updateAdminAuth", adminAuth, function (error, result) {
//    alert("Client : error" + error + "result - " + result);
  if (error) {
      console.log("error body", (error));
      // sAlert.error(error.reason);

      Router.go("/loadAdminAuth");
  }
  else {
      console.log("success");
      sAlert.success("Updated Successfully", {beep: 'alerts/updatedSuccessfully.mp3'});
      sAlert.success('', configOverwrite);
      var succMsg = "Updated Successfully";
  }
});

}

});
