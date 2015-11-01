//Session.setDefault("res","Self");
Template.SearchId.onRendered(function() {
  $('.rateit').rateit();
  $(".rateit").on('rated', function (event, value) {
            console.log('Rating:' + value)
            })
});


Template.SearchId.onDestroyed(function () {

    delete Session.keys['searchResult'];
    delete Session.keys['getUserProfile'];
    delete Session.keys['getUserRequest'];
});

Template.SearchId.helpers ({
      'isUser': function () {
        check();
      return (Session.get('res'));
    },
    'isAdmin': function () {
      return (Session.get('isAdmin'));
    },
    'searchuser': function () {
         //console.log("Search" + JSON.stringify('Session.get('searchResult')') );
         return (Session.get('searchResult'));
       },
    'IsShare':  function(){
      return (Session.get('isShare'));
    },
    'getUserRequest':function() {
      return(Session.get('getUserRequest'));
    },
    'getUserProfile' :function() {
      return(Session.get('getUserProfile'));
    },
    'getSelectedUserId' :function() {
    return(Session.get('userId'));
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
Session.setDefault(MENU_KEY, true);

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

Template.home.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};


Template.SearchId.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    },
  'click .Request': function(event){
    event.preventDefault();
    console.log("clicked request");
    var UserReq = Session.get('searchResult');
 Meteor.call("SearchRequest",this._id, function(error, result) {
   if (result == 0)
   {
     sAlert.error("No Request found for this User");
   }
   else {
     Session.set('getUserRequest',result);
     Session.set('getUserProfile',0);
     console.log("Requests:"+JSON.stringify(result));
       }
});
}
   ,
   'click .Profile': function(event){
     event.preventDefault();
 console.log("Clicked Profile");
 var UserReq = Session.get('searchResult');
  userId=this._id;
  Session.set('userId',userId);
if (Roles.userIsInRole(userId,'Admin'))
{ console.log("is admin : " + userId);
  Session.set('isAdmin','true');
console.log(Session.get('isAdmin'));}
Meteor.call("SearchProfile",this._id, function(error, result) {
    Session.set('getUserProfile',result);
    Session.set('getUserRequest',0);
    });

}
 ,
       'submit form': function (event) {
        event.preventDefault();
        Session.set('getUserProfile',0);
        Session.set('getUserRequest',0);
        Session.set('searchResult',0);
        EnteredName = event.target.Ename.value;
        if(EnteredName) {
        Meteor.call("SearchUser",EnteredName, function(error, result) {
                           if (result == 0) {
                 sAlert.error("No Result Found !")
               }
               else
                   Session.set('searchResult',result);
               });
         }
         else
         sAlert.error("Please enter a name to search");

          },
          'click .addAdmin': function(event){
              console.log("inside add admin");
              Roles.addUsersToRoles( Session.get('userId'), ['Admin']);
              sAlert.success("Added as Admin!!");
              // Meteor.users.update({_id : Session.get('userId')}, {$set : {roles : "Admin"}});
          }
       });


































        //          var userdetail ='<table border=2 >';
        //          for(var key in result)
        //          {
        //            userdetail += '<tr>';
        //            for(var field in result[key]){
        //              if (typeof result[key][field] == 'object') {
        //                if (field.match("profile")) {
        //                  var temp = {};
        //                  temp = result[key].profile;
        //                  for (var k in temp) {
        //                    console.log("My test: " + k);
        //                    if (k.match("firstName") || k.match("lastName") || k.match("gender") || k.match("organisation") || k.match("occupation") )
        //                    {
        //                           userdetail += '<td>'+'<b>'+ k.toUpperCase() +'</b>'+ '</td>' ;
        //                          userdetail += '<td>'+temp[k] +'</br>'+'</td>';
        //                          userdetail += '</td></tr>';
        //                        //(k.match("sharePhone") and temp[k]='yes')
        //                      }
        //
        //                    if (typeof temp[k] == 'object') {
        //                      if (k.match("address")) {
        //                        var temp2 = {};
        //                        temp2 = temp[k];
        //                        userdetail += '<td><b>'+ k.toUpperCase() +'</b></td><td>';
        //                          for (var l in temp2) {
        //                          if (l.match("primary"))
        //                           continue;
        //                           userdetail += temp[k][l] +' ';
        //                           }
        //                           userdetail += '</td></tr>';
        //                       }
        //                     }
        //                  else {
        //                   continue;
        //                 }
        //               }}} else {
        //                 continue;
        //               }
        //             }
        //             userdetail += '</td></tr>';
        //             //userdetail += "Name  :"+result[key].firstName + result[key].lastName +"<br>"+ "gender:" +result[key].gender+"<br>";
        //           }
        //           userdetail += '</table>';
        //           document.getElementById("SearchResult").innerHTML = userdetail;
        //         }
        //
        // });
