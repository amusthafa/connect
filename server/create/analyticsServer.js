Meteor.methods(
    {
        getAnalyticsByRequestCreatedDate: function () {
            var pipeline = [
                {
                    $group: {
                        _id: {
                            year: {$year: "$rowCreated"},
                            month: {$month: "$rowCreated"},
                            day: {$dayOfMonth: "$rowCreated"}
                        },
                        count: {$sum: 1}
                    }
                },
                {$sort: {_id: 1}},
                {$limit: 30}
            ];

            var result = Request.aggregate(pipeline);

            result = JSON.stringify(result);
            console.log(result.split(":{\"year\":").join(":\"").split(",\"month\":").join("-").split(",\"day\":").join("-").split("},\"count\"").join("\",\"count\""));
            resultChanged = JSON.parse(result.split(":{\"year\":").join(":\"").split(",\"month\":").join("-").split(",\"day\":").join("-").split("},\"count\"").join("\",\"count\""));
            console.log(resultChanged);
            var requestDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                requestDetails.push({key: res._id, value: res.count});
            }
            console.log(requestDetails);
            return requestDetails;
        },

        getAnalyticsByOfferCreatedDate: function () {
            var pipeline = [
                {
                    $group: {
                        _id: {
                            year: {$year: "$rowCreated"},
                            month: {$month: "$rowCreated"},
                            day: {$dayOfMonth: "$rowCreated"}
                        },
                        count: {$sum: 1}
                    }
                },
                {$sort: {_id: 1}},
                {$limit: 30}
            ];

            var result = Offer.aggregate(pipeline);

            result = JSON.stringify(result);

            console.log(result.split(":{\"year\":").join(":\"").split(",\"month\":").join("-").split(",\"day\":").join("-").split("},\"count\"").join("\",\"count\""));
            resultChanged = JSON.parse(result.split(":{\"year\":").join(":\"").split(",\"month\":").join("-").split(",\"day\":").join("-").split("},\"count\"").join("\",\"count\""));
            console.log(resultChanged);
            var offerDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                offerDetails.push({key: res._id, value: res.count});
            }
            console.log(offerDetails);
            return offerDetails;
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
                {$sort: {aidCount: 1}},
                {$limit: 10}
            ];
            //**Have to change to Request
            var results = Request.aggregate(pipeline);
            result = JSON.stringify(results);
            resultChanged = JSON.parse(result.split(":{\"aid\"").join("").split("\"},\"").join("\",\""));
            console.log(resultChanged);
            var aidDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                var request = Aid.findOne({_id: res._id});
                aidDetails.push({key: request.aidName, value: res.aidCount});
            }
            console.log(aidDetails);
            return aidDetails;
        },

        getAnalyticsByRequestPerMonth: function () {
            var pipeline = [
                {
                    $group: {
                        _id: {
                            month: {$month: "$rowCreated"},
                            year: {$year: "$rowCreated"}
                        },
                        count: {$sum: 1}
                    }
                },
                {$sort: {_id: 1}},
                {$limit: 12}
            ];

            var results = Request.aggregate(pipeline);
            result = JSON.stringify(results);
            console.log(result.split(":{\"month\":").join(":\"").split(",\"year\":").join("-").split("},\"count\"").join("\",\"count\""));
            resultChanged = JSON.parse(result.split(":{\"month\":").join(":\"").split(",\"year\":").join("-").split("},\"count\"").join("\",\"count\""));
            var monthlyDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                monthlyDetails.push({key: res._id, value: res.count});
            }
            console.log(monthlyDetails);
            return monthlyDetails;
        },

        getAnalyticsByOffertPerMonth: function () {
            var pipeline = [
                {
                    $group: {
                        _id: {
                            month: {$month: "$rowCreated"},
                            year: {$year: "$rowCreated"}
                        },
                        count: {$sum: 1}
                    }
                },
                {$sort: {_id: 1}},
                {$limit: 12}
            ];

            var results = Offer.aggregate(pipeline);
            result = JSON.stringify(results);
            console.log(result.split(":{\"month\":").join(":\"").split(",\"year\":").join("-").split("},\"count\"").join("\",\"count\""));
            resultChanged = JSON.parse(result.split(":{\"month\":").join(":\"").split(",\"year\":").join("-").split("},\"count\"").join("\",\"count\""));
            var monthlyDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                monthlyDetails.push({key: res._id, value: res.count});
            }
            console.log(monthlyDetails);
            return monthlyDetails;
        },

        getAnalyticsByAidPerRegion: function () {

            var pipeline1 = [
                {
                    "$group": {
                        "_id": {
                            "city": "$requestAddress.city",
                            "aidId": "$aidId",
                        },
                        "count": {"$sum": 1}
                    }
                }, {
                    "$group": {
                        "_id": "$_id.city",
                        "byRegion": {
                            "$addToSet": {
                                "aid": "$_id.aidId",
                                "total": "$count"
                            }
                        }
                    }
                }
            ];

            var results = Request.aggregate(pipeline1);

            var perRegion = [];
            for (var x in results) {
                res = results[x];
                var aidPerRegion = [];
                for (var y in res.byRegion) {
                    aidMap = res.byRegion[y];
                    var request = Aid.findOne({_id: aidMap.aid});
                    aidPerRegion.push({key: request.aidName, value: aidMap.total});
                }
                perRegion.push({"city": res._id, "aid": aidPerRegion});
            }
            console.log(JSON.stringify(perRegion));

            result = JSON.stringify(perRegion);

            console.log(result.split("\"aid\":[{").join("").split("\"key\":").join("").split(",\"value\"").join("").split("},{").join(",").split("}],\"city\"").join("},{\"city\"").replace("}]}]", "}]"));
            resultChanged = JSON.parse(result.split("\"aid\":[{").join("").split("\"key\":").join("").split(",\"value\"").join("").split("},{").join(",").split("}],\"city\"").join("},{\"city\"").replace("}]}]", "}]"));

            return resultChanged;
        },

        getUniqueAidPerRegion: function () {
            var results = Request.find().fetch();
            var distinctArray = _.uniq(results, false, function (d) {
                return d.aidId
            });
            var disctinctValues = _.pluck(distinctArray, 'aidId');
            var aid = [];
            for (var x in disctinctValues) {
                aidId = disctinctValues[x];
                var request = Aid.findOne({_id: aidId});
                aid.push(request.aidName);
            }
            console.log(aid);
            return aid;
        }
    });