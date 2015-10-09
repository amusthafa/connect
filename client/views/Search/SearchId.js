Template.SearchId.helpers({
    'Search': function () {
        return "Search Profile";
    }
});

//UserprofileDummy = new Meteor.Collection('userprofiles');


Template.SearchId.events({
    //'click .search': function (event, next) {
      //  name = document.getElementById('name').value;
            'submit form': function (event) {
        event.preventDefault();
        EnteredName = event.target.Ename.value;
        console.log('clicked Search ' + EnteredName );
        Meteor.call("SearchUser",EnteredName, function(error, result) {
               //console.log ("the result is:" User_result[0].name)
        console.log("Client : error" + error + JSON.stringify(result));
        if (result == 0) {
          console.log("No Result Found.")
        } else {
          var userdetail ='<table border=1>';
          for(var key in result)
          {
            userdetail += '<tr><td>';
            for(var field in result[key]){
              if (typeof result[key][field] == 'object') {
                if (field.match("profile")) {
                  var temp = {};
                  temp = result[key].profile;
                  for (var k in temp) {
                    console.log("My test: " + k);
                    if (typeof temp[k] == 'object') {
                      if (k.match("address")) {
                        var temp2 = {};
                        temp2 = temp[k];
                        userdetail +=  k + ":";
                        for (var l in temp2) {
                          if (l.match("primary"))
                            continue;
                          userdetail +=  temp[k][l] +'</br>';
                        }
                      }
                    } else {
                      userdetail +=  k + ":";
                      userdetail +=  temp[k] +'</br>';
                    }
                  }
                } else {
                  continue;
                }
              } else {
                continue;
              }
            }
            userdetail += '</td></tr>';
               //userdetail += "Name  :"+result[key].firstName + result[key].lastName +"<br>"+ "gender:" +result[key].gender+"<br>";
          }
          userdetail += '</table>';
          document.getElementById("SearchResult").innerHTML = userdetail;
        }

        });
      }
});
