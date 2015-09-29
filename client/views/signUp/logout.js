Template.home.events({
    'click .logout': function (event) {
        event.preventDefault();
        console.log('Logging out');
        Meteor.logout();
        Router.go("/");
    }
});
