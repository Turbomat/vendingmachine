//const say = require("say");
//const faces = require("./face-definitions");
//const face = require("./face");

const beersInShaft = {
    s1: 0,
    s2: 0,
    s3: 0,
    s4: 0,
    s5: 0,
};

beersInShaft.s1 = 28;

const interval = 1;
let lastCalculated = new Date();

function setBeerInShaft(a,b,c,d,e){
    beersInShaft.s1 = a;
    beersInShaft.s2 = b;
    beersInShaft.s3 = c;
    beersInShaft.s4 = d;
    beersInShaft.s5 = e;

}

function interpret(sensorData) {
    let message = "";
    let emotion = "neutral";
    const now = new Date();
    const currentHour = now.getHours();

    if (sensorData.pin === 2) {
        if(beersInShaft.s1 > 0){
            beersInShaft.s1--;
            console.log("One Beer out of Shaft 1. Beers Left: " + beersInShaft.s1);
        }
    }
    if (sensorData.pin === 4) {
        if(beersInShaft.s2 > 0){
            beersInShaft.s2--;
            console.log("One Beer out of Shaft 2. Beers Left: " + beersInShaft.s2);
        }
    }
    if (sensorData.pin === 7) {
        if(beersInShaft.s3 > 0){
            beersInShaft.s3--;
            console.log("One Beer out of Shaft 3. Beers Left: " + beersInShaft.s3);
        }
    }
    if (sensorData.pin === 8) {
        if(beersInShaft.s4 > 0){
            beersInShaft.s4--;
            console.log("One Beer out of Shaft 4. Beers Left: " + beersInShaft.s4);
        }
    }
    if (sensorData.pin === 12) {
        if(beersInShaft.s5 > 0){
            beersInShaft.s5--;
            console.log("One Beer out of Shaft 5. Beers Left: " + beersInShaft.s5);
        }
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
