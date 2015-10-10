
Template.createRequest.helpers({
cityList: function () {
    console.log(Session.get('cityList'));
    return (Session.get('cityList'));
},

stateList: function () {
    console.log(Session.get('stateList'));
    return (Session.get('stateList'));
}
});
Template.createRequest.events({

    "change #scity-select": function (event, template) {
        var city = $(event.currentTarget).val();
        Session.set("sCity", city);
        console.log(Session.get("sCity"));
    }
    ,
    "change #sstate-select": function (event, template) {
        var state = $(event.currentTarget).val();
        Session.set("sState", state);
        console.log(Session.get("sState"));
    },

    'submit form': function (event) {
        event.preventDefault();
        var request = {};

        request.requestName =  event.target.requestName.value;
        request.requestType =  event.target.requestType.value;
        request.creatorId =  Meteor.user()._id;
        request.requestorId =  Meteor.user()._id;
        request.aidId = event.target.aidId.value;
        request.requiredBy =  event.target.requiredBy.value;
        request.emergency =  event.target.emergency.value;
        request.status =  "Submitted";
        request.line1 = event.target.s_line1.value;
        request.line2 = event.target.s_line2.value;
        request.city = Session.get("sCity");
        request.state = Session.get("sState");
        request.country = event.target.s_country.value;
        request.pincode = event.target.s_pincode.value;

        var requestJson = JSON.stringify(request);
        console.log("CREATE REQUEST:" , requestJson);
        // alert('create request ' + requestJson);
        // Router.go("/saveRequest",{query : 1});

        Meteor.call("saveRequest", request, function (error, result) {
            console.log("Client : error" + error + "result - " + JSON.stringify(result));
            if (error) {
                console.log("error" + error);
            }
            else{
              console.log('form submitted');
            }
          });
    }

});
