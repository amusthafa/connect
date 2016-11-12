Meteor.methods({

   "SearchUser": function (name) {
     //Check is made for name
     check(name, String);
     console.log("The name is :" + name);
       data = []
       data =Meteor.users.find({$or:[{'profile.firstName':{"$regex": "^" + name + "\\b", "$options": "i"}},{'profile.lastName': {"$regex": "^" + name + "\\b", "$options": "i"}}]}).fetch();

       return data;

 },
   "SearchUserCity": function (search) {
 check(search, Object);

     name=search.name
     city=search.city
     type=search.type

     console.log("The name is :" + name + ' - city ' +city +' - type ' + type);
       data = []
        if (type == 'name')
            data = Meteor.users.find({$or:[{'profile.firstName':{"$regex": "^" + name + "\\b", "$options": "i"}},{'profile.lastName': {"$regex": "^" + name + "\\b", "$options": "i"}}]}).fetch();
        else if (type == 'city')
        data =Meteor.users.find({$or:[{'profile.address.city':{"$regex": "^" + city + "\\b", "$options": "i"}},{'profile.address.city': {"$regex": "^" + city + "\\b", "$options": "i"}}]}).fetch();
       return data;

 },
 "SearchRequest": function(id) {
     check(id,String);
     console.log("request server",id);
   count_value =Request.find({requestorId:id}).count();
   console.log(count_value);
   requestData=[]
   requestData=Request.find({requestorId:id}).fetch();
   for (var i in requestData ) {
       var req = requestData[i];
       console.log('req:'+JSON.stringify(req));
       var aid = Aid.findOne({_id: req.aidId});
       requestData[i].aidName=aid.aidName;
       }
    console.log('req:'+JSON.stringify(requestData));
   return requestData;
 },
 "SearchProfile" : function(id) {
   check(id,String);
   console.log("profile server",id);
 count_value =Meteor.users.find({_id : id}).count();
 console.log(count_value);
 profileData=[]
 profileData=Meteor.users.find({_id : id}).fetch();
 return  profileData;
 },
 "SearchAid": function (aidName) {
   check(aidName, String);
   console.log("The aid name is :" + aidName);
   data = []
   data =Aid.find({'aidName':{"$regex": aidName, "$options": "i"}}).fetch();
   details = data;
   return data;
},
"DeleteAid": function (aidId) {
  check(aidId, String)
  console.log("The aid id is :" + aidId);
  data = []
  data = Aid.remove({'_id': aidId});
  details = data;
  return data;
}
});
