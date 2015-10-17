//Session.setDefault("res","Self");
Template.SearchId.helpers({
      'Search': function () {
        check();
      return (Session.get('res'));
    }
});

//UserprofileDummy = new Meteor.Collection('userprofiles');


Template.SearchId.events({
    //'click .search': function (event, next) {
      //  name = document.getElementById('name').value;
             'submit.search': function (event) {
        event.preventDefault();
        EnteredName = event.target.Ename.value;
        console.log('clicked Search ' + EnteredName );
        Meteor.call("SearchUser",EnteredName, function(error, result) {
               //console.log ("the result is:" User_result[0].name)
              // console.log("Client : error" + error + JSON.stringify(result));
               if (result == 0) {
                 console.log("No Result Found.");
                 alert("No Result Found !")
               }
               else {
                 Session.set('res',result);

                 var userview = '<table border=2 >';
                 for(var key in result)
                 {
                   userview += '<tr>';
                   for(var field in result[key]){
                     if (typeof result[key][field] == 'object') {
                       if (field.match("profile")) {
                         var temp = {};
                         temp = result[key].profile;
                         for (var k in temp) {
                           console.log("My test: " + k);
                           if (k.match("firstName") || k.match("lastName") )
                           {
                                  userview += '<td>'+'<b>'+ k.toUpperCase() +'</b>'+ '</td>' ;
                                 userview += '<td>'+temp[k] +'</br>'+'</td>';
                                 userview += '</td></tr>';
                               //(k.match("sharePhone") and temp[k]='yes')
                             }
                                                    }
                        }
                      }
                    }
                  }
                    userview += '<td>'+ '<button type="button" class="view" value= "view" >'+'view'+'</button>'+' </td>';
                  //userview += '<td>' + '<a href="Router.go('/');">'+'view'+ '</a></td>';
                userview += '</table>';
           }
                 document.getElementById("SearchResult").innerHTML = userview;

              });
            },

            'click.view': function () {
       event.preventDefault();
       userprofileDetail={}
        userprofileDetail=Session.get('res');
           console.log('clicked view '+ + JSON.stringify(userprofileDetail));
      // Meteor.call("SearchUser",EnteredName, function(error, result) {

            console.log("value is:"+Session.get('res'));
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
