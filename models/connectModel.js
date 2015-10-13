Connect = new Meteor.Collection('connect');
Connect.attachSchema({
        requestId: {
            type: String
        },
        requestorId: {
            type: String
        },
        volunteerAidId: {
            type: String
        },
        volunteerId: {
            type: String
        },
        aidId: {
            type: String
        },
        status: {
            type: String,
            allowedValues: ['Initiated', 'Accepted','Declined','VolunteerCanceled',
                'SeekerCanceled', 'PendingCompletion','Completed','Unsuccessful']
        },
        requestorRating: {
            type: Number,
            min : 1,
            max : 5,
            optional: true
        },
        volunteerAidRating: {
            type: Number,
            min : 1,
            max : 5,
            optional: true
        },
        connectedBy: {
            type: String,
            allowedValues: ['Admin', 'User']
        },
        requestedBy  :{
            type: Date
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