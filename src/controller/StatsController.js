export default class {
    constructor() {
        this.reset()
    }

    reset() {
        this.accuracyData = {
            characters: 0,
            correct: 0
        }

        this.wpmData = {
            chars: 0,
            millis: 0,
            startTime: null,
            extraMillis: 0
        }

        // TODO: store arrays of stats per line to display graph at endll
    }

    getTypingTimeString() {
        let { millis } = this.wpmData;

        let secs = (millis / 1000 % 60).toFixed(1).padStart(4, '0')
        let mins = String(Math.floor(millis / 1000 / 60) % 60).padStart(2, '0')
        let hours = String(Math.floor(millis / 1000 / 60 / 60)).padStart(2, '0')

        if (hours !== "00") {
            return `${hours}:${mins}:${secs}`
        } else {
            return `${mins}:${secs}`
        }
    }

    // Calculate dynamic accuracy based on user & target text.
    // update=true will write this to the accumulated store.
    calculateAccuracy(userText = "", targetText = "", update = false) {

        let { characters, correct } = this.accuracyData;


        characters += userText.length;

        for (let i = 0; i < userText.length; i++) {
            let userChar = userText[i];
            let targetChar = targetText[i];

            if (userChar == targetChar) correct++;
        }


        if (update) {
            // For saved stats, errors should occur if chars not typed, therefore use targetTex, unlike above
            this.accuracyData.characters += targetText.length;
            this.accuracyData.correct = correct
        }

        let acc = correct / characters;

        return isFinite(acc) ? acc : 1;
    }

    restartWPMTimer() {
        this.wpmData.startTime = new Date();
        this.wpmData.extraMillis = 0;
    }

    pauseWPMTimer() {
        this.wpmData.wasTimer = !!this.wpmData.startTime

        if (this.wpmData.startTime) {
            this.wpmData.extraMillis = (new Date()).getTime() - this.wpmData.startTime.getTime()

            this.wpmData.startTime = null;
        }
    }

    unpauseWPMTimer() {
        if (this.wpmData.wasTimer) {
            this.wpmData.startTime = new Date()
        }
    }

    // Update = true will update accumulated values and cancel any excisting timers
    calculateWPM(userText = "", targetText = "", update = false) {
        let { chars, millis, startTime, extraMillis } = this.wpmData;

        if (startTime || extraMillis) {

            let now = new Date()

            for (let i in userText) {
                if (userText[i] == targetText[i]) {
                    chars++
                };
            }
            millis += now.getTime() - (startTime || now).getTime() + extraMillis;

            if (update) {
                this.wpmData.chars = chars;
                this.wpmData.millis = millis;
                this.wpmData.startTime = null;
                this.wpmData.extraMillis = 0;
            }
        }

        let mins = millis / 1000 / 60;

        let words = chars / 5;

        let wpm = words / mins;

        return isFinite(wpm) ? wpm : 0;
    }
}