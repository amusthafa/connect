Meteor.methods({

  'AddInfo' : function(info){
    check(info,Object);

  var infoDb = Information.insert({
      "infoTitle":info.infoTitle,
      "infoType": info.infoType,
      "informationDescription":info.informationDescription,
     "contactAddress":{
       "line1": info.line1,
       "line2": info.line2,
       "city": info.city,
       "state": info.state,
       "country": info.country,
       "pinCode": info.pincode,
     },
      "contactPhone":info.contactPhone,
      "addedById": info.addedById,
     "verificationStatus": info.verificationStatus
       // "row_created": new Date(),
      // "row_updated": new Date()
    }, function (error, result) {
        console.log("info insert result error " + error);
        console.log("info insert result" + result);
      })
      return infoDb;
     }
  });
