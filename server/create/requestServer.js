Meteor.methods({
getRequest : function(){
  var request = Request.findOne({requestorId : Meteor.user()._id});
  console.log("Server getRequest:" , JSON.stringify(request));
  return request;
},
saveRequest: function (request) {
    // console.log("inside method cresteREquwst");
    console.log("server saverequest -- "+JSON.stringify(request));
    //TO-DO: remove check()
    check(request, Object);

    var requestDb = {
        "request_name": request.requestName,
        "requestType":request.requestType,
        "creatorId": request.creatorId,
        "requestorId": request.requestorId,
        "aidId": request.aidId,
        "aidCategoryId": request.aidCategoryId,
        "requiredBy": request.requiredBy,
        "emergency": request.emergency,
        "status": request.status,
        "address_id": request.addressId
    }

    console.log("request inn server:", JSON.stringify(request));
    Request.insert(requestDb, function (error, result) {

        console.log("Request insert " + JSON.stringify(Request.find().fetch()));
        if (error) {
            console.log("Errors !!" + error + "  Result - " + result);
            //TO-DO: error message()
            // throw new Meteor.Error("insert-failed", error.message);
            throw new Meteor.Error("insert-failed", error);
        }
    });

    return requestDb;
},

editRequest : function (requestID , request) {
    // console.log("inside method cresteREquwst");
    console.log("server update -- "+JSON.stringify(request));
    //TO-DO: remove check()
    check(request, Object);

    var requestDb = {
        "request_name": request.requestName,
        "requestType":request.requestType,
        "creatorId": request.creatorId,
        "requestorId": request.requestorId,
        "aidId": request.aidId,
        "aidCategoryId": request.aidCategoryId,
        "requiredBy": request.requiredBy,
        "emergency": request.emergency,
        "status": request.status,
        "address_id": request.addressId
    }

    console.log("request in server:", JSON.stringify(request));


    Request.update({_id : requestID},{$set:requestDb}, function (error, result) {

        console.log("Request update " + JSON.stringify(Request.find().fetch()));
        if (error) {
            console.log("Errors !!" + error + "  Result - " + result);
            //TO-DO: error message()
            // throw new Meteor.Error("insert-failed", error.message);
            throw new Meteor.Error("insert-failed", error);
        }
    });

    return requestDb;
},

deleteRequest : function (requestID) {
    // console.log("inside method cresteREquwst");
    console.log("server delete request -- ", requestID);
    //TO-DO: remove check()
    check(requestID, String);


    Request.remove({_id : requestID} , function (error, result) {

        console.log("Request deleted!");
        if (error) {
            console.log("Errors !!" + error + "  Result - " + result);
            //TO-DO: error message()
            // throw new Meteor.Error("insert-failed", error.message);
            throw new Meteor.Error("insert-failed", error);
        }
    });
}
});
