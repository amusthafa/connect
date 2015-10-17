Template.connectUpdate.helpers({connectDetails : function() {
    check();
// var req = Session.get('req');
// console.log("Session:" , JSON.stringify(Session.get('req')) );
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

    'submit form': function (event) {
        event.preventDefault();
        console.log('form submitted');
        //console.log('clicked add aid' + event.target.aidName.value);
        var connectUpdate = {};
        connectUpdate.status = event.target.status.value;
        connectUpdate._id = event.target._id.value;
        connectUpdate.requestId = event.target.requestId.value;

        // var aidJson = JSON.stringify(aid);
        // alert('client ' + paramsJson);
        //Router.go("/addAid",{query : 1});

        Meteor.call("updateConnect", connectUpdate, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
            Router.go("/");
        });

    }

});

