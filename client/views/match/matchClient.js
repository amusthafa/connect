Template.match.helpers({matchRequestVolunteer : function() {
    check();
    var match = Session.get('match');
     console.log("Session:" , JSON.stringify(match));
    return (Session.get('match'));
}

});



Template.match.events({

    'submit form': function (event) {
        event.preventDefault();
       // alert('form submitted');
        console.log('clicked request id' + event.target.requestId.value);

        var request = {};
        request._id= 'oEsBxoiLvhXHwRJ3G';
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
            alert('routing to home'+JSON.stringify(result));
          //  Router.go("/");
            Session.set("match",result);
        });

    }

});

