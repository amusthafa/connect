Meteor.methods({
getRequest : function(req){
    check(req,Object);
    console.log("get request for req id: ", req);
  var request = Request.findOne({_id:req.requestId});
  console.log("Server getRequest:" , JSON.stringify(request));
    return request;
},

getListOfRequest : function(req){
    check(req,Object);
  var requestList = Request.find({requestorId : req.requestorId}).fetch();
  console.log("Server getListOfRequest:" , JSON.stringify(requestList));
//  check(request, Match.Any);
    return requestList;
},

saveRequest: function (request) {
    // console.log("inside method cresteREquwst");
    console.log("server saverequest -- "+JSON.stringify(request));
    //TO-DO: remove check()
    check(request, Object);
try{
  console.log("request.aid:",request.aidName);
  var aidName = Aid.findOne({'aidName':request.aidName});
  console.log("aid name:", aidName);

    var requestDb = {
        "request_name": request.requestName,
        "requestType":request.requestType,
        "creatorId": request.creatorId,
        "requestorId": request.requestorId,
        "aidId": aidName._id,
        "aidCategoryId": request.aidCategoryId,
        "requiredBy": request.requiredBy,
        "emergency": request.emergency,
        "status": request.status,
        "requestAddress":{
            "line1": request.line1,
            "line2": request.line2,
            "city": request.city,
            "state": request.state,
            "country": request.country,
            "pinCode": request.pincode
        },
        "comment": request.comment
    }
  }
  catch(e){
    console.log("error caught!!:", e);
    // throw new Meteor.Error(e,"Please fill in the required details");
    throw new Meteor.Error(e.error, "Please select the Aid" , e.details);

  }

    console.log("request in server:", JSON.stringify(request));

    Request.insert(requestDb, function (error, result) {

        console.log("Request insert " + JSON.stringify(result));
        if (error) {
              console.log("sanitizedError!!!:", error.sanitizedError);
            throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
        }
        else{
        return requestDb;
      }
    });
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
},

    updateStatus : function(request){
        Request.update({_id : request._id}, { $set :{"status": request.status}}
            , function (error, result) {
                console.log("result " + result + ' error ' + error );
                if (error) {
                    console.log("Errors !!" + error + "  Result - " + result);
                    //TO-DO: error message()
                    // throw new Meteor.Error("insert-failed", error.message);
                    throw new Meteor.Error("update-failed", error);
                }
            });
    },

    getRequestWithConnect : function(req){
        check(req,Object);

     //get request
        var request = Request.findOne({ _id : req.requestId});
        console.log("Server getRequest:" , JSON.stringify(request));

     //get connect associated with it
        var connect = Connect.findOne({ requestId :  req.requestId, status : {$in: ['Initiated','Accepted',
             'PendingCompletion','Completed'] }  });

        var data = {request : request, connect: connect};
        console.log('data' +JSON.stringify(data));
        return data;
    }


});
