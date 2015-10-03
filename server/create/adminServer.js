/**
 * Created by amusthafa on 9/27/2015.
 */
Meteor.methods({updateAdminAuth: function (adminAuth) {

    //TO-DO: remove check()
    check(adminAuth, Object);
Request.insert({requestName:"abc",requestType:"Other"});
   // User.update({'username': adminAuth.user},{$set:{'UserProfilestatus':adminAuth.status}})
    /*console.log('aidExists - '+data);
    var length = aidExists.length;
    if (length===0) {
        Aid.insert(data, function (error, result) {

            console.log("Aid find " + JSON.stringify(Aid.find().fetch()));
            if (error) {
                console.log("Errors !!" + error + "  Result - " + result);
                //TO-DO: error message()
                // throw new Meteor.Error("insert-failed", error.message);    });
                throw new Meteor.Error("insert-failed", error);
            }
        });
    }
    else
        throw new Meteor.Error("Aid already exists");
*/
    return true;

    // return Aid.insert(data);
}});