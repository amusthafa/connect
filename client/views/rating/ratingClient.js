Template.rating.onRendered(function () {
    $('.rateit').rateit();
    $(".rateit").on('rated', function (event, value) {
        console.log('Rating:' + value)
    })
});

Template.rating.events({
    'submit form': function (event, template) {
        event.preventDefault();
        var rating = {};
        rating.count = template.$('#add-rating').rateit('value');
        console.log(rating.count)
        Meteor.call("Ratings", rating);
    }

})
;