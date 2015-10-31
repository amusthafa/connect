// function loadUser(user) {
//   var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';
//
//   if (!userAlreadyExists) {
//     Accounts.createUser(user);
//   }
// }
//
Meteor.startup(function () {
  process.env.MAIL_URL='smtp://olaamigo.app%40gmail.com:123456xyz@smtp.gmail.com:465/';
  if (!Meteor.users.findOne({username: 'admin'})) {
      id = Accounts.createUser({
      email: 'olaamigo.app@gmail.com',
      password: 'admin',
      profile : {
        "firstName": 'OlaAmingos',
        "lastName": 'Admin',
        "birthday": '',
        "gender": 'Female',
        "organizationFlag": false,
        "organization": '',
        "occupation": '',
        "phone": '9999999768',
        "sharePhone": '',
        "availabilityStatus": "Active",
        "status": "",
        "comments": "Admin User for the app",
        "differentlyAbled": 'No',
        "address": {line1: "sample line1",
        line2: "sample line2",
        city: "Chennai",
        state: "Tamil Nadu",
        country: "India",
        pinCode: "600119",
        primary: "Yes"},
        "appRole": "Both"
      }
    });
  }
  Roles.addUsersToRoles( id, ['Admin']);
  Accounts.sendVerificationEmail(id, 'olaamigo.app@gmail.com', function(err){
  if (err) {
    console.log('We are sorry but something went wrong.');
  }
  });
});
