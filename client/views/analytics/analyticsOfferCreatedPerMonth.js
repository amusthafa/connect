var chart;

function requestCreatedChart() {
    var data = Session.get("analyticsByOfferPerMonth");
    console.log("data" + data);
    var chart = AmCharts.makeChart("chartdivPerMonth2", {
        "theme": "light",
        "type": "serial",
        "startDuration": 2,
        "dataProvider": data,
        "valueAxes": [{
            "position": "left",
            "axisAlpha": 0,
            "gridAlpha": 0
        }],
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.85,
            "lineAlpha": 0.1,
            "type": "column",
            "topRadius": 1,
            "valueField": "value"
        }],
        "depth3D": 40,
        "angle": 30,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "key",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "gridAlpha": 0

        },

    });
}

Template.analyticsOfferCreatedPerMonth.onRendered(function () {
  Session.set(MENU_KEY, false);

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
