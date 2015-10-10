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
                        }
                    );


                    return true;

                }
            }
        );
    }
    }
);