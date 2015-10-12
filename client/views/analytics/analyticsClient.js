var chart;

/*
 * Function to draw the chart
 */
function builtLineChart() {
    var data = Session.get("getAnalyticsByDate");
    console.log("1st" + JSON.stringify(Session.get("getAnalyticsByDate")));
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

    var chart = AmCharts.makeChart("chartdivSerial", {
        "type": "serial",
        "theme": "none",
        "titles": [{
            "text": "My Chart Title"
        }, {
            "text": "My Chart Sub-Title",
            "bold": false
        }],
        "dataProvider": data,
        "valueAxes": [{
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0
        }],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "count"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "date",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0
        },
    });
}


Template.analytics.rendered = function () {
    Meteor.call('getAnalyticsByDate', function (err, result) {
        Session.set("getAnalyticsByDate", result);
        console.log("render" + JSON.stringify(Session.get("getAnalyticsByDate")));
    });

    builtLineChart();
}


