ContactUsDetails = new Meteor.Collection('ContactUsDetails');
ContactUsDetails.attachSchema({
        contactName: {
            type: String
        },
        phoneNumber: {
            type: Number
        },
        emailId: {
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

Feedback = new Meteor.Collection('Feedback');
Feedback.attachSchema({
        name: {
            type: String
        },
        emailId: {
            type: String
        },
        subject: {
            type: String
        },
        message: {
            type: String
        },
        status:{
          type: String,
          allowedValues : ["Pending", "Done"]
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
