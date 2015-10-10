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
        "SearchUserOffer": function (name) {

            //Check is made for name
            check(name, String);
            count_value = Meteor.users.find({'profile.firstName': name}).count();
            if (count_value == 0) {
                return 0;
            } else {
                data = []
                data = Meteor.users.find({'profile.firstName': name}).fetch();
                return data;
            }
        },
        createOffer: function (OfferIp) {
            check(OfferIp, Object);
            if (OfferIp.volunteerId === Meteor.userId()) {
                volunteerId = OfferIp.volunteerId;
            } else if (OfferIp.volunteerId !== Meteor.userId()) {
                var emailId= OfferIp.requestorId.split("-")[1];
                console.log(emailId)
                id = JSON.stringify(Accounts.findUserByEmail(emailId));
                console.log(OfferIp.requestorId);
                volunteerId = id.split(":")[1].split(",")[0].replace("\"", "").replace("\"", "");
            }
            ;

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
                "aid": OfferIp.aid,
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
                        "aid": OfferIp.aid,
                        "line1": OfferIp.line1,
                        "line2": OfferIp.line2,
                        "city": OfferIp.city,
                        "state": OfferIp.state,
                        "country": OfferIp.country,
                        "pincode": OfferIp.pincode,
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