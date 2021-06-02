let beerChart;
let alternativeChart;

function update(response) {
    response.entries.forEach(data => {

        const time = new Date(data.timestamp);
        const stamp = time.getTime();


        // Adds points to the charts using the Highcharts library
        beerChart.series[0].addPoint([stamp, data.pin], false, false);
        alternativeChart.series[0].addPoint([stamp, data.pin], false, false);
    });

    // Redraw the charts each time update is called
    beerChart.redraw();
    alternativeChart.redraw();
}

// Get the data from the API
function getData() {
    $.ajax({
        url: "/vendingmachine-data",
        success: update
    });
}

// Sets up the charts from the High Charts library
function initChart() {
    beerChart = Highcharts.chart("schacht", {
        chart: { type: "spline" },
        title: { text: "BeerPin" },
        xAxis: { type: "datetime" },
        series: [{
            name: "%",
            data: []
        }]
    });

    alternativeChart = Highcharts.chart("schachtt", {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Beer Consumption Turbomat'
        },
        subtitle: {
            text: 'by alec hehe'
        },
        xAxis: {
            type: "datetime",
            dateTimeLabelFormats: { // don't display the dummy year
                day: '',
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Beerconsumption in Cans'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} cans'
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: true
                }
            }
        },

        colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        series: [{
            name: "Quöllfrisch",
            data: []
        }, {
            name: "Feldschlösschen",
            data: []
        }, {
            name: "Chopf ab",
            data: [
                [Date.UTC(1971, 4, 25), 0]
            ]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    plotOptions: {
                        series: {
                            marker: {
                                radius: 2.5
                            }
                        }
                    }
                }
            }]
        }

    });


    getData();
    setInterval(getData, 5000);
}

$(initChart);
