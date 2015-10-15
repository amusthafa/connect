/**
 * Created by amusthafa on 10/4/2015.
 */
Meteor.methods({matchRequestVolunteer: function (request) {
    console.log('entered matchRequestVolunteer');
    //TO-DO: remove check()
    check(request, Object);

    console.log('entered connect request._id -- ' + request._id);

    var request = Request.findOne({"_id": request._id });

    console.log("req -- " + JSON.stringify(request));

    //for Aid
    //City, - Done, Aid expiry > requiredbydate
    //TO-DO - Date, Rating


    var volunteers = VolunteerAid.find({ "aidId": request.aidId
            ,"aidAddress.city": request.requestAddress.city
            ,aidExpiry: {$gte: request.requiredBy}
        }
    )
        .fetch();
    console.log("vol -- " + JSON.stringify(volunteers));
    console.log("vol len-- " + volunteers.length);

    var volunteersMap = {};
    // check if volunteer is active or inactive
    //chck if he is authentic
    // db.request.find( { requestType: { $in: [ 'Self', 'Other1' ] } } )
    var volunteerArr = [];
    for (var i in volunteers) {

        var volunteer = volunteers[i];
        //   console.log("volunteer - "+ volunteer);
        volunteerArr.push(volunteer.volunteerId);
        volunteersMap[volunteer.volunteerId]= volunteer;
        console.log(volunteersMap[volunteer.volunteerId]);
    }

    var users = Meteor.users.find({_id: { $in: volunteerArr }, "profile.availabilityStatus": "Active",
        "profile.status": "Authentic"  })
        .fetch();

    console.log("User match -- " + JSON.stringify(users));

    var userArr = [];
    for (var i in users) {

        var user = users[i];
        console.log("volunteer - " + user);
        userArr.push(user._id);
    }
    //userArr - List of active and authenticated users who can be considered for match
    var removeList = _.difference(volunteerArr,userArr);


    //List of volunteers busy on the day
    var connectedUsers =Connect.find({
        aidId: request.aidId,
        volunteerId: { $in: userArr },
        status: { $in: ["Initiated", "Declined" , "VolunteerCanceled", "SeekerCanceled"]}
    }).fetch();

    var connectedUserArr = [];
    for (var i in connectedUsers) {
        var connectedUser = connectedUsers[i];
        console.log("connectedUser - " + connectedUser);
        connectedUserArr.push(connectedUser._id);
    }

    var finalremoveList = _.difference(removeList,connectedUserArr);


    console.log('finalremoveList' + finalremoveList);

    for (var i in finalremoveList) {
        var userId = finalremoveList[i];
        delete volunteersMap[userId];
    }
    console.log('volunteersMap after user removed' + JSON.stringify(volunteersMap));


    //REmove them from our list

    //Retrieve required details and send to ui for connect

    /*

     //List of connected users
     Connect.find({


     });


     //List of available users
     //check if volunteer is not connected for that aid on that day
     //{$ne : request.requiredBy} or (date )  && status in list
     Connect.find({
     aidId: request.aidId,
     volunteerId: { $in: userArr },
     $or: [
     { requestedBy: {$ne: request.requiredBy}},
     { $and: [
     { requestedBy: {$eq: request.requiredBy}},
     { status: { $in: ["initiated", "declined" , "volunteercancel", "seekercancel"}}
     ]
     }
     ]      }).fetch();
     */
    var finalVolunteerList=[];
    for (i in userArr){
        var user = userArr[i];
        if (volunteersMap[user])
            finalVolunteerList.push(volunteersMap[user]);
    }

    var matchDtls = {};
    matchDtls.requestId= request._id;
    matchDtls.requiredBy=request.requiredBy;
    matchDtls.volunteerList=finalVolunteerList;
    check(matchDtls, Object);
    return matchDtls;

}})
;