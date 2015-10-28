/**
 * Created by amusthafa on 9/27/2015.
 */
Meteor.methods({updateAdminAuth: function (adminAuth) {

    //TO-DO: remove check()
    check(adminAuth, Object);
    console.log("adminAuth " + JSON.stringify(adminAuth ));
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

    return true;


}});