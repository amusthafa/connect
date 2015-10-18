Meteor.methods({

   "SearchUser": function (name) {
     //Check is made for name
     check(name, String);
     console.log("The name is :" + name);
     count_value =Meteor.users.find({$or:[{'profile.firstName':{"$regex": "^" + name + "\\b", "$options": "i"}},{'profile.lastName': {"$regex": "^" + name + "\\b", "$options": "i"}}]}).count();
     console.log(count_value);
       data = []
       data =Meteor.users.find({$or:[{'profile.firstName':{"$regex": "^" + name + "\\b", "$options": "i"}},{'profile.lastName': {"$regex": "^" + name + "\\b", "$options": "i"}}]}).fetch();
       details = data;
       return data;

 },
 "SearchRequest": function(id) {
     check(id,String);
     console.log("request server",id);
   count_value =Request.find({requestorId:id}).count();
   console.log(count_value);
   requestData=[]
   requestData=Request.find({requestorId:id}).fetch();
   return requestData;
 }
});
