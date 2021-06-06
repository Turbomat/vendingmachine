let beerChart;
let alternativeChart;

class Shaft{
    amount;
    amountArray = Array.from(Array(29).keys());
    buttons;
    name;

    constructor(name) {
        this.name = name;
    }

    createButtons(){
        for (var i=this.amountArray.length-1; i >0; i--){
            this.buttons = $('<div></div>');
            this.buttons.html("<input class = 'empty btnAmount' type='button' data-shaftId='"+this.name+"' id='buttons_"+i+"_"+this.name+"' value='" + this.amountArray[i] + "'/>");
            $("#btns"+this.name).append(this.buttons);
        }
    }

    update(){
        if(this.amount > 0){
            this.amount--;
            console.log("One Beer out of " + this.name + ". Beers Left: " + this.amount);
        }
    }
}

// Create Shaft-Objects & Buttons
var shafts = []
for (var i = 0; i < 6; i++) {
    shafts.push(new Shaft(i+1));
    shafts[i].createButtons();
}

// Update Button-Appearance with Data from Backend database.json
function updateShaftBtns(shaftID, value){
    for (var i=1; i <= parseInt(value); i++) {
        document.getElementById("buttons_" + i + "_" + shaftID).classList.add('full');
    }
    for (var j = 28; j > parseInt(value); j--) {
        document.getElementById("buttons_" + j + "_" + shaftID).classList.remove('full');    }
}

// Update Backend database.json with Data from GUI-Inputs
$('.btnAmount').on('click', function(e){
    console.log(e.target.getAttribute('data-shaftId'), e.target.value);

    $.post( "/vendingmachine-data?" + $.param({
        shaft: e.target.getAttribute('data-shaftId'),
        amount: e.target.value
    }));

    getData();
});

// Update Charts with Data from Backend log.json
function update(response) {
    // Update charts
    response.entries.forEach(data => {
        const time = new Date(data.timestamp);
        const stamp = time.getDay();
        // Adds points to the charts using the Highcharts library
        beerChart.series[0].addPoint([stamp, data.pin], false, false);
        beerChart.series[1].addPoint([stamp, data.pin], false, false);
        beerChart.series[2].addPoint([stamp, data.pin], false, false);
        beerChart.series[3].addPoint([stamp, data.pin], false, false);
        beerChart.series[4].addPoint([stamp, data.pin], false, false);
        alternativeChart.series[0].addPoint([stamp, data.pin], false, false);
    });
    // Redraw the charts each time update is called
    beerChart.redraw();
    alternativeChart.redraw();
}

// Update Frontend with Fill-level of each Shaft with Data from database.json
function updateShafts(response) {

    Object.keys(response).forEach(shaftId => {
        updateShaftBtns(shaftId, response[shaftId])
    });
}

// Get the data from the API
function getData() {
    $.ajax({
        url: "/vendingmachine-data"
    }).done(function( response ) {
        updateShafts(response);
    });
}

// Get the data from the API
function getLog() {
    $.ajax({
        url: "/vendingmachine-log"
    }).done(function( response ) {
        //console.log( msg );
        update(response);
    });
}

// Sets up the charts from the High Charts library
function initChart() {

    beerChart = Highcharts.chart("schacht", {
        chart: { type: "spline" },
        title: { text: "Beer Consumption" },
        xAxis: { type: "datetime" },
        yAxis: {
            title: {
                text: 'Beerconsumption in Cans'
            },
            min: 0
        },
        series: [{
            name: "Quöllfrisch",
            data: []
        }, {
            name: "Feldschlösschen",
            data: []
        }, {
            name: "Chopf ab",
            data: [
            ]
        }, {
            name: "Anker",
            data: [
            ]
        }, {
            name: "Mate",
            data: [
            ]
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
        xAxis:[{
            labels:{
                formatter:function(){
                    return Highcharts.dateFormat('%Y %M %d',this.value);
                }
            }
        }],
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

    getLog();
    setInterval(getLog, 5000);

    getData();
    setInterval(getData, 1000);
}

$(initChart);
