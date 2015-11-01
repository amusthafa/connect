Router.route('/', function () {
    this.render('home');
    SEO.set({title: 'Home - Ola Amigos!!'});
});

Router.route('/login', {
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

Router.route('/ResendVerificationMail', {
    name: 'resendMail',
    action: function () {
        this.render('resendVerificationMail');
    }
});

Router.route('/logout', {
    name: 'logout',
    onBeforeAction: function () {
        Meteor.logout();
        this.next();
    },
    action: function () {
        this.render('login');
    }
});

Router.route('/SignUp/0', {
    name: 'signUp',
    action: function () {
        this.render('signUp');
    }
});

Router.route('/AddAdmin', {
    name: 'addAdmin',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('addAdmin');
    }
});

Router.route('/CreateProfile/0', {
    name: 'createProfile',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('signUp');
    }
});


Router.route('/loadAid', {
    name: 'aid',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('aid');
    }
});

Router.route('/createRequest', {
    name: 'createRequest',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('createRequest');
    }
});


Router.route('/listOfRequests', {
    name: 'listOfRequests',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('listOfRequests');
    }
});

Router.route('/editRequest', {
    name: 'editRequest',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('createRequest');
    }
});

Router.route('/SearchId', {
    name: 'SearchId',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('SearchId');
    }
});
Router.route('/informationAdd', {
    name: 'informationAdd',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('informationAdd');
    }
});
Router.route('/informationView', {
    name: 'informationView',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
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
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('adminAuth');
    }
});


Router.route('/loadMatch', {
    name: 'match',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('match');
    }
});

Router.route('/createOffer', {
    name: 'createOffer',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('createOffer');
    }
});

Router.route('/analytics', {
    name: 'analytics',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('analytics');
    }
});
Router.route('/loadNotifications', {
    name: 'notifications',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('notifications');
    }
});

Router.route('/analyticsRequestCreated', {
    name: 'analyticsRequestCreated',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('analyticsRequestCreated');
    }
});


Router.route('/analyticsOfferCreated', {
    name: 'analyticsOfferCreated',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('analyticsOfferCreated');
    }
});

Router.route('/connectUpdate', {
    name: 'connectUpdate',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('connectUpdate');
    }
});


Router.route('/updateStatus', {
    name: 'updateStatus',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('updateStatus');
    }
});

Router.route('/analyticsAidRequestedFor', {
    name: 'analyticsAidRequestedFor',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('analyticsAidRequestedFor');
    }
});

Router.route('/analyticsRequestCreatedPerMonth', {
    name: 'analyticsRequestCreatedPerMonth',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('analyticsRequestCreatedPerMonth');
    }
});

Router.route('/analyticsOfferCreatedPerMonth', {
    name: 'analyticsOfferCreatedPerMonth',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('analyticsOfferCreatedPerMonth');
    }
});

Router.route('/analyticsRequestPerRegion', {
    name: 'analyticsRequestPerRegion',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('analyticsRequestPerRegion');
    }
});

Router.route('/manageRequest', {
    name: 'manageRequest',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('manageRequest');
    }
});

Router.route('/rating', {
    name: 'rating',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('rating');
    }
});

Router.route('/feedback', {
    name: 'feedback',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('feedback');
    }
});

Router.route('/addTocontactUs', {
    name: 'addTocontactUs',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('addTocontactUs');
    }
});

Router.route('/viewFeedbacks', {
    name: 'viewFeedbacks',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('viewFeedbacks');
    }
});

Router.route('/contactUs', {
    name: 'contactUs',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
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

Router.route('/updateProfile/:id', {
    name: 'updateProfile',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    data: function(){
        console.log(this.params.id);
    },
    action: function () {
        this.render('signUp');
    }
});


Router.route('/manualConnect', {
    name: 'manualConnect',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('manualConnect');
    }
});


Router.route('/help', {
    name: 'help',
    onBeforeAction: function () {
      if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('/login');
      }
      this.next();
    },
    action: function () {
        this.render('help');
    }
});
