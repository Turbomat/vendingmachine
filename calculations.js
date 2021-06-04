//const say = require("say");
//const faces = require("./face-definitions");
//const face = require("./face");


const interval = 1;
let lastCalculated = new Date();

function interpret(sensorData) {
    let message = "";
    let emotion = "neutral";
    const now = new Date();
    const currentHour = now.getHours();

    if (sensorData.pin === 2) {
        Shaft1.update();
    }
    if (sensorData.pin === 4) {
        Shaft2.update();
    }
    if (sensorData.pin === 7) {
        Shaft3.update();
    }
    if (sensorData.pin === 8) {
        Shaft4.update();
    }
    if (sensorData.pin === 12) {
        Shaft5.update();
    }

    /*else if (sensorData.celsius > 25) {
        message += `I'm hot! It's ${sensorData.celsius} degrees in here. Open the window or move me away from the sun.`;
        emotion = "sad";
    }

    if (sensorData.light < 25 && currentHour < 20 && currentHour > 6) {
        message += "It's too dark in here. Switch the lights on!";
        emotion = "sad";
    }

    if (sensorData.moisture < 35) {
        message += "Water me please! My soil is dry.";
        emotion = "sad";
    }

    if (message === "") {
        message += "I'm happy right now! Everything is fine.";
        emotion = "happy";
    }*/

    if (now.getTime() - lastCalculated.getTime() > interval * 1000 * 60) {
        //say.calculate(message);
        //face.display(faces[emotion]);
        lastCalculated = now;
    }
}

exports.interpret = interpret;
