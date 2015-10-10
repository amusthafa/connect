/**
 * Created by amusthafa on 9/27/2015.
 */
Meteor.methods({updateAdminAuth: function (adminAuth) {

    //TO-DO: remove check()
    check(adminAuth, Object);
    console.log("adminAuth " + JSON.stringify(adminAuth ));
    console.log('user get ---' + JSON.stringify(Meteor.users.findOne({_id: 'BS6ABsrpxNwkJYggP'})));
    Meteor.users.update({_id : adminAuth.user}, { $set :{"profile.status": adminAuth.status}}
        , function (error, result) {
        console.log("result " + result + ' error ' + error );
    if (error) {
            console.log("Errors !!" + error + "  Result - " + result);
            //TO-DO: error message()
            // throw new Meteor.Error("insert-failed", error.message);
            throw new Meteor.Error("update-failed", error);
        }
    });

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