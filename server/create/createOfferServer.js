Meteor.methods(
    {
        getAddress: function (userId) {
            check(userId, String);
            if (userId === Meteor.userId()) {
                var request = Meteor.users.findOne({_id: userId});
                console.log("Server getRequest:", JSON.stringify(request));
            }
            else {
                var request = Meteor.users.findOne({'profile.firstName': userId.split(",")[0]}
                    && {'profile.lastName': userId.split(",")[1].replace(",", "").replace("-", "").replace(" ", "")}
                    && {'emails.address': userId.split("-")[1].replace("-", "").replace(" ", "")});
            }
            return request;
        },
        createOffer: function (OfferIp) {
            check(OfferIp, Object);
            if (OfferIp.volunteerId === Meteor.userId()) {
                volunteerId = OfferIp.volunteerId;
            } else if (OfferIp.volunteerId !== Meteor.userId()) {
                var emailId = OfferIp.requestorId.split("-")[1];
                id = JSON.stringify(Accounts.findUserByEmail(emailId));
                volunteerId = id.split(":")[1].split(",")[0].replace("\"", "").replace("\"", "");
            }
            ;

         aidName = Aid.findOne({'aidName': OfferIp.aid});
            Offer.insert({
                "offerName": OfferIp.offerName,
                "offerType": OfferIp.offerType,
                "creatorId": OfferIp.creatorId,
                "volunteerId": volunteerId,
                "line1": OfferIp.line1,
                "line2": OfferIp.line2,
                "city": OfferIp.city,
                "state": OfferIp.state,
                "country": OfferIp.country,
                "pincode": OfferIp.pincode,
                "aid": aidName._id,
                "fromDate": OfferIp.fromDate,
                "toDate": OfferIp.toDate,
                "comment": OfferIp.comment,
                "row_created": new Date(),
                "row_updated": new Date()
            }, function (error, result) {

                console.log("offer insert result error " + error);
                console.log("offer insert result" + result);

                VolunteerAid.insert({
                        "offerId": result,
                        "volunteerId": volunteerId,
                        "aid": aidName._id,
                        "aidExpiry": OfferIp.toDate,
                        "aidAddress": {
                            "line1": OfferIp.line1,
                            "line2": OfferIp.line2,
                            "city": OfferIp.city,
                            "state": OfferIp.state,
                            "country": OfferIp.country,
                            "pinCode": OfferIp.pincode,
                        },
                        "row_created": new Date(),
                        "row_updated": new Date()
                    }, function (error, result) {

                        console.log("offer insert result error " + error);
                        console.log("offer insert result" + result);
                    }
                )
            })

        }
    });