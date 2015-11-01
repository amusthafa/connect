Meteor.methods(
    {
        Ratings: function (rating) {
            check(rating, Number);
            console.log(rating);
            Ratings.insert({
                "count": rating,
                "row_created": new Date(),
                "row_updated": new Date()
            }, function (error, result) {
            })

        }
    });
