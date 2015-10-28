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
    name: 'Daily Scheduled task for Connect',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 1 hours');
    },
    job: function() {
        console.log("=================Daily Scheduled job start=================");

        //Scheduled Task 1
        //Average the volunteer aid, requestor rating

        console.log(" ----------------Daily Scheduled task 1 ---------------- ");
        //Avg of Volunteer Aid id

        var pipeline =
            [
                {
                    $group: {
                        _id:  "$volunteerAidId",
                        average: {$avg: "$volunteerAidRating"}
                    }
                }
            ]
        ;
        var volunteerAidRatings = Connect.aggregate(pipeline);

        for (var i in volunteerAidRatings ) {
            var volAid = volunteerAidRatings[i];
            console.log('volAid' + JSON.stringify(volAid));

            //update vol aid table
            VolunteerAid.update({_id: volAid._id}, {  $set: {rating: volAid.average}}, function (error, result) {
                console.log("VolunteerAid update result " + result + ' error ' + error);
                if (error) {
                    console.log("Errors !!" + error + "  Result - " + result);
                    //TO-DO: error message()
                    // throw new Meteor.Error("insert-failed", error.message);
                    throw new Meteor.Error("update-failed", error);
                }
            });
        }

        //User Rating
        //vol aid rating, volunteer = sum, number
        //requestor rating, requestor id = sum, number

        var pipelineVolAid =
            [
                {
                    $group: {
                        _id: {volunteerAidId : "$volunteerAidId",volunteerId : "$volunteerId"},
                        sum: {$sum: "$volunteerAidRating"},
                        count: {$sum: 1}
                    }
                }
            ]
        ;
        var volunteerAidUserRatings = Connect.aggregate(pipelineVolAid);
        console.log("volunteerAidUserRatings - "+JSON.stringify(volunteerAidUserRatings));
        var pipelineRequestor =
                [
                    {
                        $group: {
                            _id: "$requestorId",
                            sum: {$sum: "$requestorRating"},
                            count: {$sum: 1}
                        }
                    }
                ]
            ;
        var requestorUserRatings = Connect.aggregate(pipelineRequestor);
        console.log("requestorUserRatings - "+JSON.stringify(requestorUserRatings));

        var userRatingMap={};
        for (var i in volunteerAidUserRatings)
        {
            var userRating =volunteerAidUserRatings[i];
            if (userRatingMap[userRating._id.volunteerId]){
                var  userRatingExist = userRatingMap[userRating._id.volunteerId];
                userRatingExist.sum =userRatingExist.sum + userRating.sum;
                userRatingExist.count =userRatingExist.count + userRating.count;
            }
            else
            {   var newUserRating={};
                newUserRating._id=userRating._id.volunteerId;
                newUserRating.sum =userRating.sum;
                newUserRating.count =userRating.count;
                userRatingMap[userRating._id] = newUserRating;
            }
        }

        for (var i in requestorUserRatings)
        {
               var userRating =requestorUserRatings[i];
            if (userRatingMap[userRating._id]){

               var  userRatingExist = userRatingMap[userRating._id];
                userRatingExist.sum =userRatingExist.sum + userRating.sum;
                userRatingExist.count =userRatingExist.count + userRating.count;
            }
            else
            {
                userRatingMap[userRating._id] = userRating;
            }
        }
        var keys= _.keys(userRatingMap);

        for (var i in keys)
        {
            var key = keys[i];
            var userRating = userRatingMap[key];

            var avg = userRating.sum /userRating.count;
            console.log("userRating - "+JSON.stringify(userRating));
            Meteor.users.update({_id : userRating._id}, { $set :{"profile.rating": avg}}
                , function (error, result) {
                    console.log("Update user rating " + result + ' error ' + error );
                    if (error) {
                        console.log("Errors !!" + error + "  Result - " + result);
                        //TO-DO: error message()
                        // throw new Meteor.Error("insert-failed", error.message);
                        throw new Meteor.Error("update-failed", error);
                    }
                });
        }

        console.log(" ----------------Daily Scheduled task 2 ---------------- ");
        //count number of completed connects in for volunteer and update that count in volaid table

        var pipeline =
                [
                    {$match: {status: "Completed"}},
                    {
                        $group: {
                            _id:  "$volunteerAidId",
                            count: {$sum: 1}
                        }
                    }
                ]
            ;
        var volunteerConnectRatings = Connect.aggregate(pipeline);

        console.log(JSON.stringify(volunteerConnectRatings));

        for (var i in volunteerConnectRatings)
        {
            var vol=volunteerConnectRatings[i];

            VolunteerAid.update({_id:vol._id}, { $set :{"connectCount" : vol.count}}
                , function (error, result) {
                    console.log("Volunteer aid connect rating " + result + ' error ' + error );
                    if (error) {
                        console.log("Errors !!" + error + "  Result - " + result);
                        //TO-DO: error message()
                        // throw new Meteor.Error("insert-failed", error.message);
                        throw new Meteor.Error("update-failed", error);
                    }
                });

        }


        console.log("=================Daily Scheduled job end=================");
        return true;
    }
});