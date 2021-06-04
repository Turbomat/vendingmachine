let beerChart;
let alternativeChart;

//Edit Button
const input_buttons = document.getElementById("btns");
const edit_button = document.getElementById("edit-button");
const end_button = document.getElementById("end-editing");


class Shaft{
    amount;
    amountArray = Array.from(Array(29).keys());
    buttons;
    name;

    constructor(name) {
        this.name = name;
    }

    setBeerInShaft(amount){
        this.amount = amount;
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

//Create Shaft-Objects
const Shaft1 = new Shaft(1);
const Shaft2 = new Shaft(2);
const Shaft3 = new Shaft(3);
const Shaft4 = new Shaft(4);
const Shaft5 = new Shaft(5);


function updateShaftBtns(shaftID, value){
    console.log(value)
    for (var i=1; i <= parseInt(value); i++) {
        console.log("buttons_" + i + "_" + shaftID);
        //var btns = document.getElementById("btns"+shaftID+"");
        document.getElementById("buttons_" + i + "_" + shaftID).classList.add('full');

    }
    for (var j = 28; j > parseInt(value); j--) {
        document.getElementById("buttons_" + j + "_" + shaftID).classList.remove('full');    }
}

Shaft1.createButtons();
Shaft2.createButtons();
Shaft3.createButtons();
Shaft4.createButtons();
Shaft5.createButtons();

/*
$('#btns').on('click', 'input', function(e){
    console.log("click: ", e.target.value);
    Shaft1.setBeerInShaft(e.target.value);
    updateShaftBtns(Shaft1.amount);
    console.log("shaft1: "+Shaft1.amount);
});*/

$('.btnAmount').on('click', function(e){
    console.log(e.target.getAttribute('data-shaftId'), e.target.value);

    $.post( "/vendingmachine-data?" + $.param({
        shaft: e.target.getAttribute('data-shaftId'),
        amount: e.target.value
    }));

    getData();
});

/*edit_button.addEventListener("click", function() {
    console.log("hallloo");
    input_buttons.enabled = "enabled";
    input_buttons.style.backgroundColor = "#dddbdb";
});

end_button.addEventListener("click", function() {
    console.log("tschüüüss");
    input_buttons.disabled = "disabled";
    input_buttons.style.backgroundColor = "#ffe44d";
});*/

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

function updateShafts(response) {

    Object.keys(response).forEach(shaftId => {
        console.log(shaftId);
        console.log(response[shaftId]);
        updateShaftBtns(shaftId, response[shaftId])
    });
}

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

    console.log("hey");
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


    getLog();
    setInterval(getLog, 5000);

    getData();
    setInterval(getData, 1000);
}

$(initChart);
