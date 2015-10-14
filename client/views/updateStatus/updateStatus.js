Template.updateStatus.helpers({getRequestforUpdate : function() {
    check();
// var req = Session.get('req');
// console.log("Session:" , JSON.stringify(Session.get('req')) );
 //alert('helper called' + (JSON.stringify( Session.get('updateStatus') )));
return (Session.get('updateStatus'));
}

});

Template.updateStatus.onRendered(function() {
  /*  if ( _.isEmpty(Session.get('req')) ) {
        console.log("Meteor.user", Meteor.user()._id );
        Meteor.call('getRequest', function(err, result) {
            console.log("on rendered result:", JSON.stringify(result));
            Session.set('req', result);
        });
    }*/
});

Template.updateStatus.events({

    'submit form': function (event) {
        event.preventDefault();
        console.log('form submitted');
        //console.log('clicked add aid' + event.target.aidName.value);
        var request = {requestId:event.target.requestId.value};

        // var aidJson = JSON.stringify(aid);
         alert('client ' + request);
        //Router.go("/addAid",{query : 1});

        Meteor.call("getRequestWithConnect", request, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            Session.set('updateStatus',result);

        });

    },
    'click .update' : function (event) {
        event.preventDefault();
        var connect={_id : document.getElementById('_id').value, status :document.getElementById('status').value};

        alert('connect - '+JSON.stringify(connect));
        Meteor.call("updateConnect",connect, function (error, result) {
            console.log('connect - ' + result);
          //  Router.go("/");
        });
    }


});

