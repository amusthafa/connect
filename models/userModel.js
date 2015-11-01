﻿/**
 * Created by amusthafa on 9/25/2015.
 */

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
    },
    primary: {
        type: String
    }
});

UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organizationFlag: {
        type: Boolean,
        optional: true
    },
    organization: {
        type: String,
        optional: true
    },
    occupation: {
        type: String,
        optional: true
    },
    phone: {
        type: Number
    },
    sharePhone: {
        type: Boolean,
        optional: true
    },
    status: {
        type: String,
	  allowedValues: ['Warned', 'Blacklist', 'Authentic'],
        optional: true
    },
    availabilityStatus: {
        type: String,
        allowedValues: ['Active', 'Inactive']
    },
    comments: {
        type: String,
        optional:true
    },
    differentlyAbled: {
        type: String
    },
    address: {
        type: Address,
        optional: true
    },
    appRole: {
        type: String,
        allowedValues: ['Seeker', 'Volunteer', 'Both'],
        optional: true

    },
    rating:{
    type: Number,
        min : 0,
        max : 5,
        optional: true,
        defaultValue : 0
}
});

User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
      //  regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    // roles: {
    //     type: Object,
    //     optional: true,
    //     blackbox: true
    // },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true,
        allowedValues: ['Admin', 'User']
    }
});

Meteor.users.attachSchema(User);
