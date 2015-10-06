/**
 * Created by amusthafa on 10/4/2015.
 */
Meteor.methods({matchRequestVolunteer: function (request) {
    console.log('entered matchRequestVolunteer');
    //TO-DO: remove check()
    check(request, Object);

    console.log('entered connect'+ request._id);

    var request = Request.findOne({"_id":request._id });

    console.log("req -- " + JSON.stringify(request));

    //Active, City, - Done
    //TO-DO - Date, Rating
    var volunteer = VolunteerAid.find({"address_city" : request.address_city}).fetch();

    // check if volunteer is active or inactive
    db.request.find( { requestType: { $in: [ 'Self', 'Other1' ] } } )

    console.log("vol -- " + JSON.stringify(volunteer));
    console.log("vol len-- " + volunteer.length);


}});