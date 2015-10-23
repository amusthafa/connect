Meteor.methods(
    {
        getNotifications: function (user) {
            check(user, Object);
            check(user.userId, String);
            console.log('getNotifications entered' + JSON.stringify(user));
            //userId : user.userId
            var notificationsList = Notifications.find(
                {
                    $query: {
                        "userId": user.userId
                    }
                    ,
                    $orderby: {rowCreated: -1}
                }
            ).fetch();

            var pipeline1 = Notifications.find(
                {
                    $query: {
                        "userId": user.userId,
                        "status": 'Unread'
                    }
                }
            ).fetch();

            for (var i in notificationsList) {
                var notification = notificationsList[i];
                var id = notification.description.split("for")[1].replace(" ", "");
                var request = Aid.findOne({_id: id});
                console.log("aid" + notification.description.split("for")[0] + "for " + request.aidName);
                notification.description = notification.description.split("for")[0] + "for " + request.aidName;

                var notification = notificationsList[i];
                console.log(notification.requestId);
                var request = Request.findOne({_id: notification.requestId});
                console.log(request.request_name);
                notification.requestName = request.request_name;
            }
            console.log('notificationsList  ' + JSON.stringify(notificationsList));

            var count = []
            count.push({"count": pipeline1.length});

            console.log("count" + JSON.stringify(count));

            var combined = [];
            combined.push({"notification": notificationsList});
            combined.push({"count": count});
            console.log(JSON.stringify(combined));
            return combined;
        },

        getNotificationsHeader: function (user) {
            check(user, Object);
            check(user.userId, String);
            console.log('getNotifications entered' + JSON.stringify(user));
            //userId : user.userId
            var notificationsList = Notifications.find(
                {
                    $query: {
                        "userId": user.userId
                    }
                    ,
                    $orderby: {rowCreated: -1},
                    $limit: 5
                }
            ).fetch();

            var pipeline1 = Notifications.find(
                {
                    $query: {
                        "userId": user.userId,
                        "status": 'Unread'
                    }
                }
            ).fetch();

            for (var i in notificationsList) {
                var notification = notificationsList[i];
                var id = notification.description.split("for")[1].replace(" ", "");
                var request = Aid.findOne({_id: id});
                console.log("aid" + notification.description.split("for")[0] + "for " + request.aidName);
                notification.description = notification.description.split("for")[0] + "for " + request.aidName;

                var notification = notificationsList[i];
                console.log(notification.requestId);
                var request = Request.findOne({_id: notification.requestId});
                console.log(request.request_name);
                notification.requestName = request.request_name;
            }
            console.log('notificationsList  ' + JSON.stringify(notificationsList));

            var count = []
            count.push({"count": pipeline1.length});

            console.log("count" + JSON.stringify(count));

            var combined = [];
            combined.push({"notification": notificationsList});
            combined.push({"count": count});
            console.log(JSON.stringify(combined));
            return combined;
        }
    })
;


/*

 //update the status as read for retrieved notifications


 Notifications.update( {_id: { $in: notificationsArr }}, { $set :{"status": "Read"}}
 , function (error, result) {
 console.log("result " + result + ' error ' + error );
 if (error) {
 console.log("Errors !!" + error + "  Result - " + result);
 //TO-DO: error message()
 // throw new Meteor.Error("insert-failed", error.message);
 throw new Meteor.Error("update-failed", error);
 }
 });
 */

