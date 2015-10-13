/**
 * Created by amusthafa on 10/10/2015.
 */
Meteor.methods(
    {connect: function (connect) {
        check(connect, Object);
        console.log("Entering connect" + JSON.stringify(connect));
        //Entry in connect table
        var connectData = {
            requestId: connect.requestId,
            requestorId: connect.seekerId,
            volunteerAidId: connect.volunteerAidId,
            volunteerId: connect.volunteerId,
            aidId: connect.aidId,
            status: 'Initiated',
            connectedBy: 'User',
            requestedBy: connect.requestDate
        };
        var connectId;
        Connect.insert(connectData, function (error, result) {

                console.log("connect id - " + result);
                if (error) {
                    console.log("Errors !!" + error + "  Result - " + result);
                    //TO-DO: error message()
                    // throw new Meteor.Error("insert-failed", error.message);    });
                    throw new Meteor.Error("insert-failed", error);
                }
                else {

                    //Entry in notification table

                    var notificationData = {
                        requestorId: connect.seekerId,
                        connectId: result,
                        requestId: connect.requestId,
                        volunteerAidId: connect.volunteerAidId,
                        status: 'Unread',
                        userId: connect.volunteerId,
                        type: 'Initiated',
                        description: 'Request for ' + connect.aidId
                    };

                    Notifications.insert(notificationData, function (error, result) {
                            console.log("notification id - " + result);
                            if (error) {
                                console.log("Errors !!" + error + "  Result - " + result);
                                //TO-DO: error message()
                                // throw new Meteor.Error("insert-failed", error.message);    });
                                throw new Meteor.Error("insert-failed", error);
                            }
                            else
                            {
                                //update request status
                              /*  var request = {requestId: connect.requestId};
                                check(request, Object);
                                Meteor.call('getRequest', request, function(err, result) {
                                    console.log(" result returned :"+(err));
                                    console.log(" result returned :"+(result));
                                    request=result;
                                });
*/
                                var request = Request.findOne({ _id : connect.requestId});
                                if (request.status == 'Submitted')
                                {
                                    Request.update({_id : request._id}, { $set :{"status": "InProgress"}}
                                        , function (error, result) {
                                            console.log("result " + result + ' error ' + error );
                                            if (error) {
                                                console.log("Errors !!" + error + "  Result - " + result);
                                                //TO-DO: error message()
                                                // throw new Meteor.Error("insert-failed", error.message);
                                                throw new Meteor.Error("update-failed", error);
                                            }
                                        });
                                }


                            }
                        }
                    );


                    return true;

                }
            }
        );
    }
        ,
        getConnectDetails: function(connect){
            check(connect, Object);
            //update connect table status
            var connectObj = Connect.findOne({ _id :connect._id });
            console.log("connectObj - " + connectObj);

            //update notification to Read

            Notifications.update({_id : connect.notificationId}, { $set :{"status": "Read"}}
                , function (error, result) {
                    console.log("update Notification to Read - result " + result + ' error ' + error );
                    if (error) {
                        console.log("Errors !!" + error + "  Result - " + result);
                        //TO-DO: error message()
                        // throw new Meteor.Error("insert-failed", error.message);
                        throw new Meteor.Error("update-failed", error);
                    }
                });

            return connectObj;
        }
        ,
        updateConnect: function(connect){
            check(connect, Object);
            //update connect table status



            Connect.update({_id : connect._id}, { $set :{"status": connect.status}}
                , function (error, result) {
                    console.log("updateConnect - result " + result + ' error ' + error );
                    if (error) {
                        console.log("Errors !!" + error + "  Result - " + result);
                        //TO-DO: error message()
                        // throw new Meteor.Error("insert-failed", error.message);
                        throw new Meteor.Error("update-failed", error);
                    }
                });
            //If declined, reset request status to submitted
            if (connect.status == 'Declined')
            {
                Request.update({_id : connect.requestId}, { $set :{"status": "Submitted"}}
                    , function (error, result) {
                        console.log("result " + result + ' error ' + error );
                        if (error) {
                            console.log("Errors !!" + error + "  Result - " + result);
                            //TO-DO: error message()
                            // throw new Meteor.Error("insert-failed", error.message);
                            throw new Meteor.Error("update-failed", error);
                        }
                    });

            }
            //TODO ['Initiated', 'Accepted','Declined','VolunteerCanceled','SeekerCanceled', 'PendingCompletion','Completed','Unsuccessful']
            /* accepted - vol cancel , seeker cancel..
            if vol cancel - reset request to submitted
            if seeker canceled - reset request to closed/canceled?

                after time it becomes , pending completion
            seeker - mark complete, give rating. Mark request to closed.
                volunteer - give rating to seeker?? how
*/
        }
    }
);