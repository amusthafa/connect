Request = new Meteor.Collection('request');
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
        //TO-DO: should the whole aid object be here??
        aidId: {
            type: String
        },
        // //TO-DO: should the whole aid object be here??
        // aidCategoryId: {
        //     type: String
        // },
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
            allowedValues: ["Submitted"]
        },
        //To-DO : should the whole address object be here??
        address_id: {
            type: String
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