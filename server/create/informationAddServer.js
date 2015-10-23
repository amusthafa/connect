Meteor.methods({

  'AddInfo' : function(info){
    check(info,Object);

    Information.insert({
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
      "rowCreated": new Date(),
      "rowUpdated": new Date()
    }, function (error, result) {

        console.log("info insert result error " + error);
        console.log("info insert result" + result);
      })
     }
  });
