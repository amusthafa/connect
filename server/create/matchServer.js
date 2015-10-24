/**
 * Created by amusthafa on 10/4/2015.
 */
Meteor.methods({matchRequestVolunteer: function (request) {
    console.log('entered matchRequestVolunteer');
    check(request, Object);

    console.log('entered connect request._id -- ' + request._id);

    var request = Request.findOne({"_id": request._id, status: "Submitted"});
    console.log("req -- " + JSON.stringify(request));

    //for Aid
    //City, - Done, Aid expiry > requiredbydate
    //TODO - OFfer from toDate, Rating
    if (request) {
        var volunteers = VolunteerAid.find({ "aidId": request.aidId,
                //"aidAddress.city": request.requestAddress.city,
                aidExpiry: {$gte: request.requiredBy},
                  aidStart :   {$lte : request.requiredBy},
                _id : {$ne : request.creatorId}}
            )
            .fetch();

        console.log("vol -- " + JSON.stringify(volunteers));
        console.log("vol len-- " + volunteers.length);

        var volunteersMap = {};
        var volunteerArr = [];
        for (var i in volunteers) {
            var volunteer = volunteers[i];
            volunteerArr.push(volunteer.volunteerId);
            volunteersMap[volunteer.volunteerId] = volunteer;
        }

        // check if volunteer is active or inactive
        //check if he is authentic
        var users = Meteor.users.find({_id: { $in: volunteerArr }, "profile.availabilityStatus": "Active",
            "profile.status": "Authentic"  })
            .fetch();
        console.log("User match -- " + JSON.stringify(users));

        var userArr = [];
        for (var i in users) {
            var user = users[i];
            //console.log("volunteer - " + user);
            userArr.push(user._id);
        }
        console.log("UserArr -- " + users.length);

        //userArr - List of active and authenticated users who can be considered for match
        //Get the list of user who need to be removed - removeList
        var removeList = _.difference(volunteerArr, userArr);

        //With userArr, find the list of volunteers who are busy on the day
        var connectedUsers = Connect.find({
            aidId: request.aidId,
            volunteerId: { $in: userArr },
            status: { $in: ["Accepted"]},
            requestedBy: request.requiredBy
        }).fetch();

        var connectedUserArr = [];
        for (var i in connectedUsers) {
            var connectedUser = connectedUsers[i];
            console.log("connectedUser - " + connectedUser);
            connectedUserArr.push(connectedUser._id);
        }

        var availableVolList = _.difference(userArr, connectedUserArr);

        console.log('availableVolList' + JSON.stringify(availableVolList));
        console.log('availableVolList len -' + availableVolList.length);

        /*
         for (var i in finalremoveList) {
         var userId = finalremoveList[i];
         delete volunteersMap[userId];
         }
         */
        var finalVolunteerList = [];
        for (var i in availableVolList) {
            var userId = availableVolList[i];
            finalVolunteerList.push(volunteersMap[userId]);
        }


        console.log('finalVolunteerList - ' + JSON.stringify(finalVolunteerList));


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
        /*
         var finalVolunteerList=[];
         for (i in userArr){
         var user = userArr[i];
         if (volunteersMap[user])
         finalVolunteerList.push(volunteersMap[user]);
         }
         */
        if (request) {
            var aid = Aid.findOne({_id: request.aidId});
            request.aidName = aid.aidName;
        }
        //Update volunteer list with volunteer details from profile


        for (var i in finalVolunteerList) {
            var volunteer = finalVolunteerList[i];

            var user = Meteor.users.findOne({_id: volunteer.volunteerId });
            console.log('user -- ' + JSON.stringify(user));
            volunteer.name = user.profile.firstName + " " + user.profile.lastName;
            volunteer.gender = user.profile.gender;

            ///calculate age
            var birthdate = user.profile.birthday;
            var cur = new Date();
            var diff = cur - birthdate;
            var age = Math.floor(diff / 31536000000);
            volunteer.age = age;

            volunteer.city = user.profile.address.city;
        }


        var matchDtls = {};
        matchDtls.requestId = request._id;
        matchDtls.requiredBy = request.requiredBy;
        matchDtls.request = request;
        matchDtls.volunteerList = finalVolunteerList;
        check(matchDtls, Object);

        console.log('matchDtls -- ' + JSON.stringify(matchDtls));
        return matchDtls;
    }

}})
;