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
    },
    primary: {
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
//TO-DO: should the whole aid object be here??
        aidId: {
            type: String
        },
        aidExpiry: {
            type: Date
        }/*,
        status: {
            type: String,
            allowedValues: ['Active', 'Inactive']
        }*/,
        //To-DO : should the whole address object be here??
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
