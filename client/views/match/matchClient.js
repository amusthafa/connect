Template.connect.helpers({
    'connect': function () {
        return "add aid";
    }
});

Template.connect.events({

    'submit form': function (event) {
        event.preventDefault();
       // alert('form submitted');
        console.log('clicked request id' + event.target.requestId.value);

        var request = {};
        request._id= 'oEsBxoiLvhXHwRJ3G';
        Meteor.call("connect", request, function (error, result) {
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
           // alert('routing to home');
          //  Router.go("/");
        });

    }

});

