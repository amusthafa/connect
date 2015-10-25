Meteor.methods({
  "infoView" : function(type){
    check(type,String);
  infos=Information.find({infoType:type}).fetch();
  console.log('server:'+ JSON.stringify(infos));
  return infos;
},

"infoUpdate" : function(id){
check(id,String);
check("Yes",String);
info=Information.find({_id:id}).fetch();
Information.update({_id:id},{ $set :{"verificationStatus":"Yes"}} , function (error, result) {
    console.log("result " + result + ' error ' + error );
  if (error) {
        console.log("Errors !!" + error + "  Result - " + result);
}
  });
}
});
