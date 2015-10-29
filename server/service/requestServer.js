Meteor.methods({
    getRequest: function (req) {
        check(req, Object);
        console.log("get request for req id: ", req);
        var request = Request.findOne({_id: req.requestId});
        var aid = Aid.findOne({_id: request.aidId});
        request.aidName = aid.aidName;
        console.log("Server getRequest:", JSON.stringify(request));

        //retrieve contact number
        var userRequestor =  Meteor.users.findOne({_id: request.requestorId });
        request.requestorName= userRequestor.profile.firstName + " " + userRequestor.profile.lastName;
        request.number= userRequestor.profile.phone;

        return request;
    },

    getListOfRequest: function (req) {
        check(req, Object);
        check(req.creatorId, String);

        var requestList = Request.find({
            $or :[ {creatorId: req.creatorId}, {requestorId: req.creatorId}],
            status: { $in: ['Submitted','Closed','InProgress'] } }).fetch();

        console.log("Server getListOfRequest:", JSON.stringify(requestList));

        var aidList = Aid.find({}).fetch();
        var aidMap = {};
        for (var i in aidList) {
            var aid = aidList[i];
            aidMap[aid._id] = aid.aidName;
        }
        console.log("aidMap " + JSON.stringify(aidMap));
        for (var i in requestList) {
            var req = requestList[i];
            var aidName = aidMap[req.aidId]
            req.aidName = aidName;
        }
        console.log("requestList --- " + JSON.stringify(requestList));

        /////
        //List of connections

        var connectList = Connect.find(
            {
                $query: {
                    $or: [
                        {requestorId: req.creatorId },
                        {volunteerId: req.creatorId}
                    ]
                },
                $orderby: { rowCreated: -1}

            }).fetch();

        for (var i in connectList) {
            var connect = connectList[i];
            var aidName = aidMap[connect.aidId]
            connect.aidName = aidName;

            //get user names
            var request = Request.findOne({_id:connect.requestId});
            if (request)connect.requestName= request.request_name;

            var userRequestor =  Meteor.users.findOne({_id: connect.requestorId });
            connect.requestorName= userRequestor.profile.firstName + " " + userRequestor.profile.lastName;

            var userVolunteer =  Meteor.users.findOne({_id: connect.volunteerId });
            connect.volunteerName= userVolunteer.profile.firstName + " " + userVolunteer.profile.lastName;

            //pick noti fr that connect id , volunteer id , Unread, type = initiated
            console.log(' connect.status - ' + connect.status);
            if (connect.status == "Initiated"){
                var notification = Notifications.findOne({connectId:connect._id, requestId : connect.requestId,
                    status : 'Unread', type : 'Initiated' });
                console.log('connect noti - ' + notification);
                if (notification)
                connect.notification = notification;
                connect.loggedUser=Meteor.userId();
            }
            else if (connect.status == "PendingCompletion"){
                var notification = Notifications.findOne({connectId:connect._id, requestId : connect.requestId,
                    status : 'Unread', type : 'PendingCompletion' });
                console.log('connect noti - ' + notification);
                if (notification)
                    connect.notification = notification;
                connect.loggedUser=Meteor.userId();
            }
            else if (connect.status == "Completed"){
                var notification = Notifications.findOne({connectId:connect._id, requestId : connect.requestId,
                    status : 'Unread', type : 'Completed' });
                console.log('connect noti - ' + notification);
                if (notification)
                    connect.notification = notification;
                connect.loggedUser=Meteor.userId();
            }
        }

        console.log('connectList -' + JSON.stringify(connectList));
        //for each hconnct, get all names

        var manageList={};
        manageList.request=requestList;
        manageList.connect= connectList;
     return manageList;
    },

    saveRequest: function (request) {
        // console.log("inside method cresteREquwst");
        console.log("server saverequest -- " + JSON.stringify(request));
        //TO-DO: remove check()
        check(request, Object);
        try {
            console.log("request.aid:", request.aid);
            var aid = Aid.findOne({'aidName': request.aid});
            console.log("aid name:", aid);

            var requestDb = {
                "request_name": request.requestName,
                "requestType": request.requestType,
                "creatorId": request.creatorId,
                "requestorId": request.requestorId,
                "aidId": aid._id,
                "aidCategoryId": request.aidCategoryId,
                "requiredBy": request.requiredBy,
                "emergency": request.emergency,
                "status": request.status,
                "requestAddress": {
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
        catch (e) {
            console.log("error caught!!:", e);
            // throw new Meteor.Error(e,"Please fill in the required details");
            throw new Meteor.Error(e.error, "Please select the Aid", e.details);

        }

        console.log("request in server:", JSON.stringify(request));

        Request.insert(requestDb, function (error, result) {

            console.log("Request insert " + JSON.stringify(result));
            if (error) {
                console.log("sanitizedError!!!:", error.sanitizedError);
                throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
            }
            else {
                return requestDb;
            }
        });
    },

    editRequest: function (requestID, request) {
        // console.log("inside method cresteREquwst");
        console.log("server update -- " + JSON.stringify(request));
        //TO-DO: remove check()
        check(request, Object);
        console.log("request.aidName!!!:", request.aid);
        var aid = Aid.findOne({'aidName': request.aid});
        console.log("AID selected!!!:", JSON.stringify(aid));
        var requestDb = {
            "request_name": request.requestName,
            "requestType": request.requestType,
            "creatorId": request.creatorId,
            "requestorId": request.requestorId,
            "aidId": aid._id,
            "aidCategoryId": request.aidCategoryId,
            "requiredBy": request.requiredBy,
            "emergency": request.emergency,
            "status": request.status,
            "requestAddress": {
                "line1": request.line1,
                "line2": request.line2,
                "city": request.city,
                "state": request.state,
                "country": request.country,
                "pinCode": request.pincode
            },
            "comment": request.comment
        }
        console.log("request in server:", JSON.stringify(requestDb));
        Request.update({_id: requestID}, {$set: requestDb}, function (error, result) {

            console.log("Request update " + JSON.stringify(Request.find().fetch()));
            if (error) {
                console.log("Errors !!" + error + "  Result - " + result);
                throw new Meteor.Error("insert-failed", error);
            }
        });

        return requestDb;
    },

    updateStatus: function (request) {
        check(request,Object);
        Request.update({_id: request._id}, { $set: {"status": request.status}}
            , function (error, result) {
                console.log("result " + result + ' error ' + error);
                if (error) {
                    console.log("sanitizedError!!!:", error.sanitizedError);
                    throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
                }
                else {
                    return result;
                }
            });
    },

    getRequestWithConnect: function (req) {
        check(req, Object);

        //get request
        var request = Request.findOne({ _id: req.requestId});
        console.log("Server getRequest:", JSON.stringify(request));

        //get connect associated with it
        var connect = Connect.findOne({ requestId: req.requestId, status: {$in: ['Initiated', 'Accepted',
            'PendingCompletion', 'Completed'] }  });

        var data = {request: request, connect: connect};
        console.log('data' + JSON.stringify(data));
        return data;
    }


});
