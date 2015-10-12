var chart;

/*
 * Function to draw the chart
 */
function requestCreatedChart() {
    console.log("data1"+ Session.get("getAnalyticsByRequestCreatedDate"));
    var data = Session.get("getAnalyticsByRequestCreatedDate");
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

function offerCreatedChart() {
    console.log("data1"+ Session.get("getAnalyticsByOfferCreatedDate"));
    var data = Session.get("getAnalyticsByOfferCreatedDate");
    console.log("data"+ data);
    var chart = AmCharts.makeChart("chartdivOffer", {
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

    var chart = AmCharts.makeChart("chartdivSerialOffer", {
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
    Meteor.call('getAnalyticsByRequestCreatedDate', function (err, result) {
        Session.set("getAnalyticsByRequestCreatedDate", result);
        console.log("render" + JSON.stringify(Session.get("getAnalyticsByRequestCreatedDate")));
    });

    Meteor.call('getAnalyticsByOfferCreatedDate', function (err, result) {
        Session.set("getAnalyticsByOfferCreatedDate", result);
        console.log("render" + JSON.stringify(Session.get("getAnalyticsByOfferCreatedDate")));
    });

    requestCreatedChart();
   offerCreatedChart();
}


