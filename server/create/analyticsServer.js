Meteor.methods(
    {
        getAnalyticsByRequestCreatedDate: function () {
            var pipeline = [
                {
                    $group: {
                        _id: {
                            $add: [
                                {$dayOfYear: "$rowCreated"},
                                {
                                    $multiply: [400, {$year: "$rowCreated"}]
                                }
                            ]
                        },
                        count: {$sum: 1},
                        date: {$min: "$rowCreated"}
                    }
                },
                {$limit: 30}
            ];

            var result = Request.aggregate(pipeline);
            console.log(result);
            return result;
        },

        getAnalyticsByOfferCreatedDate: function () {
            var pipeline = [
                {
                    $group: {
                        _id: {
                            $add: [
                                {$dayOfYear: "$rowCreated"},
                                {
                                    $multiply: [400, {$year: "$rowCreated"}]
                                }
                            ]
                        },
                        count: {$sum: 1},
                        date: {$min: "$rowCreated"}
                    }
                },
                {$limit: 30}
            ];

            var result = Offer.aggregate(pipeline);
            console.log(result);
            return result;
        }
    });