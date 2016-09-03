Template.manualConnect.onDestroyed(function () {

    delete Session.keys['SearchUserforManual'];
    delete Session.keys['getUserProfileforManual'];
    delete Session.keys['getUserRequestforManual'];
    delete Session.keys['selectedRequestManual'];
    delete Session.keys['volunteerManualConnect'];
    delete Session.keys['searchVolunteerforManual'];
});


Template.manualConnect.helpers ({


        'searchVolunteerforManual': function () {
    //console.log("Search" + JSON.stringify('Session.get('searchResult')') );
    return (Session.get('searchVolunteerforManual'));
},
    'SearchUserforManual': function () {
        //console.log("Search" + JSON.stringify('Session.get('searchResult')') );
        return (Session.get('SearchUserforManual'));
    },
    'getUserProfileforManual': function () {
        //console.log("Search" + JSON.stringify('Session.get('searchResult')') );
        return (Session.get('getUserProfileforManual'));
    },
    'getUserRequestforManual': function () {
        //console.log("Search" + JSON.stringify('Session.get('searchResult')') );
        return (Session.get('getUserRequestforManual'));
    },
    'selectedRequestManual': function () {
        //console.log("Search" + JSON.stringify('Session.get('searchResult')') );
        return (Session.get('selectedRequestManual'));
    },
    'volunteerManualConnect': function () {
        //console.log("Search" + JSON.stringify('Session.get('searchResult')') );
        return (Session.get('volunteerManualConnect'));
    },
    isNotEqual: function(v1, v2) {
        if (v1 != v2){
            return true;}

        return false;
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

Template.manualConnect.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};

Template.manualConnect.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },

    'click .searchUserforManual' : function (event) {
        event.preventDefault();


        Session.set('getUserProfile',0);
        Session.set('getUserRequest',0);
        Session.set('searchResult',0);
        EnteredName = $('#Ename').val();
     //   alert('EnteredName- '+JSON.stringify(EnteredName));
        if(EnteredName) {
            Meteor.call("SearchUser",EnteredName, function(error, result) {
    //            alert('result- '+JSON.stringify(result));
                if (result == 0) {
                    sAlert.error("No Result Found !", ,{beep: 'alerts/noResultsFound.mp3'})
                }
                else
                    Session.set('SearchUserforManual',result);
      //          alert('result- '+JSON.stringify(result));
            });
        }
        else
            sAlert.error("Please enter a name to search");

    },




        'click .searchVolunteerforManual' : function (event) {
    event.preventDefault();


    Session.set('getUserProfile',0);
    Session.set('getUserRequest',0);
    Session.set('searchResult',0);
    EnteredName = $('#EnameVol').val();
    //   alert('EnteredName- '+JSON.stringify(EnteredName));
    if(EnteredName) {
        Meteor.call("SearchUser",EnteredName, function(error, result) {
            //            alert('result- '+JSON.stringify(result));
            if (result == 0) {
                sAlert.error("No Result Found !",{beep: 'alerts/noResultsFound.mp3'})
            }
            else
                Session.set('searchVolunteerforManual',result);
                 //    alert('result- '+JSON.stringify(result));
        });
    }
    else
        sAlert.error("Please enter a name to search");

},




'click .requestforManual': function(event) {
        event.preventDefault();
        console.log("clicked request");
        var UserReq = Session.get('searchResult');

      // alert (JSON.stringify(this));
            Meteor.call("SearchRequest", this._id, function (error, result) {
                if (result == 0) {
                    sAlert.error("No Request found for this User",{beep: 'alerts/noResultsFound.mp3'});
                }
                else {
                  //  alert('result' +result);
                    Session.set('getUserRequestforManual', result);
                 //   Session.set('getUserProfileforManual', 0);
                    console.log("Requests:" + JSON.stringify(result));
                }
            });

    },
    'click .profileforManual': function(event){
        event.preventDefault();
        console.log("Clicked Profile");

                Meteor.call("SearchProfile", this._id, function(error, result) {
                    Session.set('getUserProfileforManual',result);
                   // Session.set('getUserRequestforManual',0);
                //    alert('result' +result);
                });

    },

        'click .requestManualConnect': function(event){
    event.preventDefault();
    console.log("requestManualConnect");
        //    alert(JSON.stringify(this));
            var selectedRequestMC=(this);
            Session.set('selectedRequestManual',selectedRequestMC);
        //reset others
            delete Session.keys['getUserProfileforManual'];
            delete Session.keys['getUserRequestforManual'];

},

    'click .volunteerManualConnect': function(event){
        event.preventDefault();
        console.log("volunteerManualConnect");
     //   alert(JSON.stringify(this));
        var selectedVolMC=(this);
        Session.set('volunteerManualConnect',selectedVolMC);

    },


    'click .manualConnect': function(event)
{
    var connect={};

    connect.volunteerAidId = 'Manual';
    var volunteerManualConnect =Session.get('volunteerManualConnect');
    var selectedRequestManual =Session.get('selectedRequestManual');
    connect.volunteerId = volunteerManualConnect._id;
    connect.requestId =selectedRequestManual._id;
    connect.requestDate =selectedRequestManual.requiredBy;
    //connect.requestId = document.getElementById('requestId').value;
    //connect.requestDate = document.getElementById('requestDate').value;
    connect.seekerId=selectedRequestManual.requestorId;
    connect.aidId = selectedRequestManual.aidId
    //connect.aidId = document.getElementById('aidId').value;
    connect.connectedBy= 'Admin';
   //   alert('connect - '+JSON.stringify(connect));

    Meteor.call("connect",connect, function (error, result) {

                      if (error) {
                        console.log("error body", (error));
                        sAlert.error(error.reason);
                        Router.go("/manualConnect");
                      }
                      else{
                        console.log("success");
                        sAlert.success("Manual Connection Successful",{beep: 'alerts/manualSuccess.mp3'});
                        sAlert.success('', configOverwrite);
                      }
    });

    Router.go("/");

}
});

Template.registerHelper('formatDate', function(date) {
    console.log("format date:!!!!:", moment(date).format('DD-MM-YYYY'));
    return moment(date).format('DD-MM-YYYY');
});
