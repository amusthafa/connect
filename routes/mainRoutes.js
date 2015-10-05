Router.route('/', function () {
    this.render('home');
    SEO.set({ title: 'Home -' + Meteor.App.NAME });
});

Router.route('/Login', {
    name: 'login',
    action: function () {
        this.render('login');
    }
});

Router.route('/Logout', {
    name: 'logout',
    action: function () {
        this.render('logout');
    }
});

Router.route('/SignUp', {
    name: 'signUp',
    action: function () {
        this.render('signUp');
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

Router.route('/manageRequest', {
    name: 'manageRequest',
    action: function () {
        this.render('manageRequest');
  }
  });


  // Router.route('getRequest', {
  //   path: '/getRequest/4qAuokmjDMh2jdmkq',
  //   template: 'getRequest',
  //   data: function() { return Request.find({requestorId : this.params._id}).fetch(); }
  // });
