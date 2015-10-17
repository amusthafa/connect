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
        },

        getAnalyticsForAidRequested: function () {

            var pipeline = [
                {
                    $group: {
                        _id: {
                            aid: "$aidId"
                        },
                        aidCount: {$sum: 1}

                    }
                },
                {$limit: 10}
            ];
            //**Have to change to Request
            var results = Offer.aggregate(pipeline);
            console.log(results);
            result = JSON.stringify(results);
            resultChanged = JSON.parse(result.split(":{\"aid\"").join("").split("\"},\"").join("\",\""));
            console.log(resultChanged);
            var aidDetails=[];
            for (var x in resultChanged) {
                res = resultChanged[x];
                var request = Aid.findOne({_id: res._id});
                aidDetails.push({key: request.aidName, value: res.aidCount});
            }
            console.log(aidDetails);
            return aidDetails;
        }
    });