//Session.setDefault("res","Self");
Template.SearchId.onRendered(function() {
  $('.rateit').rateit();
  $(".rateit").on('rated', function (event, value) {
            console.log('Rating:' + value)
            })
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
  });



Template.SearchId.events({
  'click .Request': function(event){
    event.preventDefault();
    console.log("clicked request");
    var UserReq = Session.get('searchResult');
 var UserReq = Session.get('searchResult');
 if($('input[name=SelectUser]:radio:checked').val())
 {
for(var key in UserReq)
{
 id_user=UserReq[key]._id;
if($('input[name=SelectUser]:radio:checked').val() === id_user)
{
Session.set('userId',UserReq[key]._id);
userId= UserReq[key]._id;
}
 else continue;
 console.log(userId);
 Meteor.call("SearchRequest",userId, function(error, result) {
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
   }}
   else {
     sAlert.error("Select a User");
   }
   //session deletion
 }
   ,
   'click .Profile': function(event){
     event.preventDefault();
 console.log("Clicked Profile");
 var UserReq = Session.get('searchResult');
 if($('input[name=SelectUser]:radio:checked').val())
 {
for(var key in UserReq)
{
id_user=UserReq[key]._id;
if($('input[name=SelectUser]:radio:checked').val() === id_user)
{
Session.set('userId',UserReq[key]._id);
userId= UserReq[key]._id;
}
else continue;
if (Roles.userIsInRole(userId,'Admin'))
{ console.log("is admin : " + userId);
  Session.set('isAdmin','true');
console.log(Session.get('isAdmin'));}
Meteor.call("SearchProfile",userId, function(error, result) {
    Session.set('getUserProfile',result);
    Session.set('getUserRequest',0);
    });
 }}

else {
  sAlert.error("Select a User");
}
//session deletion
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
              // Meteor.users.update({_id : Session.get('userId')}, {$set : {roles : "Admin"}});
          }
       });


// Template.SearchRequest.onRendered(function(){
//
//
// });































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
