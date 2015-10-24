VolunteerAid = new Meteor.Collection('volunteerAid');

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



VolunteerAid.attachSchema({
        offerId: {
            type: String
        },
        volunteerId: {
            type: String
        },
        aidId: {
            type: String
        },
        aidStart: {
            type: Date
        },
        aidExpiry: {
            type: Date
        },
        aidAddress: {
            type: Address
        },
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