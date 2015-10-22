Medical = new Meteor.Collection('medicalInfo');
Education = new Meteor.Collection('educationInfo');
Ailments = new Meteor.Collection('ailmentsInfo');
Jobs = new Meteor.Collection('jobInfo');
Rights = new Meteor.Collection('rightsInfo');

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
Medical.attachSchema({
  Hospital_name: {
    type: String
  },
  Doctor_name: {
    type: String
  },
  Facility_desc: {
    type: String
  }
});

Education.attachSchema({
Institution_name: {
    type: String
  },
  ContactPerson_name: {
    type: String
  },
  Institute_Address: {
    type: Address
  },
  Facility_desc: {
    type: String
  }
  });

Ailments.attachSchema({
  Ailments_name: {
  type: String
  },
  Ailments_type: {
    type: String
  },
  Ailments_desc:{
    type: String
  },
  hosp_info :{
    type : String
  }
  });

  Jobs.attachSchema({
    Company_name: {
        type: String
    },
    Job_resignation: {
      type: String
    },

    EligibilityInfo:{
      type: String
    },

    QualificationRequired: {
      type: String
    },

    Company_Address: {
        type: Address
      },

    Job_desc: {
        type: String
      }
  });

  Rights.attachSchema({
    Rights_name: {
      type: String
    },

    Rights_secno:{
      type: String
    },
    ApplicableTo:{
      type: String
    },
    Rights_details:{
      type: String
    }
  });






//           rowCreated: {
//             type: Date,
//             denyUpdate: true,
//             autoValue: function () {
//                 if (this.isInsert) {
//                     return new Date;
//                 } else if (this.isUpsert) {
//                     return {$setOnInsert: new Date};
//                 } else {
//                     this.unset();  // Prevent user from supplying their own value
//                 }
//             }
//         },
//         rowUpdated: {
//             type: Date,
//             autoValue: function () {
//                 if (this.isUpdate) {
//                     return new Date();
//                 }
//             },
//             denyInsert: true,
//             optional: true
//         }
//     }
// );
