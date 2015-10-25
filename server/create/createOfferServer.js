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
        createOffer: function (offer) {
            check(offer, Object);
            if (offer.volunteerId === Meteor.userId()) {
                volunteerId = offer.volunteerId;
            } else if (offer.volunteerId !== Meteor.userId()) {
                var emailId = offer.requestorId.split("-")[1];
                id = JSON.stringify(Accounts.findUserByEmail(emailId));
                volunteerId = id.split(":")[1].split(",")[0].replace("\"", "").replace("\"", "");
            }
            ;

            var offerObj = {
                "offerName": offer.offerName,
                "offerType": offer.offerType,
                "creatorId": offer.creatorId,
                "volunteerId": volunteerId,
                "offerAddress": {
                    "line1": offer.line1,
                    "line2": offer.line2,
                    "city": offer.city,
                    "state": offer.state,
                    "country": offer.country,
                    "pinCode": offer.pincode,
                },
                "comment": offer.comment,
                "row_created": new Date(),
                "row_updated": new Date()
            };
            Offer.insert(offerObj, function (error, result) {
              console.log("offer insert result:" + JSON.stringify(result));
                if (error) {
              console.log("offer sanitizedError!!!:", error.sanitizedError);
              throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
          }
          else{
              console.log("Success insert in Offer table");
                var volunteerAid = {
                        "offerId": result,
                        "volunteerId": volunteerId,
                        "aidId": offer.aid,
                        "aidStart": offer.fromDate,
                        "aidExpiry": offer.toDate,
                        "aidAddress": {
                            "line1": offer.line1,
                            "line2": offer.line2,
                            "city": offer.city,
                            "state": offer.state,
                            "country": offer.country,
                            "pinCode": offer.pincode,
                        },
                        "row_created": new Date(),
                        "row_updated": new Date()
                    };
                VolunteerAid.insert(volunteerAid, function (error, result) {
                  console.log("volunteerAid insert result:" + JSON.stringify(result));

                  if (error) {
                    console.log(" volunteerAid sanitizedError!!!:", error.sanitizedError);
                    throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
                }else{
                  console.log("Success insert in VolunteerAid table");
                }

                    });
              }
            });

        }
    });
