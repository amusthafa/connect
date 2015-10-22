var chart;

function aidChart() {
    var data = Session.get("analyticsForRequestedAid");
    console.log("offer" + data);
    var chart = AmCharts.makeChart("chartdivAid", {
        "type": "serial",
        "theme": "light",
        "marginRight": 70,
        "dataProvider": data,
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left",
            "title": "Count"
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "value"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "key",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 45
        },
        "export": {
            "enabled": true
        }

    });
}

Template.analyticsAidRequestedFor.onRendered(function () {
    Meteor.call('getAnalyticsForAidRequested', function (err, result) {
        if (err) {
            console.log("Errors !!" + error + "  Result - " + result);
        }
        else {
            Session.set("analyticsForRequestedAid", result);
            console.log("render" + JSON.stringify(Session.get("analyticsForRequestedAid")));
            aidChart();
        }
    });

})