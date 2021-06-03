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

    constructor(name) {
        this.name = name;
    }

    setBeerInShaft(amount){
        this.amount = amount;
    }

    createButtons(){
        for (var i=0; i < this.amountArray.length; i++){
            this.buttons = $('<div></div>');
            this.buttons.html("<input class = 'empty' type='button' id='buttons_"+i+"' value='" + this.amountArray[i] + "'/>");
            $("#btns").append(this.buttons);
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
const Shaft1 = new Shaft();
const Shaft2 = new Shaft();
const Shaft3 = new Shaft();
const Shaft4 = new Shaft();
const Shaft5 = new Shaft();


function updateShaftBtns(value){
    for (var i=0; i <= value; i++) {
            document.getElementById("buttons_" + i + "").classList.add('full');
    }
    for (var j = 28; j > value; j--) {
        document.getElementById("buttons_" + j + "").classList.remove('full');
    }
}

Shaft1.createButtons();

$('#btns').on('click', 'input', function(e){
    console.log("click: ", e.target.value);
    Shaft1.setBeerInShaft(e.target.value);
    updateShaftBtns(Shaft1.amount);
    console.log("shaft1: "+Shaft1.amount);
});


edit_button.addEventListener("click", function() {
    console.log("hallloo");
    input_buttons.enabled = "enabled";
    input_buttons.style.backgroundColor = "#dddbdb";
});

end_button.addEventListener("click", function() {
    console.log("tschüüüss");
    input_buttons.disabled = "disabled";
    input_buttons.style.backgroundColor = "#ffe44d";
});


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
