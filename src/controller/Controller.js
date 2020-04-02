import { writable, derived } from "svelte/store";

export default class Controller {
    constructor() {

        // Story
        this.story = undefined;
        this.partNum = 0;

        this.typedText = "";
        this.typedLines = [];

        this.accuracyStats = {
            correct: 0,
            total: 0
        }

        // Callback stuff
        this.lineCallbacks = [];
        this.charCallbacks = [];

        this.paused = false;

        // DEBUG
        window.c = this;
    }

    setStory(story, part = 0) {

        this.story = story
        this.partNum = part

        this.typedText = "";
        this.typedLines = [];

        this.triggerLineEvent()
    }

    updateTypedText(newText) {
        this.typedText = newText;
        this.triggerCharEvent()
    }


    submit(line) {
        this.typedLines.push(line);
        this.triggerLineEvent();
    }

    // Getters
    get currentPart() {
        return this.story.parts[this.partNum]
    }

    get partName() {
        return this.currentPart.name;
    }

    get lineNum() {
        return this.typedLines.length
    }

    get currentLine() {
        return this.currentPart.content[this.lineNum];
    }

    get nextLine() {
        return this.currentPart.content[this.lineNum + 1];
    }

    get accuracy() {
        let { total, correct } = this.accuracyStats;
        total += this.typedText.length;

        for (let [i, char] of this.typedText.split("").entries()) {
            if (char == this.currentLine[i]) correct++;
        }

        let acc = correct / total

        if (!acc || acc == Infinity) {
            return 1
        }

        return acc;
    }

    // Update funcs, must be added to callback list
    updateTypedTextAccuracy() {
        this.accuracyStats.total += this.typedText.length;
        let lastLine = this.typedLines[this.typedLines.length - 1]
        for (let [i, char] of lastLine.split("").entries()) {
            if (char == lastLine[i]) this.accuracyStats.correct++;
        }
    }

    // Callback stuff
    subscribeLine(callback) {
        this.lineCallbacks.push(callback);
    }

    subscribeChar(callback) {
        this.charCallbacks.push(callback);
    }

    triggerLineEvent() {
        this.lineCallbacks.forEach(c => c(this))

        if (this.typedLines.length > 0)
            this.updateTypedTextAccuracy();
    }

    triggerCharEvent() {
        this.charCallbacks.forEach(c => c(this))

    }


}