const five = require("johnny-five");
const server = require("./server");
const calculate = require("./calculations");

const arduino = new five.Board();

const sensorData = {
    pin: 0
};

// Start server
server.start();

arduino.on("ready", function () {

    // Setup the Beer-Schacht Sensors
    const schachtButtons = new five.Buttons({
        pins: [2, 4, 7, 8, 12],
        invert: false,
    });

    // When data is received, update the front end with information from the sensors
    schachtButtons.on("press", function(button) {
        sensorData.pin = button.pin;
        server.updateData(sensorData);
        calculate.interpret(sensorData);
        console.log("Pressed: ", sensorData);
    });

    schachtButtons.on("release", function(button) {
        sensorData.pin = button.pin;
        server.updateData(sensorData);
        calculate.interpret(sensorData);
        console.log("Released: ", sensorData);
    });
});
