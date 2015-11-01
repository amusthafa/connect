Meteor.methods({
  "getDocInfo" : function(){
    DocInfo=Information.find({infoType : "Hospitals/Doctors"}, {limit : 3, sort: {rowCreated: -1}}).fetch();
    return DocInfo;
  },
  "getAilInfo" : function(){
    AilInfo=Information.find({infoType : "Ailments"}, {limit : 3, sort: {rowCreated: -1}}).fetch();
    return AilInfo;
  },
  "getEduInfo" : function(){
    EduInfo=Information.find({infoType : "Education"}, {limit : 3, sort: {rowCreated: -1}}).fetch();
    return EduInfo;
  },
  "getJobInfo" : function(){
    JobInfo=Information.find({infoType : "Jobs"}, {limit : 3, sort: {rowCreated: -1}}).fetch();
    return JobInfo;
  },
  "getRightsInfo" : function(){
    RightsInfo=Information.find({infoType : "Rights"}, {limit : 3, sort: {rowCreated: -1}}).fetch();
    return RightsInfo;
  }
});
