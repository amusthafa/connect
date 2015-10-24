Meteor.methods(
    {
        Ratings: function (rating) {
            check(rating, Object);
            console.log(rating.count);
            Ratings.insert({
                "count": rating.count,
                "row_created": new Date(),
                "row_updated": new Date()
            }, function (error, result) {
            })

        }
    });
