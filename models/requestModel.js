Request = new Meteor.Collection('request');


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


Request.attachSchema({
        request_name: {
            type: String
        },
        requestType: {
            type: String,
            allowedValues: ['Self', 'Other']
        },
        creatorId: {
            type: String
        },
        requestorId: {
            type: String
        },
        requestAddress: {
            type: Address
        },

        //TO-DO: should the whole aid object be here??
        aidId: {
            type: String
        },

        comment: {
            type: String
        },

        requiredBy: {
            type: Date,
            autoform: {
                type: "bootstrap-datepicker"
            }
        },
        //To-do : should make it Boolean
        emergency: {
            type: String
        },
        //To-DO : To update the list of statuses
        status: {
            type: String,
            allowedValues: ["Submitted","InProgress","Closed","Canceled"]
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
