Template.adminAuth.helpers({

    'searchUser': function () {
        console.log("Search" + JSON.stringify(Session.get('searchResult')));
        return (Session.get('searchUser'));
    },

    'getUserName': function () {
        console.log("getUserName" + JSON.stringify(Session.get('selectedUser')));
        return (Session.get('selectedUser'));
    }
});

Template.adminAuth.onDestroyed(function () {

    delete Session.keys['selectedUser'];
    delete Session.keys['searchUser'];
});

Template.adminAuth.events({

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

    'submit form': function (event) {
        event.preventDefault();
        //console.log('form submitted');
        var adminAuth = {};
        adminAuth.user = event.target.user.value;
        adminAuth.status = event.target.status.value;

        Meteor.call("updateAdminAuth", adminAuth, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            if (error) {
                console.log("error body", (error));
                // sAlert.error(error.reason);
                Router.go("/loadAdminAuth");
            }
            else {
                console.log("success");
                var succMsg = "Successfully updated!";
            }
        });
        Router.go("/");
    }
});
