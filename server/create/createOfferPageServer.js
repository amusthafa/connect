
Meteor.methods({createOffer : function ( OfferIp) {

    check(OfferIp, Object);

    if(OfferIp.volunteerId === Meteor.userId()){
        volunteerId= OfferIp.volunteerId;
    }else if (OfferIp.volunteerId !== Meteor.userId()){
        id= JSON.stringify(Accounts.findUserByEmail(OfferIp.requestorId));
        console.log(id.split(":")[1].split(",")[0].replace("\"","").replace("\"",""));
        volunteerId = id.split(":")[1].split(",")[0].replace("\"","").replace("\"","")};

    Offer.insert({
        "offerName":OfferIp.offerName,
        "offerType":OfferIp.offerType,
        "creatorId":OfferIp.creatorId,
        "volunteerId":volunteerId,
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
            "volunteerId":volunteerId,
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
