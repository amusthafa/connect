var chart;

function requestCreatedChart() {
    var data = Session.get("analyticsByOfferPerMonth");
    console.log("data" + data);
    var chart = AmCharts.makeChart("chartdivPerMonth2", {
        type: "serial",
        dataProvider: data,
        categoryField: "key",
        rotate: true,

        categoryAxis: {
            gridPosition: "start",
            axisColor: "#DADADA"
        },
        valueAxes: [{
            axisAlpha: 0.9,
            minimum: 0
        }],
        graphs: [{
            type: "column",
            title: "Requests",
            valueField: "value",
            lineAlpha: 0,
            fillColors: "#ADD981",
            fillAlphas: 0.9,
            balloonText: "[[title]] in [[category]]:<b>[[value]]</b>"
        }]
    });
}

Template.analyticsOfferCreatedPerMonth.onRendered(function () {

    Meteor.call('getAnalyticsByOffertPerMonth', function (err, result) {
        if (err) {
            console.log("Errors !!" + error + "  Result - " + result);
        }
        else {

            Session.set("analyticsByOfferPerMonth", result);
            console.log("render" + JSON.stringify(Session.get("analyticsByOfferPerMonth")));
            requestCreatedChart();
        }
    });
})

