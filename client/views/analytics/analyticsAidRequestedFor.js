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
Template.analytics.helpers ({
    ///menu - start

    menuOpen
:
function () {
    return Session.get(MENU_KEY) && 'menu-open';
}
,
userMenuOpen: function () {
    return Session.get(USER_MENU_KEY);
}
,
connected: function () {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
        return Meteor.status().connected;
    } else {
        return true;
    }
}
///menu - end
});

var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, true);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

Meteor.startup(function () {
    // set up a swipe left / right handler
    $(document.body).touchwipe({
        wipeLeft: function () {
            Session.set(MENU_KEY, false);
        },
        wipeRight: function () {
            Session.set(MENU_KEY, true);
        },
        preventDefaultEvents: false
    });

});

Template.analytics.rendered = function() {
    // init fastclick
    FastClick.attach(document.body);
};

Template.analytics.events({
    'click .toggle': function() {
        Session.set(MENU_KEY, ! Session.get(MENU_KEY));
        console.log(Session.get(MENU_KEY));
    },
    'click .content-overlay': function(event) {
        Session.set(MENU_KEY, false);
        event.preventDefault();
    }});