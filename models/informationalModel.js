Information = new Meteor.Collection('information');


Address = new SimpleSchema({
    line1: {
        type: String,
        optional:true
    },
    line2: {
        type: String,
        optional:true
    },
    city: {
        type: String,
        optional:true
    },
    state: {
        type: String,
        optional:true
    },
    country: {
        type: String,
        optional:true
    },
    pinCode: {
        type: String,
        optional:true
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

        verificationStatus:{
          type :String,
          allowedValues :['Yes','No']
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
