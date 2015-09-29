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


Router.route("/addAid", {
    name: 'home',
    template: 'aid',
    data: function () {
        console.log('router Q - ' + JSON.stringify(this.query));
        //Meteor.call("addAid",this.aid);
        var abc = {
            "a": "b"
        };
        Meteor.call("addAid", abc);
    }

});
