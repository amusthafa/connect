var chart;

function requestCreatedChart() {
    var data = Session.get("analyticsByRequestCreatedDate");
    console.log("data"+ data);
    var chart = AmCharts.makeChart("chartdiv", {
        type: "serial",
        dataProvider: data,
        categoryField: "key",
        rotate: true,

        categoryAxis: {
            gridPosition: "start",
            axisColor: "#DADADA"
        },
        valueAxes: [{
            axisAlpha: 1.0,
            minimum: 0
        }],
        graphs: [{
            type: "column",
            title: "Requests",
            valueField: "value",
            lineAlpha: 0,
            fillColors: "#66CDAA",
            fillAlphas: 1.0,
            balloonText: "[[title]] in [[category]]:<b>[[value]]</b>"
        }]
    });
}

Template.analyticsRequestCreated.onRendered(function () {
  Session.set(MENU_KEY, false);

    Meteor.call('getAnalyticsByRequestCreatedDate', function (err, result) {

        if (err) {
            console.log("Errors !!" + error + "  Result - " + result);
        }else {
            Session.set("analyticsByRequestCreatedDate", result);
            console.log("render" + JSON.stringify(Session.get("analyticsByRequestCreatedDate")));
            requestCreatedChart();
        }
    });


})
