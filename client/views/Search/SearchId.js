//Session.setDefault("res","Self");
Template.SearchId.helpers ({
      'isUser': function () {
        check();
      return (Session.get('res'));
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
      return(Session.get('userProfileDetails'));
    }

});

Template.SearchId.events({
  'click .Request': function(event){
    event.preventDefault();
    console.log("clicked request");
  var UserReq = Session.get('searchResult');
  for(var key in UserReq)
 {
   console.log (key);
  for(var field in UserReq[key]){
    if(field.match('_id'))
    var userId= UserReq[key]._id;
  }}
 console.log(userId);
 Meteor.call("SearchRequest",userId, function(error, result) {
   if (result == 0)
   {
     alert("No Request found for this User");
   }
   else {
     Session.set('getUserRequest',result);
     console.log("Requests:"+JSON.stringify(result));
       }


 });
   }
   ,
   'click .Profile': function(event){
     event.preventDefault();
 console.log("Clicked Profile");
 var userDetails=Session.get('searchResult');
 Session.set('userProfileDetails',userDetails);
 console.log("userprofile:"+JSON.stringify('Session.get(userProfileDetails)'));
   }
   ,
       'submit form': function (event) {
        event.preventDefault();
        EnteredName = event.target.Ename.value;
        console.log('clicked Search ' + EnteredName );
        Meteor.call("SearchUser",EnteredName, function(error, result) {
                           if (result == 0) {
                 console.log("No Result Found.");
                 alert("No Result Found !")
               }
               else {
                 Session.set('searchResult',result);
                console.log("Search" + JSON.stringify(Session.get('searchResult')));
              }

             });
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
