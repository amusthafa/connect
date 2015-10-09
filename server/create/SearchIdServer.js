Meteor.methods({
   "SearchUser": function (name) {

     //Check is made for name
     check(name, String);
     console.log("The name is :" + name);
     count_value =Meteor.users.find({ 'profile.firstName': name}).count();
     console.log(count_value);
     if (count_value == 0) {
       return 0;
     } else {
       data = []
       data =Meteor.users.find({'profile.firstName':name}).fetch();
       return data;
     }
 }
});
