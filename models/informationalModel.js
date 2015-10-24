Information = new Meteor.Collection('information');


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


Information.attachSchema({
        infoTitle: {
            type: String
        },
        infoType: {
            type: String,
            allowedValues: ['Hospitals/Doctors','Ailments','Education','Jobs','Rights']
        },
        informationDescription: {
          type:String

        },
       contactAddress: {
            type: Address,
            optional:true
        },

        contactPhone:{
            type:Number,
          optional:true
        },
        addedById: {
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
