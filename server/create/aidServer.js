Meteor.methods(
    {addAid: function (aid) {

        //TO-DO: remove check()
        check(aid, Object);
        /*check (aid_category_id,String);
         check (aid_name,String);*/
        var data = {
            "aidName": aid.aid_name

        }
        //TO-DO: return one record
        var aidExists = Aid.find({aidName: aid.aid_name}).fetch();

        console.log('aidExists - ' + aidExists.length);
        var length = aidExists.length;
        if (length === 0) {
            Aid.insert(data, function (error, result) {

                console.log("Aid find " + JSON.stringify(Aid.find().fetch()));
                if (error) {
                    console.log("Errors !!" + error + "  Result - " + result);
                    //TO-DO: error message()
                    // throw new Meteor.Error("insert-failed", error.message);    });
                    throw new Meteor.Error("insert-failed", error);
                }
            });
        }
        else
            throw new Meteor.Error("Aid already exists");


        /*

         Offer.insert({
         "offerName" : "Test",
         "offerType" : "Self",
         "creatorId" : "123"
         }, function (error,result) {

         console.log("offer insert result error " +error);
         console.log("offer insert result" +result);


         VolunteerAid.insert({
         "offerId" : result,
         "volunteerId" : "V1",
         "aidId" : "Scribe",
         "aidCategoryId" : "Visual",
         "aidExpiry" : "01/01/2016",
         "status" : "Active",
         "aidAddress" : {city:"Chennai"},
         "address_id" : "123"
         });

         VolunteerAid.insert({
         "offerId" : result,
         "volunteerId" : "V1",
         "aidId" : "O+",
         "aidCategoryId" : "Blood",
         "aidExpiry" : "01/01/2016",
         "status" : "Active",
         "aidAddress" : {city:"Chennai"},
         "address_id" : "123"
         });

         });
         */


        console.log("inser donee !!!");


        return true;

        // return Aid.insert(data);
    },
        getAid: function () {
            console.log('aidlist entered');
var aidList = Aid.find(( { $query: {}, $orderby: { aidName : 1 } } )).fetch();
console.log('aidlist'+aidList);

            return aidList;
        }
    }
);