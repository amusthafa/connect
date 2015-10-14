var chart;

function requestCreatedChart() {
    var data = Session.get("analyticsByRequestCreatedDate");
    console.log("data"+ data);
    var chart = AmCharts.makeChart("chartdiv", {
        type: "serial",
        dataProvider: data,
        categoryField: "date",
        rotate: true,

        categoryAxis: {
            gridPosition: "start",
            axisColor: "#DADADA"
        },
        valueAxes: [{
            axisAlpha: 0.9
        }],
        graphs: [{
            type: "column",
            title: "Requests",
            valueField: "count",
            lineAlpha: 0,
            fillColors: "#ADD981",
            fillAlphas: 0.9,
            balloonText: "[[title]] in [[category]]:<b>[[value]]</b>"
        }]
    });
}

Template.analyticsRequestCreated.onRendered(function () {

    Meteor.call('getAnalyticsByRequestCreatedDate', function (err, result) {
        Session.set("analyticsByRequestCreatedDate", result);
        console.log("render" + JSON.stringify(Session.get("analyticsByRequestCreatedDate")));
    });

    requestCreatedChart();
})

