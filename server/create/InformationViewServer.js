Meteor.methods({
  "infoView" : function(type){
    check(type,String);
  infos=Information.find({infoType:type}).fetch();
  console.log('server:'+ JSON.stringify(infos));
  return infos;

}
});
