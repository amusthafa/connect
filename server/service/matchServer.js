/**
 * Created by amusthafa on 10/4/2015.
 */
Meteor.methods({matchRequestVolunteer: function (requestIp) {
    console.log('entered matchRequestVolunteer -------------------');
    check(requestIp, Object);

    console.log('entered connect request._id -- ' + requestIp._id);

    //update notification to Read
    console.log('requestIp.notificationId ---- '+requestIp.notificationId);
    if (requestIp.notificationId){
        Notifications.update({_id: requestIp.notificationId}, { $set: {"status": "Read"}}
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

    var request = Request.findOne({"_id": requestIp._id, status: "Submitted"});
    console.log("req -- " + JSON.stringify(request));

    //for Aid
    //City, - Done, Aid expiry > requiredbydate
    //TODO - OFfer from toDate, Rating
    if (request) {


        var volunteers = VolunteerAid.find({ "aidId": request.aidId,
                //"aidAddress.city": request.requestAddress.city,
               // aidExpiry: {$gt: request.requiredBy},
                $or :[ {aidExpiry :{$gt:request.requiredBy}}, {aidExpiry :request.requiredBy}],
              //    aidStart :   {$lt : request.requiredBy},
                $or :[ {aidStart :{$lt:request.requiredBy}}, {aidStart :request.requiredBy}],
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
            "profile.status": { $in: ["Authentic", "Warned"] }  })
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
        var userRequestor =  Meteor.users.findOne({_id: request.requestorId });
        request.requestorName= userRequestor.profile.firstName + " " + userRequestor.profile.lastName;
        request.number= userRequestor.profile.phone;

        //Update volunteer list with volunteer details from profile
        var reqCityList = [];
        var otherCityList = [];

        for (var i in finalVolunteerList) {
            var volunteer = finalVolunteerList[i];

            var user = Meteor.users.findOne({_id: volunteer.volunteerId });
            console.log('user -- ' + JSON.stringify(user));
            volunteer.name = user.profile.firstName + " " + user.profile.lastName;
            volunteer.gender = user.profile.gender;

            ///calculate age
            var birthdate = user.profile.birthday;
            if (birthdate){
            var cur = new Date();
            var diff = cur - birthdate;
            var age = Math.floor(diff / 31536000000);
            volunteer.age = age;
            }
            //volunteer.city = user.profile.address.city;
            volunteer.city = volunteer.aidAddress.city;

            if (request.requestAddress.city ==  volunteer.city){
                reqCityList.push(volunteer);
            }
            else
            {
                otherCityList.push(volunteer);
            }
        }

        var sortedCityArr=  sortByRating (reqCityList);
        console.log("sortedCityArr - "+JSON.stringify(sortedCityArr));
        var sortedOtherCityArr=  sortByRating (otherCityList);
        console.log("sortedOtherCityArr - "+JSON.stringify(sortedOtherCityArr));

        var sortedArr=sortedCityArr.concat(sortedOtherCityArr);
        console.log("sortedArr - "+JSON.stringify(sortedArr));

        var matchDtls = {};
        matchDtls.requestId = request._id;
        matchDtls.requiredBy = request.requiredBy;
        matchDtls.request = request;
      //  matchDtls.volunteerList = finalVolunteerList;
        matchDtls.volunteerList = sortedArr;
        check(matchDtls, Object);

        console.log('matchDtls -- ' + JSON.stringify(matchDtls));
        return matchDtls;
    }

}})
;
/*

function sortByRating(volunteerArr ){
    var byRating = volunteerArr.slice(0);
    byRating.sort(function(a,b) {
        return b.rating - a.rating;
    });
return byRating;
}*/

function sortByRating(volunteerArr ) {
  var sortedList=  volunteerArr.sort(function (x, y) {
        var n = y.connectCount - x.connectCount;
        if (n != 0) {
            return n;
        }
        return y.rating - x.rating;
    })
return sortedList;
};