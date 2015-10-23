Template.connectUpdate.helpers({
    isEqual: function(v1, v2) {
        if (v1 === v2){
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
  /*  if ( _.isEmpty(Session.get('req')) ) {
        console.log("Meteor.user", Meteor.user()._id );
        Meteor.call('getRequest', function(err, result) {
            console.log("on rendered result:", JSON.stringify(result));
            Session.set('req', result);
        });
    }*/
});

Template.connectUpdate.events({

    'click .connectUpdateSubmit': function (event) {
        event.preventDefault();
        console.log('form submitted');
        //console.log('clicked add aid' + event.target.aidName.value);
        var connectUpdate = {};
        alert( document.getElementById('status').value);
        connectUpdate.status = document.getElementById('status').value;
        connectUpdate._id =  document.getElementById('connectId').value;
        connectUpdate.requestId =  document.getElementById('requestId').value;

        Meteor.call("updateConnect", connectUpdate, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            Router.go("/");
        });

    }

});

