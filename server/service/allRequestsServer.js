Meteor.methods(
    {
        getAllRequests: function (request) {
            console.log('getAllRequests entered' + request.rowCreated);
        check(request, Object);
            var xdate1 = request.rowCreated
            //var xdate2 = t.find('.endDate').value + " 23:59:59";
            var date1 = moment(xdate1).format("YYYY-MM-DDTHH:mm:ssZ");
            //var date2 = moment(xdate2).format("YYYY-MM-DDTHH:mm:ssZ");
            console.log("date1" + date1);
            var requestList = Request.find(
                {
                   $query: {
                 //       "userId": this.userId
                            "rowCreated": xdate1
                    }
                    ,
                    $orderby: {rowCreated: -1}
                }
            ).fetch();
            console.log("requestList" + JSON.stringify(requestList));

            for (var i in requestList) {
                    var request = requestList[i];
                    var aid = Aid.findOne({_id: request.aidId});
                    request.aidName = aid.aidName;

                    var userRequestor =  Meteor.users.findOne({_id: request.requestorId });
                    request.requestorName= userRequestor.profile.firstName + " " + userRequestor.profile.lastName;
                    request.number= userRequestor.profile.phone;

            }
/*
            var pipeline1 = Notifications.find(
                {
                    $query: {
                        "userId": this.userId,
                        "status": 'Unread'
                    }
                }
            ).fetch();

            for (var i in notificationsList) {
                *//*var notification = notificationsList[i];
                 var id = notification.description.split("for")[1].replace(" ", "");
                 var request = Aid.findOne({_id: id});
                 console.log("aid" + notification.description.split("for")[0] + "for " + request.aidName);
                 notification.description = notification.description.split("for")[0] + "for " + request.aidName;*//*

                var notification = notificationsList[i];
                if (notification){
                console.log(notification.requestId);
                var request = Request.findOne({_id: notification.requestId});
              //  console.log(request.request_name);
                    if (request)
                notification.requestName = request.request_name;}
            }
            console.log('notificationsList  ' + JSON.stringify(notificationsList));

            var count = []
            count.push({"count": pipeline1.length});

            console.log("count" + JSON.stringify(count));

            var combined = [];
            combined.push({"notification": notificationsList});
            combined.push({"count": count});
            console.log(JSON.stringify(combined));
            */
            console.log("requestList" + JSON.stringify(requestList));

            return requestList;
        }
    })
;
