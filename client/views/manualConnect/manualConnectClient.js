

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
    }
});

Template.manualConnect.events({

    'click .searchUserforManual' : function (event) {
        event.preventDefault();


        Session.set('getUserProfile',0);
        Session.set('getUserRequest',0);
        Session.set('searchResult',0);
        EnteredName = $('#Ename').val();

        if(EnteredName) {
            Meteor.call("SearchUser",EnteredName, function(error, result) {
                if (result == 0) {
                    sAlert.error("No Result Found !")
                }
                else
                    Session.set('SearchUserforManual',result);
                alert('result- '+JSON.stringify(result));
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
                    alert('result' +result);
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
                    alert('result' +result);
                });

    },

        'click .requestManualConnect': function(event){
    event.preventDefault();
    console.log("requestManualConnect");
            var selectedRequestMC=(this);
            Session.set('selectedRequestManual',selectedRequestMC);

}

});





















