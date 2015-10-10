Aid = new Meteor.Collection('aid');
Aid.attachSchema({
        aidName: {
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
/*

 // Collection2 already does schema checking
 // Add custom permission rules if needed
 Aid1.allow({
 insert : function () {
 return false;
 },
 update : function () {
 return false;
 },
 remove : function () {
 return false;
 }
 });
 */
