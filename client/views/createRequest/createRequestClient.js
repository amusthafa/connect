Session.setDefault("isOther", "Self");
Session.setDefault("sCity", "Please Select");
Session.setDefault("sState", "Please Select");
Session.setDefault("isCreate", "create");

Template.createRequest.helpers({
    isEditFlow: function () {
        // console.log(Session.get("isCreate"));
        return (Session.get("isCreate") === "edit");
    },

    isCreateFlow: function () {
        // console.log(Session.get("isCreate"));
        return (Session.get("isCreate") === "create");
    },

    isEmergency : function(){
      // console.log("isemergency:",Session.get("getRequest").emergency);
      return (Session.get("getRequest").emergency === 'Yes');
    },

    getRequest : function() {
      check();
      return (Session.get('getRequest'));
    },

    'isOtherChecked': function (event) {
      console.log("isother:",Session.get("isOther"));
        return (Session.get("isOther") === "Other");
    },

    getAddress: function () {
        return (Session.get('userDetails'));
    },

    searchUser: function () {
        return (Session.get('searchResult'));
    },

    userId: function () {
        return (Session.get('requestorId'));
    },

    cityList: function () {
      return (Session.get('cityList'));
    },

    stateList: function () {
        return (Session.get('stateList'));
    },
    aidList: function () {
        return (Session.get('aidList'));
    }

    ///menu - start
    ,
    menuOpen: function() {
    return Session.get(MENU_KEY) && 'menu-open';
},
userMenuOpen: function() {
    return Session.get(USER_MENU_KEY);
},
connected: function() {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
        return Meteor.status().connected;
    } else {
        return true;
    }
}
///menu - end
});

var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, false);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

Meteor.startup(function () {
    // set up a swipe left / right handler
    $(document.body).touchwipe({
        wipeLeft: function () {
            Session.set(MENU_KEY, false);
        },
        wipeRight: function () {
            Session.set(MENU_KEY, true);
        },
        preventDefaultEvents: false
    });

});

Template.createRequest.rendered = function() {
    // init fastclick
  FastClick.attach(document.body);
    };





Template.createRequest.onDestroyed(function () {

    delete Session.keys['isCreate'];
    delete Session.keys['requestId'];
});

Template.createRequest.onRendered(function () {
    // Session.get('request');
    Session.set(MENU_KEY, false);
    var requestId = Session.get('requestId');
    console.log("requestId :!!", requestId);
    if(typeof requestId !== "undefined" ){
      console.log("edit flow!!!");
      Session.set("isCreate", "edit");
      console.log("setting iscreate flag:",Session.get("isCreate"));
      var request = {requestId:requestId};
      console.log("editRequest with session set:", JSON.stringify(request));
      Meteor.call('getRequest', request, function(err, result) {
        console.log("on rendered : getRequest: !! result:", JSON.stringify(result));
        Session.set('getRequest',result);
        if(result.requestType === 'Other')
        {
          Session.set('isOther', 'Other');
        }
      });
    }
    else{
      Meteor.call('getAddress', Meteor.userId(), function (err, result) {
          Session.set("userDetails", result);
          Session.set("isCreate", "create");
          console.log("setting iscreate flag:",Session.get("isCreate"));

      });
    }
});

Template.createRequest.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
    'click #menu a': function() {

    },
    'click .searchUser': function (event) {
        event.preventDefault();
        console.log("calling");
        Meteor.call("SearchUser", document.getElementById("requestorId").value, function (error, result) {
            Session.set("searchResult", result);
        });
    },

    "change #selectedUser": function (event, template) {
        var requestorId = $(event.currentTarget).val();
        Session.set("requestorId", requestorId);
        console.log(Session.get("requestorId"));
        Meteor.call('getAddress', Session.get("requestorId"), function (err, result) {
            Session.set("userDetails", result);
            console.log("on rendered result:", JSON.stringify(result));
        });
    },

    'change #requestType': function (event) {
        console.log(event.currentTarget.name);
        Session.set("isOther", event.currentTarget.value);
        console.log(Session.get("isOther"));
    },

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
          console.log("submit start");
          event.preventDefault();
          var request = {};

            if(Session.get('isCreate') === "create"){
              if (event.target.address1.checked) {
                  request.line1 = event.target.p_line1.value;
                  request.line2 = event.target.p_line2.value;
                  request.city = event.target.p_city.value;
                  request.state = event.target.p_state.value;
                  request.country = event.target.p_country.value;
                  request.pincode = event.target.p_pincode.value;
              } else {
                  request.line1 = event.target.s_line1.value;
                  request.line2 = event.target.s_line2.value;
                  request.city = Session.get("sCity");
                  request.state = Session.get("sState");
                  request.country = event.target.s_country.value;
                  request.pincode = event.target.s_pincode.value;
              }

              if (event.target.requestType.value === "Self") {
                  request.requestType = "Self";
                  request.creatorId = Meteor.userId();
                  request.requestorId = Meteor.userId();
              } else {
                  request.requestType = "Other";
                  request.creatorId = Meteor.userId();
                  request.requestorId = event.target.requestorId.value;
              }
            }
            else{
              console.log("edit address flow input");
                request.line1 = event.target.p_line1.value;
                request.line2 = event.target.p_line2.value;
                request.city = Session.get("sCity");
                request.state = Session.get("sState");
                request.country = event.target.p_country.value;
                request.pincode = event.target.p_pincode.value;
                request.creatorId = event.target.creatorId.value;
                request.requestorId = event.target.requestorId.value;
            }
          request.requestName =  event.target.requestName.value;
          request.aid = event.target.aid.value;
          request.requiredBy =  event.target.requiredBy.value;

          if(event.target.emergency.checked){
            request.emergency = "Yes";
          }
          else{
            request.emergency = "No";
          }
          request.status =  "Submitted";
          request.comment = event.target.comment.value;

          var requestJson = JSON.stringify(request);

          if(Session.get('isCreate') === "create"){
            console.log("CREATE REQUEST:" , requestJson);

            Meteor.call("saveRequest", request, function (error, result) {
             //   alert("Client save request"+ JSON.stringify(result));

                if (error) {
                  console.log("error body", (error));
                  sAlert.error(error.reason);
                  Router.go("/createRequest");
                }
                else{
                  console.log("success");
                    var succMsg="Request created Successfully. ";

                    var req ={};
                    req._id= result;

                    Meteor.call('matchRequestVolunteer',req, function(err, result) {
                        console.log("on rendered result: ------------------------------" + JSON.stringify(result));

                        if (result && result.volunteerList && result.volunteerList.length >0){
                            succMsg =succMsg+  "There are volunteer matches for you!! ";
                            Session.set("match",result);
                            Router.go('/manageRequest');
                            sAlert.success(succMsg, {timeout : 7000, beep: 'alerts/reqCreatedMatchFound.mp3'});
                            sAlert.success('', configOverwrite);
                        }
                        else
                        {
                            succMsg =succMsg+  "We are looking out for volunteer matches !! ";
                            sAlert.success(succMsg, {timeout : 7000, beep: 'alerts/reqCreatedLookingForMatches.mp3'});
                            sAlert.success('', configOverwrite);

                        }
                    });
                    Router.go("/");

                }
            });
            delete Session.keys['isOther'];
            delete Session.keys['searchResult'];

          //call match and direct to that page



          //  Router.go("/");


          }
          else{
            console.log("EDIT REQUEST:" , request);
            var requestID = event.target._id.value;
            //alert("request ID being editted:"+ requestID);
            Meteor.call("editRequest", requestID, request, function (error, result) {
           //     alert("Client editRequest" +JSON.stringify(result)  + " err "+err);

                if (error) {
                  console.log("error body", (error));
                  sAlert.error(error.reason);
                  Router.go("/listOfRequests");
                }
                else{
                  console.log("success");
                  sAlert.success("Request saved Successfully",{beep: 'alerts/reqSaved.mp3'});
                  sAlert.success('', configOverwrite);
                }
            });
              Router.go("/");
              delete Session.keys['isOther'];
              delete Session.keys['searchResult'];

          }
    }
});
