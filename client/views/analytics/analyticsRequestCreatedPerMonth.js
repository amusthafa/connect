var chart;

function requestCreatedChart() {
    var data = Session.get("analyticsByRequestPerMonth");
    console.log("data" + data);
    var chart = AmCharts.makeChart("chartdivPerMonth1", {
        "type": "serial",
        "theme": "light",
        "marginTop": 0,
        "marginRight": 80,
        "dataProvider": data,
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left"
        }],
        "graphs": [{
            "id": "g1",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "round",
            "bulletSize": 8,
            "lineColor": "#d1655d",
            "lineThickness": 2,
            "negativeLineColor": "#637bb6",
            "type": "smoothedLine",
            "valueField": "value"
        }],
        "chartCursor": {
            "categoryBalloonDateFormat": "MM-YYYY",
            "cursorAlpha": 0,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "valueLineAlpha": 0.5,
            "fullWidth": true
        },
        "dataDateFormat": "MM-YYYY",
        "categoryField": "key",
        "categoryAxis": {
            "parseDates": true,
            "minorGridAlpha": 0.1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        }
    });
}

Template.analyticsRequestCreatedPerMonth.onRendered(function () {
  Session.set(MENU_KEY, false);

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
