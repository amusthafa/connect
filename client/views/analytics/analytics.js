/*
 * Function to draw the column chart
 */
function builtColumn() {

    $('#container-column').highcharts({

        chart: {
            type: 'column'
        },

        title: {
            text: 'Requests Created'
        },

        xAxis: {
            categories: [
                '2015-10-10',
                '2015-10-09'
            ]
        },

        yAxis: {
            min: 0,
            title: {
                text: 'No. Of Requests Created'
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },

        series: [{
            name: 'Total Requests',
            data: [49.9, 71.5]

        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.analytics.rendered = function() {
    builtColumn();
}