Template.match.helpers({matchRequestVolunteer : function() {
    check();
    return (Session.get('match').volunteerList);
}

,
    requestId : function() {
        check();
        var match = Session.get('match');
        return (Session.get('match').requestId);


    }
    ,
    requestDate : function() {
        check();
        var match = Session.get('match');
        return (Session.get('match').requiredBy);
    }


}
);

Template.match.events({
    'click .connect' : function (event) {
         event.preventDefault();
         var connect={};
        connect.volunteerAidId = document.getElementById('volunteerAidId').value;
        connect.volunteerId = document.getElementById('volunteerId').value;
        connect.requestId = document.getElementById('requestId').value;
        connect.requestDate = document.getElementById('requestDate').value;
        connect.seekerId=Meteor.userId();
        connect.aidId = document.getElementById('aidId').value;

            alert('connect - '+JSON.stringify(connect));
         Meteor.call("connect",connect, function (error, result) {
         console.log('connect - ' + result);
         });
    }
    ,
    'submit form': function (event) {
        event.preventDefault();
       // alert('form submitted');
        console.log('clicked request id' + event.target.requestId.value);

        var request = {};
        //request._id= 'oEsBxoiLvhXHwRJ3G';
        request._id = document.getElementById('requestId').value;
        alert('request - '+JSON.stringify(request));
        Meteor.call("matchRequestVolunteer", request, function (error, result) {
            console.log("Client : error" + error + "result - " + result);
          /*  if (error) {
                console.log("error" + error);
            }*/
         //   console.log("routing to home");
        //    else
         //       Router.go("/");

            /*if (error.error === "insert-failed") {
             console.log("Please specify mandatory fields.");
             //sAlert.error("Please specify mandatory fields.");
             }*/
            //
          //  alert('routing to home'+JSON.stringify(result));
          //  Router.go("/");

            Session.set("match",result);
        });

    }

});

