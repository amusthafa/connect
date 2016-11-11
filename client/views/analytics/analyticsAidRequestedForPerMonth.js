var chart;

function aidChart() {
    var data = Session.get("analyticsByAidPerRegion");
    console.log("ByRegion" + data);
    var aid = Session.get("aidPerRegion");
    console.log("aid" + aid);

    var graphText = [];
    for (var x in aid) {
        aidDetails = aid[x];
        graphText.push({
            "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b></span>",
            "fillAlphas": 0.9,
            "fontSize": 11,
            "labelText": "[[value]]",
            "title": aidDetails,
            "type": "column",
            "valueField": aidDetails
        })
    }

    console.log(graphText);
    var chart = AmCharts.makeChart("chartdivPerMonth3", {
        "type": "serial",
        "theme": "light",
        "legend": {
            "autoMargins": false,
            "borderAlpha": 0.2,
            "equalWidths": false,
            "horizontalGap": 10,
            "markerSize": 10,
            "useGraphSettings": true,
            "valueAlign": "left",
            "valueWidth": 0
        },
        "dataProvider": data,
        "valueAxes": [{
            "stackType": "100%",
            "axisAlpha": 0,
            "gridAlpha": 0,
            "labelsEnabled": false,
            "position": "left"
        }],
        "graphs": graphText,
        "marginTop": 30,
        "marginRight": 0,
        "marginLeft": 0,
        "marginBottom": 40,
        "autoMargins": false,
        "categoryField": "city",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "gridAlpha": 0
        },
        "export": {
            "enabled": true
        }

    });
}

Template.analyticsRequestPerRegion.onRendered(function () {
    Meteor.call('getAnalyticsByAidPerRegion', function (err, result) {
        if (err) {
            console.log("Errors !!" + error + "  Result - " + result);
        } else {
            Session.set("analyticsByAidPerRegion", result);
            Meteor.call('getUniqueAidPerRegion', function (err, result) {
                if (err) {
                    console.log("Errors !!" + error + "  Result - " + result);
                } else {
                    Session.set("aidPerRegion", result);
                    aidChart();
                }
            })
        }
    })

});
