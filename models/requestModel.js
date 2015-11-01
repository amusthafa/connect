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
        aidId: {
            type: String
        },
        comment: {
            type: String,
            optional: true
        },

        requiredBy: {
            type: Date,
            autoform: {
                type: "bootstrap-datepicker"
            }
        },
        //To-do : should make it Boolean
        emergency: {
            type: String,
            allowedValues: ['Yes', 'No']
        },
        //To-DO : To update the list of statuses
        status: {
            type: String,
            allowedValues: ["Submitted","InProgress","Closed","Deleted"]
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
