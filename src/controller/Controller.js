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
        this.notReadyCallbacks = [];


        this.paused = false;

        // DEBUG
        window.c = this;
    }

    setStory(story, part = 0) {

        this.story = story
        this.partNum = part

        this.typedText = "";
        this.typedLines = [];

        this.accuracyStats = {
            correct: 0,
            total: 0
        }

        this.triggerLineEvent()
    }

    storyPartString() {
        return this.story ? `${this.story.name} : ${this.partName}` : ""
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

    get ready() {
        return this.story && this.currentLine
    }

    get currentPart() {
        return this.story && this.story.parts[this.partNum]
    }

    get partName() {
        return this.story && this.currentPart.name;
    }

    get lineNum() {
        return this.story && this.typedLines.length
    }

    get prevLine() {
        return this.story && this.currentPart.content[this.lineNum - 1] || "";
    }

    get currentLine() {
        return this.story && this.currentPart.content[this.lineNum] || "";
    }

    get nextLine() {
        return this.story && this.currentPart.content[this.lineNum + 1] || "";
    }

    get accuracy() {

        let { total, correct } = this.accuracyStats;

        let cl = this.currentLine;

        if (this.ready) {
            total += this.typedText.length;


            for (let [i, char] of this.typedText.split("").entries()) {
                if (char == cl[i]) correct++;
            }
        }
        let acc = correct / total

        return isFinite(acc) ? acc : 1;
    }

    // Update funcs, must be added to callback list
    updateTypedTextAccuracy() {
        if (this.ready) {
            this.accuracyStats.total += this.typedText.length;
            let userPrevLine = this.typedLines[this.typedLines.length - 1]


            for (let i = 0; i < Math.max(this.prevLine.length || 0, userPrevLine.length || 0); i++) {
                if (this.prevLine[i] == userPrevLine[i]) this.accuracyStats.correct++;

            }
        }
    }

    // Callback stuff
    subscribeLine(callback) {
        this.lineCallbacks.push(callback);
    }

    subscribeChar(callback) {
        this.charCallbacks.push(callback);
    }

    subscribeNotReady(callback) {
        this.notReadyCallbacks.push(callback);
    }

    triggerLineEvent() {
        this.lineCallbacks.forEach(c => c(this))

        if (this.typedLines.length > 0)
            this.updateTypedTextAccuracy();
    }

    triggerCharEvent() {
        this.charCallbacks.forEach(c => c(this))
    }

    triggerNotReadyEvent() {
        this.notReadyCallbacks.forEach(c => c(this))
    }


}