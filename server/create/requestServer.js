Meteor.methods({saveRequest: function (request) {
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
}});
