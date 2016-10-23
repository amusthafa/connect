var chart;

function offerCreatedChart() {
    var data = Session.get("analyticsByOfferCreatedDate");
    console.log("offer"+ data);
        var chart = AmCharts.makeChart("chartdivSerialOffer", {
                "type": "serial",
                "theme": "light",
                "marginRight": 80,
                "autoMarginOffset": 20,
                "dataDateFormat": "YYYY-MM-DD",
                "valueAxes": [{
                    "id": "v1",
                    "axisAlpha": 0,
                    "position": "left"
                }],
                "balloon": {
                    "borderThickness": 1,
                    "shadowAlpha": 0
                },
                "graphs": [{
                    "id": "g1",
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": "#FFFFFF",
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "title": "red line",
                    "useLineColorForBulletBorder": true,
                    "valueField": "value",
                    "balloonText": "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[category]]</span><br>[[value]]</div>"
                }],

                "chartCursor": {
                    "pan": true,
                    "valueLineEnabled": true,
                    "valueLineBalloonEnabled": true,
                    "cursorAlpha":0,
                    "valueLineAlpha":0.2
                },
                "categoryField": "key",
                "categoryAxis": {
                    "parseDates": true,
                    "dashLength": 1,
                    "minorGridEnabled": true
                },
                "export": {
                    "enabled": true
                },
                "dataProvider": data
            });

       }


Template.analyticsOfferCreated.onRendered(function () {
  Session.set(MENU_KEY, false);
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
