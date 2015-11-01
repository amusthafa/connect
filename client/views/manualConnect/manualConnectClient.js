Template.manualConnect.onDestroyed(function () {

    delete Session.keys['getUserProfile'];
    delete Session.keys['getUserRequest'];
    delete Session.keys['searchResult'];
});

Template.manualConnect.helpers ({

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


});

Template.manualConnect.events({

    'click .searchUserforManual' : function (event) {
        event.preventDefault();


        Session.set('getUserProfile',0);
        Session.set('getUserRequest',0);
        Session.set('searchResult',0);
        EnteredName = $('#Ename').val();
        alert('EnteredName- '+JSON.stringify(EnteredName));
        if(EnteredName) {
            Meteor.call("SearchUser",EnteredName, function(error, result) {
    //            alert('result- '+JSON.stringify(result));
                if (result == 0) {
                    sAlert.error("No Result Found !")
                }
                else
                    Session.set('SearchUserforManual',result);
      //          alert('result- '+JSON.stringify(result));
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
                    sAlert.error("No Request found for this User");
                }
                else {
                  //  alert('result' +result);
                    Session.set('getUserRequestforManual', result);
                    Session.set('getUserProfileforManual', 0);
                    console.log("Requests:" + JSON.stringify(result));
                }
            });

    },
    'click .profileforManual': function(event){
        event.preventDefault();
        console.log("Clicked Profile");

                Meteor.call("SearchProfile", this._id, function(error, result) {
                    Session.set('getUserProfileforManual',result);
                    Session.set('getUserRequestforManual',0);
                 //   alert('result' +result);
                });

    },

        'click .requestManualConnect': function(event){
    event.preventDefault();
    console.log("requestManualConnect");
        //    alert(JSON.stringify(this));
            var selectedRequestMC=(this);
            Session.set('selectedRequestManual',selectedRequestMC);

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
                        sAlert.success("Manual Connection Successful");
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
