Offer = new Meteor.Collection('offer');

Address = new SimpleSchema({
    line1: {
        type: String
    },
    line2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    pinCode: {
        type: String
    }
});


Offer.attachSchema({
        offerName: {
            type: String
        },
        offerType: {
            type: String,
            allowedValues: ['Self', 'Other']
        },
        creatorId: {
            type: String
        },
        volunteerId:{
        type: String,
        optional: true
    },
        offerAddress:  {
            type: Address
        },
        /*aidId: {
            type: String
        },*/
        comment: {
            type: String,
            optional: true
        },
        /*fromDate: {
            type: String
        },
        toDate: {
            type: String
        },*/

        rowCreated: {
            type: Date,
            denyUpdate: true,
            autoValue: function () {
                if (this.isInsert) {
                    return new Date;
                } else if (this.isUpsert) {
                    return {$setOnInsert: new Date};
                } else {
                    this.unset();  // Prevent user from supplying their own value
                }
            }
        },
        rowUpdated: {
            type: Date,
            autoValue: function () {
                if (this.isUpdate) {
                    return new Date();
                }
            },
            denyInsert: true,
            optional: true
        }
    }
);
