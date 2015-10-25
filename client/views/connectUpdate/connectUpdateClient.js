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

});


Template.connectUpdate.onRendered(function() {
    alert('oonrednder');
    alert($('.rateit'));
    $('.rateit').rateit();
    $(".rateit").on('rated', function (event, value) {
        console.log('Rating:' + value)
    });
});

Template.connectUpdate.events({

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
        alert(JSON.stringify(this));
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
            console.log("Client : error" + error + "result - " + result);
            Router.go("/");
        });

    }

});

