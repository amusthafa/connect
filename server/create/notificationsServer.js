Meteor.methods(
    {
        getNotifications: function (user) {
            check(user,Object);
            check(user.userId ,String);
            console.log('getNotifications entered' + JSON.stringify( user));
            //userId : user.userId
            var notificationsList = Notifications.find(
                {
                 $query: {
                     "userId" : user.userId, "status" : 'Unread'
                     }
                ,
                $orderby: { rowCreated : -1 }
            }
).fetch();

            var notificationsArr = [];
            for (var i in notificationsList) {

                var notification = notificationsList[i];
                //   console.log("volunteer - "+ volunteer);
                notificationsArr.push(notification._id);

            }
            console.log(notificationsArr);
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

            console.log('notificationsList  ' + notificationsList);
            return notificationsList;
        }
    }
);