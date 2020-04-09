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

        // TODO: store arrays of stats per line to display graph at end
    }

    // Calculate dynamic accuracy based on user & target text.
    // update=true will write this to the accumulated store.
    calculateAccuracy(userText, targetText, update = false) {

        let { characters, correct } = this.accuracyData;


        characters += userText.length;

        for (let i = 0; i < userText.length; i++) {
            let userChar = userText[i];
            let targetChar = targetText[i];

            if (userChar == targetChar) correct++;
        }


        if (update) {
            this.accuracyData.characters = characters;
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
    // TODO: need to subtract errant chars. (Net WPM)
    calculateWPM(userText, update = false) {
        let { chars, millis, startTime, extraMillis } = this.wpmData;

        if (startTime || extraMillis) {

            let now = new Date()

            chars += userText.length
            millis += now.getTime() - (startTime || now).getTime() + extraMillis;

            if (update) {
                this.wpmData.chars = chars;
                this.wpmData.millis = millis;
                this.wpmData.startTime = null;
                console.log(this.wpmData.startTime)
                this.wpmData.extraMillis = 0;
            }
        }

        let mins = millis / 1000 / 60;

        let words = chars / 5;

        let wpm = words / mins;

        return isFinite(wpm) ? wpm : 0;
    }
}