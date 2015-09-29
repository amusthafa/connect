Meteor.methods({
    loginVerify: function (credentials) {
    console.log('login in server');
    console.log(JSON.stringify(credentials));
    check(credentials, Object);
    var data = {
        "emailId": credentials.email,
        "password": credentials.password
    }
    console.log("Done");
   }});
