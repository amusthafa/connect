
Meteor.methods({createOffer : function ( OfferIp) {

    check(OfferIp, Object);

    Offer.insert({
        "offerName":OfferIp.offerName,
        "offerType":OfferIp.offerType,
        "creatorId":OfferIp.creatorId,
        "line1":OfferIp.line1,
        "line2": OfferIp.line2,
        "city":OfferIp.city,
        "state":OfferIp.state,
        "country": OfferIp.country,
        "pincode": OfferIp.pincode,
        "aid":OfferIp.aid,
        "fromDate": OfferIp.fromDate,
        "toDate": OfferIp.toDate,
        "comment":OfferIp.comment,
        "row_created" :new Date(),
        "row_updated" :new Date()
    }, function (error,result) {

        console.log("offer insert result error " +error);
        console.log("offer insert result" +result);

        VolunteerAid.insert({
            "offerId":result,
            "volunteerId":OfferIp.creatorId,
            "aid":OfferIp.aid,
                "line1":OfferIp.line1,
                "line2": OfferIp.line2,
                "city":OfferIp.city,
                "state":OfferIp.state,
                "country": OfferIp.country,
                "pincode": OfferIp.pincode,
            "row_created" :new Date(),
            "row_updated" :new Date()
        }, function (error,result) {

            console.log("offer insert result error " +error);
            console.log("offer insert result" +result);}
        )
          })

}});
