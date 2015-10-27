

Template.manualConnect.helpers ({

    'SearchUserforManual': function () {
        //console.log("Search" + JSON.stringify('Session.get('searchResult')') );
        return (Session.get('SearchUserforManual'));
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
                    Session.set('getUserRequest', result);
                    Session.set('getUserProfile', 0);
                    console.log("Requests:" + JSON.stringify(result));
                }
            });

    },
    'click .profileforManual': function(event){
        event.preventDefault();
        console.log("Clicked Profile");

                Meteor.call("SearchProfile", this._id, function(error, result) {
                    Session.set('getUserProfile',result);
                    Session.set('getUserRequest',0);
                    alert('result' +result);
                });

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
