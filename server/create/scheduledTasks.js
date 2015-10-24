function currentDate()
{
var end = (new Date().toJSON().slice(0,10));
    var endDate = new Date (end);
    return endDate;
}
/**
 * Created by amusthafa on 10/14/2015.
 */
SyncedCron.add({
    name: 'Scheduled task for Connect',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 1 hours');
    },
    job: function() {
        console.log("=================Scheduled job start=================");

         //Scheduled Task 1
        //if request submitted, match available,
        // send notification to seeker, if noti not already sent or read


        console.log(" ----------------Scheduled task 1 ---------------- ");
        console.log('currentDate() -- '+currentDate());
        var requestList= Request.find({status : "Submitted" ,$or :[ {requiredBy :{$gt:currentDate()}}, {requiredBy :currentDate()}] }).fetch();
        console.log(requestList.length);
        //var requestList= Request.find({status : "Submitted",requiredBy :{$gt:currentDate()} }).fetch();
  //      var requestList= Request.find({status : "Submitted" , requiredBy :{$eq : currentDate()} }).fetch();
        console.log('requestList -- ' + JSON.stringify(requestList));
        //Chk if Connect Notification already available, type= submitted userid = seeker
        for (var i in requestList) {

            var request = requestList[i];

            var notification = Notifications.findOne({userId : request.requestorId, status : 'Unread', type : "Submitted", requestId : request._id });
            //if there is no existing notification, run match to check if match exists
           console.log('notification ---------------------------------- ' + notification);
            if (!notification){
                var req= {_id :request._id};
                Meteor.call('matchRequestVolunteer',req, function(err, result) {
                    console.log("on rendered result: ------------------------------" + JSON.stringify(result));

                    if (result && result.volunteerList && result.volunteerList.length >0){

                        //Entry in notification table

                        var notificationData = {
                          //  requestorId: request.requestorId,
                          //  connectId: ,
                            requestId: request._id,
                            volunteerAidId: request.aidId,
                            status: 'Unread',
                            userId: request.requestorId,
                            type: 'Submitted',
                            description: 'Matches available for ' + request.request_name
                        };
                        Notifications.insert(notificationData, function (error, result) {
                            console.log("notification id - " + result);
                            if (error) {
                                console.log("Errors !!" + error + "  Result - " + result);
                                //TO-DO: error message()
                                // throw new Meteor.Error("insert-failed", error.message);    });
                                throw new Meteor.Error("insert-failed", error);
                            }});
                    }

                });

            }
        }

        //Scheduled Task 2
        //If Request Date is reached for Request,
        // update connect status, Accepted -> Pending Completion
        // Send noti to seeker for marking complete
        // If Request is still in Submitted status, mark Closed
        console.log(" ----------------Scheduled task 2 ---------------- ");



        var dateRequestList= Request.find({requiredBy : {$lt: currentDate()}, status : 'InProgress' }).fetch();
        console.log("Scheduled task 2 ");
        for (var i in dateRequestList) {

            var request = dateRequestList[i];
            console.log("Scheduled task 2 request " + JSON.stringify(request));
            var connectUpdate = {status : 'PendingCompletion'}

            Connect.update({requestId : request._id,status :'Accepted'},
                {$set:connectUpdate}, function (error, result) {

                console.log("Connect update " + JSON.stringify(result));
                if (error) {
                    console.log("Errors !!" + error + "  Result - " + result);
                    //TO-DO: error message()
                    // throw new Meteor.Error("insert-failed", error.message);
                    throw new Meteor.Error("update-failed", error);
                }
                    else
                {
                    //send notification to seeker for marking complete
                    //Entry in notification table
                    var notification = Notifications.findOne({ type : 'PendingCompletion',
                        status: 'Unread', requestId: request._id});

                    if (!notification) {
                        //Entry in notification table
                        var notificationData = {
                            //  requestorId: request.requestorId,
                            //  connectId: ,
                            requestId: request._id,
                            volunteerAidId: request.aidId,//???
                            status: 'Unread',
                            userId: request.requestorId,
                            type: 'PendingCompletion',
                            description: 'Was the request ' + request.request_name + ' successful. Please update us about how it went.'
                        };
                        Notifications.insert(notificationData, function (error, result) {
                            console.log("notification id - " + result);
                            if (error) {
                                console.log("Errors !!" + error + "  Result - " + result);
                                //TO-DO: error message()
                                // throw new Meteor.Error("insert-failed", error.message);    });
                                throw new Meteor.Error("insert-failed", error);
                            }
                        });
                    }
                }
            });



        }
        //Scheduled Task 3
        // If Request is still in Submitted status, mark Closed
        console.log(" ----------------Scheduled task 3 ---------------- ");
       var requestUpdate= {status : "Closed"};
        ///all request less than current date



        Request.update({status : "Submitted" ,requiredBy : {$lt:currentDate()}},
            {$set:requestUpdate}, function (error, result) {

                console.log("Request update after setting request to closed -- " + JSON.stringify(result));
                if (error) {
                    console.log("Errors !!" + error + " Updated Requests as they are Submitted but reached requiredby date - " + result);
                    //TO-DO: error message()
                    // throw new Meteor.Error("insert-failed", error.message);
                    throw new Meteor.Error("update-failed", error);
                }
            });

        //Scheduled Task 4
        //If request in Pending completion status, no noti or noti is not Unread then create new noti

        //find list of requests with status pending completion
        console.log(" ----------------Scheduled task 4 ---------------- ");
        var pcConnectList= Connect.find({status : 'PendingCompletion'}).fetch();

        for (var i in pcConnectList) {
        var connect = pcConnectList[i];
            //searching for seeker noti
            var notification = Notifications.findOne({ type : 'PendingCompletion',
                status: 'Unread', requestId: connect.requestId});

            if (!notification){
                //Entry in notification table

                var notificationData = {
                  //  requestorId: connect.requestorId,
                    connectId:connect._id ,
                    requestId: connect.requestId,
                    volunteerAidId: connect.volunteerAidId,
                    status: 'Unread',
                    userId: connect.requestorId,
                    type: 'PendingCompletion',
                    description: 'Was the request ' + request.request_name + ' successful. Please update us about how it went.'
                };
                Notifications.insert(notificationData, function (error, result) {
                    console.log("notification id - " + result);
                    if (error) {
                        console.log("Errors !!" + error + "  Result - " + result);
                        //TO-DO: error message()
                        // throw new Meteor.Error("insert-failed", error.message);    });
                        throw new Meteor.Error("insert-failed", error);
                    }
                 else{   //send mail
                    Email.send({to: 'aeisha.musthafa@gmail.com', from: 'olaamigo.app@gmail.com', subject: 'OlaAmigos How was your experience',
                        text: notificationData.description + "Thanks, Amigos"});
                    console.log('email sent');
                }
                });
            }

        }

        //Scheduled Task 5
        //If connect completed by seeker and marked so, rating not provided by volunteer
        // then send noti to volunteer to provide rating, check if noti already exists
        console.log(" ----------------Scheduled task 5 ---------------- ");
        var cConnectList= Connect.find({status : 'Completed', requestorRating :0 }).fetch();

        for (var i in cConnectList) {
            var connect = cConnectList[i];

            var notification = Notifications.findOne({ type : 'Completed',
                status: 'Unread', requestId: connect.requestId});

            if (!notification){
                //Entry in notification table

                var notificationData = {
                  //  requestorId: connect.requestorId,
                      connectId:connect._id ,
                    requestId: connect.requestId,
                    volunteerAidId: connect.volunteerAidId,
                    status: 'Unread',
                    userId: connect.volunteerId,
                    type: 'Completed',
                    description: 'How was your experience for ' + request.request_name + '. Can you rate the Seeker for us.'
                };
                Notifications.insert(notificationData, function (error, result) {
                    console.log("notification id - " + result);
                    if (error) {
                        console.log("Errors !!" + error + "  Result - " + result);
                        //TO-DO: error message()
                        // throw new Meteor.Error("insert-failed", error.message);    });
                        throw new Meteor.Error("insert-failed", error);
                    }
                    else{   //send mail
                        Email.send({to: 'aeisha.musthafa@gmail.com', from: 'olaamigo.app@gmail.com', subject: 'OlaAmigos How was your experience',
                            text: notificationData.description + "Thanks, Amigos"});
                        console.log('email sent');
                    }
                });
            }

        }


        console.log("=================Scheduled job end=================");
        return true;
    }
});