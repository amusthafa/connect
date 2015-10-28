Router.route('/', function () {
    this.render('home');
    SEO.set({title: 'Home - Ola Amigo!!'});
});

Router.route('/Login', {
    name: 'login',
    action: function () {
        this.render('login');
    }
});

Router.route('/ForgotPassword', {
    name: 'forgotPassword',
    action: function () {
        this.render('forgotPass');
    }
});

Router.route('/Logout', {
    name: 'logout',
    onBeforeAction: Meteor.logout,
    action: function () {
        this.render('home');
    }
});

Router.route('/SignUp', {
    name: 'signUp',
    action: function () {
        this.render('signUp');
    }
});

Router.route('/AddAdmin', {
    name: 'addAdmin',
    action: function () {
        this.render('addAdmin');
    }
});

Router.route('/CreateProfile', {
    name: 'createProfile',
    action: function () {
        this.render('signUp');
    }
});


Router.route('/loadAid', {
    name: 'aid',
    action: function () {
        this.render('aid');
    }
});

Router.route('/createRequest', {
    name: 'createRequest',
    action: function () {
        this.render('createRequest');
    }
});


Router.route('/listOfRequests', {
    name: 'listOfRequests',
    action: function () {
        this.render('listOfRequests');
    }
});

Router.route('/editRequest', {
    name: 'editRequest',
    action: function () {
        this.render('createRequest');
    }
});

Router.route('/SearchId', {
    name: 'SearchId',
    action: function () {
        this.render('SearchId');
    }
});
Router.route('/informationAdd', {
    name: 'informationAdd',
    action: function () {
        this.render('informationAdd');
    }
});
Router.route('/informationView', {
    name: 'informationView',
    action: function () {
        this.render('informationView');
    }
});
// Router.route('/SearchRequest', {
//     name: 'SearchRequest',
//     action: function () {
//         this.render('SearchRequest');
//     }
// });
// Router.route('getRequest', {
//   path: '/getRequest/4qAuokmjDMh2jdmkq',
//   template: 'getRequest',
//   data: function() { return Request.find({requestorId : this.params._id}).fetch(); }
// });


Router.route('/loadAdminAuth', {
    name: 'adminAuth',
    // template: 'createRequest',
    action: function () {
        this.render('adminAuth');
    }
});


Router.route('/loadMatch', {
    name: 'match',
    action: function () {
        this.render('match');
    }
});

Router.route('/createOffer', {
    name: 'createOffer',
    action: function () {
        this.render('createOffer');
    }
});

Router.route('/analytics', {
    name: 'analytics',
    action: function () {
        this.render('analytics');
    }
});
Router.route('/loadNotifications', {
    name: 'notifications',
    action: function () {
        this.render('notifications');
    }
});

Router.route('/analyticsRequestCreated', {
    name: 'analyticsRequestCreated',
    action: function () {
        this.render('analyticsRequestCreated');
    }
});


Router.route('/analyticsOfferCreated', {
    name: 'analyticsOfferCreated',
    action: function () {
        this.render('analyticsOfferCreated');
    }
});

Router.route('/connectUpdate', {
    name: 'connectUpdate',
    action: function () {
        this.render('connectUpdate');
    }
});


Router.route('/updateStatus', {
    name: 'updateStatus',
    action: function () {
        this.render('updateStatus');
    }
});

Router.route('/analyticsAidRequestedFor', {
    name: 'analyticsAidRequestedFor',
    action: function () {
        this.render('analyticsAidRequestedFor');
    }
});

Router.route('/analyticsRequestCreatedPerMonth', {
    name: 'analyticsRequestCreatedPerMonth',
    action: function () {
        this.render('analyticsRequestCreatedPerMonth');
    }
});

Router.route('/analyticsOfferCreatedPerMonth', {
    name: 'analyticsOfferCreatedPerMonth',
    action: function () {
        this.render('analyticsOfferCreatedPerMonth');
    }
});

Router.route('/analyticsRequestPerRegion', {
    name: 'analyticsRequestPerRegion',
    action: function () {
        this.render('analyticsRequestPerRegion');
    }
});

Router.route('/manageRequest', {
    name: 'manageRequest',
    action: function () {
        this.render('manageRequest');
    }
});

Router.route('/rating', {
    name: 'rating',
    action: function () {
        this.render('rating');
    }
});

Router.route('/feedback', {
    name: 'feedback',
    action: function () {
        this.render('feedback');
    }
});

Router.route('/addTocontactUs', {
    name: 'addTocontactUs',
    action: function () {
        this.render('addTocontactUs');
    }
});

Router.route('/viewFeedbacks', {
    name: 'viewFeedbacks',
    action: function () {
        this.render('viewFeedbacks');
    }
});

Router.route('/contactUs', {
    name: 'contactUs',
    action: function () {
        this.render('contactUs');
    }
});

Router.route('/resetPassword', {
    name: 'resetPassword',
    action: function () {
        this.render('resetPassword');
    }
});

Router.route('/updateProfile', {
    name: 'updateProfile',
    action: function () {
        this.render('updateProfile');
    }
});


Router.route('/manualConnect', {
    name: 'manualConnect',
    action: function () {
        this.render('manualConnect');
    }
});