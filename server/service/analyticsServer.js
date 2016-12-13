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
            resultChanged = JSON.parse(result.split(":{\"year\":").join(":\"").split(",\"month\":").join("-").split(",\"day\":").join("-").split("},\"count\"").join("\",\"count\""));
            var requestDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                requestDetails.push({key: res._id, value: res.count});
            }
            console.log("Request Created Per Date" + JSON.stringify(requestDetails));
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

            resultChanged = JSON.parse(result.split(":{\"year\":").join(":\"").split(",\"month\":").join("-").split(",\"day\":").join("-").split("},\"count\"").join("\",\"count\""));
            var offerDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                year = res._id.split("-")[0];
                month = ('0' + res._id.split("-")[1]).slice(-2);
                date = ('0' + res._id.split("-")[2]).slice(-2);
                finalDate = year + '-' + month + '-' + date;
                offerDetails.push({key: finalDate, value: res.count});
            }
            console.log("Offer Created Per Date" + JSON.stringify(offerDetails));
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

            var aidDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                var request = Aid.findOne({_id: res._id});
                aidDetails.push({key: request.aidName, value: res.aidCount});
            }
            console.log("Aid Rqeuested" + JSON.stringify(aidDetails));
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
            resultChanged = JSON.parse(result.split(":{\"month\":").join(":\"").split(",\"year\":").join("-").split("},\"count\"").join("\",\"count\""));
            var monthlyDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                month = ('0' + res._id.split("-")[0]).slice(-2);
                year = res._id.split("-")[1];
                finalDate = month + '-' + year;
                monthlyDetails.push({key: finalDate, value: res.count});
            }
            console.log("Request Per Month" + JSON.stringify(monthlyDetails));
            return monthlyDetails;
        },

        getAnalyticsByOffertPerMonth: function () {
        console.log('entering offer per month');
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
            resultChanged = JSON.parse(result.split(":{\"month\":").join(":\"").split(",\"year\":").join("-").split("},\"count\"").join("\",\"count\""));
            var monthlyDetails = [];
            for (var x in resultChanged) {
                res = resultChanged[x];
                month = ('0' + res._id.split("-")[0]).slice(-2);
                year = res._id.split("-")[1];
                finalDate = month + '-' + year;
                monthlyDetails.push({key: finalDate, value: res.count});
            }
            console.log("Offer Per Month" + JSON.stringify(monthlyDetails));
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
                }, {$sort: {_id: 1}}, {$limit: 10}, {
                    "$group": {
                        "_id": "$_id.city",
                        "byRegion": {
                            "$addToSet": {
                                "aid": "$_id.aidId",
                                "total": "$count"
                            }
                        }
                    }
                },
                {$limit: 10}
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
            result = JSON.stringify(perRegion);

            resultChanged = JSON.parse(result.split("\"aid\":[{").join("").split("\"key\":").join("").split(",\"value\"").join("").split("},{").join(",").split("}],\"city\"").join("},{\"city\"").replace("}]}]", "}]"));
            console.log("Aid Per Region" + JSON.stringify(resultChanged));

            var final ={};
            final.chart = resultChanged;
            final.table=perRegion;
            console.log("Aid Per Region" + JSON.stringify(final));


            return final;
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
            console.log("Uniq" + aid);
            return aid;
        }
    });