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

            connectedBy: connect.connectedBy,
            requestedBy: connect.requestDate
        };

        if ( connect.connectedBy == 'User')
        connectData.status= 'Initiated'
        else if ( connect.connectedBy == 'Admin')
            connectData.status= 'Accepted';

//tx.start('insert connect');
        check(connectData, Object);

        var connectId = Connect.insert(connectData, function (error, result) {

            console.log("connect id - " + result);
            if (error) {
                console.log("Errors !!" + error + "  Result - " + result);
                //TO-DO: error message()
                // throw new Meteor.Error("insert-failed", error.message);    });
                throw new Meteor.Error("insert-failed", error);
            }
        });
//Entry in notification table
        var notiId;

        var aid = Aid.findOne({_id: connect.aidId });
        connect.aidName = aid.aidName;

        var user = Meteor.users.findOne({_id: connect.volunteerId });
        console.log('user ------------- ' + JSON.stringify(user));


        //Noti start
        if ( connect.connectedBy == 'User'){
        if (connectId) {
            var notificationData = {
                requestorId: connect.seekerId,
                connectId: connectId,
                requestId: connect.requestId,
                volunteerAidId: connect.volunteerAidId,
                status: 'Unread',
                userId: connect.volunteerId,
                type: 'Initiated',
                description: 'Request for ' + connect.aidName
            };

            notiId = Notifications.insert(notificationData, function (error, result) {
                    console.log("notification id - " + result);
                    if (error) {
                        console.log("Errors !!" + error + "  Result - " + result);
                        //TO-DO: error message()
                        // throw new Meteor.Error("insert-failed", error.message);    });
                        throw new Meteor.Error("insert-failed", error);
                    }
                    else {
                        //send mail
                        console.log('user email -- ' + user.emails[0].address);
                        Email.send({to: user.emails[0].address, from: 'olaamigo.app@gmail.com', subject: 'OlaAmigos Request for Connect',
                            text: notificationData.description + "Thanks, Amigos"});
                        console.log('email sent');

                    }

                }
            );

        }}
            else if ( connect.connectedBy == 'Admin')
        {
            //send noti to both thhat connection established
            if (connectId) {
                var notificationData = {
                    requestorId: connect.seekerId,
                    connectId: connectId,
                    requestId: connect.requestId,
                    volunteerAidId: connect.volunteerAidId,
                    status: 'Unread',
                    userId: connect.volunteerId,
                    type: 'Accepted',
                    description: 'A Connection is setup by Ola Amigos Admin for you. Please login to see the connection details.'
                };

                notiId = Notifications.insert(notificationData, function (error, result) {
                        console.log("notification id - " + result);
                        if (error) {
                            console.log("Errors !!" + error + "  Result - " + result);
                            //TO-DO: error message()
                            // throw new Meteor.Error("insert-failed", error.message);    });
                            throw new Meteor.Error("insert-failed", error);
                        }
                        else {
                            //send mail
                            console.log('user email -- ' + user.emails[0].address);
                            Email.send({to: user.emails[0].address, from: 'olaamigo.app@gmail.com', subject: 'OlaAmigos Connection for you',
                                text: notificationData.description + "Thanks, Amigos"});
                            console.log('email sent');

                        }

                });

                    //send noti for requestor

                    notificationData.userId = connect.seekerId ;

                var seeker = Meteor.users.findOne({_id: connect.seekerId });
                console.log('user ------------- ' + JSON.stringify(user));



                notiId = Notifications.insert(notificationData, function (error, result) {
                        console.log("notification id - " + result);
                        if (error) {
                            console.log("Errors !!" + error + "  Result - " + result);
                            //TO-DO: error message()
                            // throw new Meteor.Error("insert-failed", error.message);    });
                            throw new Meteor.Error("insert-failed", error);
                        }
                        else {
                            //send mail
                            console.log('user email -- ' + seeker.emails[0].address);
                            Email.send({to: seeker.emails[0].address, from: 'olaamigo.app@gmail.com', subject: 'OlaAmigos Connection for you',
                                text: notificationData.description + "Thanks, Amigos"});
                            console.log('email sent');

                        }

                    }
                );

        }
            ///Noti end
            console.log('connect.requestId - ' + JSON.stringify(connect.requestId));
            var request = Request.findOne({ _id: connect.requestId});
            console.log('request - ' + JSON.stringify(request));
            if (request.status == 'Submitted') {
                Request.update({_id: request._id}, { $set: {"status": "InProgress"}}
                    , function (error, result) {
                        console.log("result " + result + ' error ' + error);
                        if (error) {
                            console.log("Errors !!" + error + "  Result - " + result);
                            //TO-DO: error message()
                            // throw new Meteor.Error("insert-failed", error.message);
                            throw new Meteor.Error("update-failed", error);
                        }
                        else {

                            console.log('connectId - ' + connectId);
                            console.log('notiId - ' + notiId);
                            console.log('reqUpdate - ' + result);
                            //if request status is not updated, then revert all other statuses

                        }

                    });
            }
        }


    },
        getConnectDetails: function (connect) {
            check(connect, Object);
            //update connect table status
            var connectObj = Connect.findOne({ _id: connect._id });
            console.log("connectObj - " + connectObj);

            //update notification to Read
            if (connect.notificationId) {
                Notifications.update({_id: connect.notificationId}, { $set: {"status": "Read"}}
                    , function (error, result) {
                        console.log("update Notification to Read - result " + result + ' error ' + error);
                        if (error) {
                            console.log("Errors !!" + error + "  Result - " + result);
                            //TO-DO: error message()
                            // throw new Meteor.Error("insert-failed", error.message);
                            throw new Meteor.Error("update-failed", error);
                        }
                    });
            }
            console.log("connect.requestId - " + connectObj.requestId);
            //get request details
            var request = Request.findOne({_id: connectObj.requestId});

            var aid = Aid.findOne({_id: request.aidId});
            request.aidName = aid.aidName;
            console.log('request -' + JSON.stringify(request));

        /*    var request =Meteor.call('getRequest',connectObj, function(err, result) {
                console.log("on rendered result: ------------------------------" + JSON.stringify(result));
                if (!err)
                return result;
            });
        */    console.log('request ----------------' + JSON.stringify(request));

                    var volunteer = {};
            //get volunteer details
            var user = Meteor.users.findOne({_id: connectObj.volunteerId });
            console.log('user -- ' + JSON.stringify(user));
            if (user) {
                volunteer.name = user.profile.firstName + " " + user.profile.lastName;
                volunteer.gender = user.profile.gender;
                ///calculate age
                var birthdate = user.profile.birthday;
                if (birthdate) {
                    var cur = new Date();
                    var diff = cur - birthdate;
                    var age = Math.floor(diff / 31536000000);
                    volunteer.age = age;
                }
                volunteer.city = user.profile.address.city;
                volunteer.number=user.profile.phone;
            }
            var contactDetails = {};
            contactDetails.connect = connectObj;
            contactDetails.request = request;
            contactDetails.volunteer = volunteer;
            contactDetails.mode = connect.mode;
            contactDetails.connect.loggedUser = Meteor.userId();
            console.log('contactDetails -' + JSON.stringify(contactDetails));

            return contactDetails;
        },
        updateConnect: function (connect) {
            check(connect, Object);
            //update connect table status
            console.log('connect ' + JSON.stringify(connect));

            var connectIp = {};
            connectIp.status = connect.status;
            if (connect.currentStatus == "Completed")
                connectIp.requestorRating = connect.requestorRating;
            else if (connect.currentStatus == "PendingCompletion")
                connectIp.volunteerAidRating = connect.volunteerAidRating;
            console.log('connectIp for update '+JSON.stringify(connectIp));
            Connect.update({_id: connect._id}, {  $set: connectIp}
                , function (error, result) {
                    console.log("updateConnect - result " + result + ' error ' + error);
                    if (error) {
                        console.log("Errors !!" + error + "  Result - " + result);
                        //TO-DO: error message()
                        // throw new Meteor.Error("insert-failed", error.message);
                        throw new Meteor.Error("update-failed", error);
                    }
                    else {
                        //If declined, reset request status to submitted
                        //TODO ['Initiated', 'Accepted','Declined','VolunteerCanceled','SeekerCanceled', 'PendingCompletion','Completed','Unsuccessful']
                        /* accepted - vol cancel , seeker cancel..
                         if vol cancel - reset request to submitted
                         if seeker canceled - reset request to closed/canceled?

                         after time it becomes , pending completion
                         seeker - mark complete, give rating. Mark request to closed.
                         volunteer - give rating to seeker?? how
                         */

                        var status;
                        if (connect.status == 'Declined' || connect.status == 'VolunteerCanceled' || connect.status == 'RequestorCanceled') {
                            status = 'Submitted';
                        }
                        else if(connect.status == 'Completed' || connect.status == 'Unsuccessful'){
                            status = 'Closed';
                        }
                        if (status) {
                            console.log('status - ' + status);
                            Request.update({_id: connect.requestId}, { $set: {"status": status}}
                                , function (error, result) {
                                    console.log("result " + result + ' error ' + error);
                                    if (error) {
                                        console.log("Errors !!" + error + "  Result - " + result);
                                        //TO-DO: error message()
                                        // throw new Meteor.Error("insert-failed", error.message);
                                        throw new Meteor.Error("update-failed", error);
                                    }
                                });

                        }

                    }
                });

        }

    }
)
;