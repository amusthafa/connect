Notifications = new Meteor.Collection('notifications');
Notifications.attachSchema({
        connectId: {
            type: String
        },
        requestId: {
            type: String
        },
        volunteerAidId: {
            type: String
        },
        status: {
            type: String
        },
        userId: {
            type: String
        },
        type: {
            type: String,
            //same set of values as status of connect
            allowedValues: ['Initiated', 'Accepted','Declined','VolunteerCanceled',
                'SeekerCanceled', 'PendingCompletion','Completed','CompletedWithRating']
        },
        description: {
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