var chart;

function requestCreatedChart() {
    var data = Session.get("analyticsByRequestPerMonth");
    console.log("data" + data);
    var chart = AmCharts.makeChart("chartdivPerMonth1", {
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

Template.analyticsRequestCreatedPerMonth.onRendered(function () {

    Meteor.call('getAnalyticsByRequestPerMonth', function (err, result) {

        if (err) {
            console.log("Errors !!" + error + "  Result - " + result);
        } else {
            Session.set("analyticsByRequestPerMonth", result);
            console.log("render" + JSON.stringify(Session.get("analyticsByRequestPerMonth")));
            requestCreatedChart();
        }
    });
})

