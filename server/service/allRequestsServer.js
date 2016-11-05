Meteor.methods(
    {
        getAllRequests: function (request) {
            check(request, Object);
            console.log('getAllRequests entered' + request.requiredBy);
            if (request.requiredBy) {
              // var datePrat =  moment.utc(request.requiredBy).format('MM/DD/YYYY');
                var requestedDate = new Date(request.requiredBy).toISOString();
              }
              console.log("requestedDate:" + requestedDate);
            var requestList = Request.find(
                {
                   $query: {
                     "requiredBy": {
                                $eq: new Date(requestedDate)
                                }
                    }
                }
            ).fetch();
            console.log("requestList" + JSON.stringify(requestList));
              var request;
            for (var i in requestList) {
              console.log("value i" + i);
                   request = requestList[i];
                    var aid = Aid.findOne({_id: request.aidId});
                    request.aidName = aid.aidName;
                    var userRequestor =  Meteor.users.findOne({_id: request.requestorId });
                    request.requestorName= userRequestor.profile.firstName + " " + userRequestor.profile.lastName;
                    request.number= userRequestor.profile.phone;
                    console.log("REQUEST: "+ JSON.stringify(request));
            }
            return requestList;

        }
    })
;
