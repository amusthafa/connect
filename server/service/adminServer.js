/**
 * Created by amusthafa on 9/27/2015.
 */
Meteor.methods({updateAdminAuth: function (adminAuth) {

    //TO-DO: remove check()
    check(adminAuth, Object);
    console.log("adminAuth " + JSON.stringify(adminAuth ));
    Meteor.users.update({_id : adminAuth.user}, { $set :{"profile.status": adminAuth.status}}
        , function (error, result) {
          console.log("Admin update" + JSON.stringify(result));
          if (error) {
              console.log("sanitizedError!!!:", error.sanitizedError);
              throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
          }
          else {
               return true;
          }
    });
}});
