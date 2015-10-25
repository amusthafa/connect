Template.rating.events({
    'submit form': function (event, template) {
        event.preventDefault();
        var rating = $('#rating').data('userrating');
        console.log(rating);
        Meteor.call("Ratings", rating);
    }

})
;