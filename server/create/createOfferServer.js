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
        createOffer: function (OferId) {
        check(OferId, Object);
        if (OferId.volunteerId === Meteor.userId()) {
            volunteerId = OferId.volunteerId;
        } else if (OferId.volunteerId !== Meteor.userId()) {
            var emailId = OferId.requestorId.split("-")[1];
            id = JSON.stringify(Accounts.findUserByEmail(emailId));
            volunteerId = id.split(":")[1].split(",")[0].replace("\"", "").replace("\"", "");
        }

        var offer = {
            "offerName": OferId.offerName,
            "offerType": OferId.offerType,
            "creatorId": OferId.creatorId,
            "volunteerId": volunteerId,
            "offerAddress": {
                "line1": OferId.line1,
                "line2": OferId.line2,
                "city": OferId.city,
                "state": OferId.state,
                "country": OferId.country,
                "pinCode": OferId.pincode,
            },
            "comment": OferId.comment,
            "row_created": new Date(),
            "row_updated": new Date()
        };

        var offerId;

        console.log("offer!!!:", JSON.stringify(offer));

        Offer.insert(offer, function (error, result) {

          console.log("offer insert " + JSON.stringify(result));
          if (error) {
              console.log("offer sanitizedError!!!:", error.sanitizedError);
              throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
          }
          else{
            try{
            console.log("offer insert success: result:", JSON.stringify(result));
            offerId = result;
            console.log("offerID!!!!!!!!!!!!:", offerId);
            var volunteerAid = {
              "offerId": offerId,
              "volunteerId": volunteerId,
              "aidId": OferId.aid,
              "aidStart": OferId.fromDate,
              "aidExpiry": OferId.toDate,
              "aidAddress": {
                  "line1": OferId.line1,
                  "line2": OferId.line2,
                  "city": OferId.city,
                  "state": OferId.state,
                  "country": OferId.country,
                  "pinCode": OferId.pincode,
                },
              "row_created": new Date(),
              "row_updated": new Date()
              };

              console.log("VolunteerAid:", JSON.stringify(volunteerAid));

            VolunteerAid.insert(volunteerAid, function (error, result) {
                console.log("volunteerAid insert " + JSON.stringify(result));
                if (error) {
                    console.log(" volunteerAid sanitizedError!!!:", error.sanitizedError);
                    throw new Meteor.Error(error.sanitizedError.error, error.message, error.sanitizedError.details);
                }
            });
          }
          catch (e) {
              console.log("error caught!!:", e);
              // throw new Meteor.Error(e,"Please fill in the required details");
              throw new Meteor.Error(e, e.reason, e.details);
          }
          }
        });

      }
    });
