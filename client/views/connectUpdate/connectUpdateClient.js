Template.connectUpdate.helpers({
    isEqual: function(v1, v2) {
        if (v1 === v2){
            return true;}

        return false;
    },
    isNotEqual: function(v1, v2) {
        if (v1 != v2){
            return true;}

        return false;
    },

    connectDetails : function() {
    check();
// var req = Session.get('req');
 //alert("Session:" + JSON.stringify(Session.get('connectDetails')) );
// alert('helper called');
return (Session.get('connectDetails'));
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

Template.connectUpdate.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};

Template.connectUpdate.onRendered(function() {
    //alert('oonrednder');
    //alert($('.rateit'));
    $('.rateit').rateit();
    $(".rateit").on('rated', function (event, value) {
        console.log('Rating:' + value)
    });
});

Template.connectUpdate.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
    'click .connectUpdateSubmit': function (event) {
        event.preventDefault();
        console.log('form submitted');
        //console.log('clicked add aid' + event.target.aidName.value);
        var connectUpdate = {};
        if(document.getElementById('Declined') &&  document.getElementById('Declined').checked){
            connectUpdate.status = document.getElementById('Declined').value;
        }
        else if( document.getElementById('Accepted') &&  document.getElementById('Accepted').checked){
            connectUpdate.status = document.getElementById('Accepted').value;
        }

        connectUpdate._id =  document.getElementById('connectId').value;
        connectUpdate.requestId =  document.getElementById('requestId').value;
      //  alert('connectUpdate '+ connectUpdate);
        Meteor.call("updateConnect", connectUpdate, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            Router.go("/");
        });

    }
,

    'click .cancelUpdate': function (event) {
        event.preventDefault();
        console.log('form submitted');
        //console.log('clicked add aid' + event.target.aidName.value);
        var connectUpdate = {};
       // alert(JSON.stringify(this));
        //status to be seeker cancel or vol cancel
        if (Meteor.user()._id ==  document.getElementById('volunteerId').value )
        {
            connectUpdate.status = 'VolunteerCanceled';
        }
        else
        {
            connectUpdate.status = 'RequestorCanceled';
        }
        connectUpdate._id =  document.getElementById('connectId').value;
        connectUpdate.requestId =  document.getElementById('requestId').value;
        //  alert('connectUpdate '+ connectUpdate);
        Meteor.call("updateConnect", connectUpdate, function (error, result) {
          if (error) {
            console.log("error body", (error));
            sAlert.error(error.reason);
            Router.go("/connectUpdate");
          }
          else{
            console.log("success");
            sAlert.success("Connection Cancelled!");
            sAlert.success('', configOverwrite);
          }
        });

    },

    'click .rate': function (event) {
        event.preventDefault();
        console.log('rate submit');
        //console.log('clicked add aid' + event.target.aidName.value);
        var connectUpdate = {};

        if( document.getElementById('Completed') &&  document.getElementById('Completed').checked){
        connectUpdate.status = 'Completed';}
        else if( document.getElementById('UnSuccessful') &&  document.getElementById('UnSuccessful').checked){
            connectUpdate.status = 'UnSuccessful';
            }
        connectUpdate._id =  document.getElementById('connectId').value;
        connectUpdate.requestId =  document.getElementById('requestId').value;

        //rating volunteer aid or reequestor - volunteerAidRating //given by Seeker/ Requestor
        //requestorRating //given by Volunteer
        var rating =0;
        connectUpdate.currentStatus = $('#status').val();

        if ($('#rating')){
        var rating = $('#rating').data('userrating');}
        //if status Pending completion , then vovl aid rating
    //    alert($('#status'));
        if ($('#status').val() == "PendingCompletion" ){
            connectUpdate.volunteerAidRating = rating;
            }
        else
        {
            connectUpdate.status = connectUpdate.currentStatus;
            connectUpdate.requestorRating = rating;
        }

    //    alert('connectUpdate'+JSON.stringify(connectUpdate));
        //seeker

        Meteor.call("updateConnect", connectUpdate, function (error, result) {

          if (error) {
            console.log("error body", (error));
            sAlert.error(error.reason);
            Router.go("/connectUpdate");
          }
          else{
            console.log("success");
            sAlert.success("Thanks for rating!");
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
