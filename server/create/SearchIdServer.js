Meteor.methods({
   "SearchUser": function (name) {
     //Check is made for name
     check(name, String);
     console.log("The name is :" + name);
    // Meteor.users.createindex({'profile.firstName':1});
      //Meteor.users.createindex({'profile.lastName':1});
     count_value =Meteor.users.find({$or:[{'profile.firstName':{"$regex": "^" + name + "\\b", "$options": "i"}},{'profile.lastName': {"$regex": "^" + name + "\\b", "$options": "i"}}]}).count();
     console.log(count_value);
    //  if (count_value == 0) {
    //    return 0;
    //  } else {
       data = []
       data =Meteor.users.find({$or:[{'profile.firstName':{"$regex": "^" + name + "\\b", "$options": "i"}},{'profile.lastName': {"$regex": "^" + name + "\\b", "$options": "i"}}]}).fetch();
       return data;
             // }
 }
});
