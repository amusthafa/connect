Meteor.methods({
  "getDocInfo" : function(){
    DocInfo=Information.find({infoType : "Hospitals/Doctors"}).fetch();
    console.log('server:'+ JSON.stringify(DocInfo));
    return DocInfo;
  },
  "getAilInfo" : function(){
    AilInfo=Information.find({infoType : "Ailments"}).fetch();
    console.log('server:'+ JSON.stringify(infos));
    return AilInfo;
  },
  "getEduInfo" : function(){
    EduInfo=Information.find({infoType : "Education"}).fetch();
    console.log('server:'+ JSON.stringify(EduInfo));
    return EduInfo;
  },
  "getJobInfo" : function(){
    JobInfo=Information.find({infoType : "Jobs"}).fetch();
    console.log('server:'+ JSON.stringify(JobInfo));
    return JobInfo;
  },
  "getRightsInfo" : function(){
    RightsInfo=Information.find({infoType : "Rights"}).fetch();
    console.log('server:'+ JSON.stringify(RightsInfo));
    return RightsInfo;
  }
});
