var chart;

function offerCreatedChart() {
    var data = Session.get("analyticsByOfferCreatedDate");
    console.log("offer"+ data);
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
            "gridAlpha": 0
        },
    });
}


Template.analyticsOfferCreated.onRendered(function () {
    Meteor.call('getAnalyticsByOfferCreatedDate', function (err, result) {

        if (err) {
            console.log("Errors !!" + error + "  Result - " + result);
        }else {
            Session.set("analyticsByOfferCreatedDate", result);
            console.log("render" + JSON.stringify(Session.get("analyticsByOfferCreatedDate")));
            offerCreatedChart();
        }

    });


})