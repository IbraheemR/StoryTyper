import { writable, derived } from "svelte/store";

import StatsController from "./StatsController";

export default class Controller {

    constructor() {


        // Stats
        this.stats = new StatsController();

        // Callback stuff
        this.notReadyCallbacks = [];
        this.resetCallbacks = [];
        this.lineCallbacks = [];
        this.charCallbacks = [];
        this.finishCallbacks = [];

        // Reset story 
        this.reset()

        // DEBUG
        window.c = this;
    }

    reset() {
        this.story = undefined;
        this.partNum = 0;

        this.typedText = "";
        this.typedLines = [];

        this.paused = false;


        this.triggerResetEvent()
    }

    setStory(story, part = 0) {

        this.reset()

        this.stats.reset();

        this.story = story
        this.partNum = part




        fetch(story.parts_url)
            .then(data => data.json())
            .then(json => {
                this.story.parts = json;
                this.triggerLineEvent()
            })
    }

    storyPartString() {
        return this.story ? `${this.story.name} : ${this.partName}` : ""
    }

    updateTypedText(newText) {
        this.typedText = newText;
        this.triggerCharEvent()
    }


    submit(line) {
        this.typedLines[this.lineNum] = line;
        this.triggerLineEvent();

        if (this.lineNum == this.currentPart.content.length) {
            this.triggerFinishEvent();
        }
    }

    // Getters

    get ready() {
        return this.story && this.story.ready && this.currentLine
    }

    get typedCommand() {
        return this.typedText.startsWith(":")
    }

    get currentPart() {
        return this.story && this.story.ready && this.story.parts[this.partNum] || { content: [], name: "" }
    }

    get partName() {
        return this.story && this.story.ready && this.currentPart.name;
    }

    get lineNum() {
        return this.story && this.story.ready && this.typedLines.length
    }

    get prevLine() {
        return this.story && this.story.ready && this.currentPart.content[this.lineNum - 1] || "";
    }

    get currentLine() {
        return this.story && this.story.ready && this.currentPart.content[this.lineNum] || "";
    }

    get nextLine() {
        return this.story && this.story.ready && this.currentPart.content[this.lineNum + 1] || "";
    }

    pause(state = true) {
        this.paused = state

        if (this.paused) {
            this.stats.pauseWPMTimer();
        } else {
            this.stats.unpauseWPMTimer();
        }
    }

    unpause() {
        this.pause(false)
    }

    // Command processing

    processCommand(command) {
        let r = command.match(/:jump ([0-9]+)/i);
        if (r && r[1]) {
            let l = r[1];

            if (l < this.currentPart.content.length && l > this.typedLines.length + 1) {
                this.typedLines.push(...Array(Math.max(Number(l) - this.typedLines.length - 1, 0)))
                this.triggerLineEvent()
            }

        }
    }

    // Callback stuff
    onNotReady(callback) {
        this.notReadyCallbacks.push(callback);
    }

    onReset(callback) {
        this.resetCallbacks.push(callback);
    }

    onLineTyped(callback) {
        this.lineCallbacks.push(callback);
    }

    onCharTyped(callback) {
        this.charCallbacks.push(callback);
    }



    onFinish(callback) {
        this.finishCallbacks.push(callback);
    }

    triggerNotReadyEvent() {
        this.notReadyCallbacks.forEach(c => c(this))
    }

    triggerResetEvent() {
        this.resetCallbacks.forEach(c => c(this))
    }

    triggerLineEvent() {
        this.lineCallbacks.forEach(c => c(this))

        // Update stats

        if (!this.typedCommand) {
            this.stats.calculateAccuracy(this.typedText, this.prevLine, true);
            this.stats.calculateWPM(this.typedText, this.prevLine, true)
        }
    }

    triggerCharEvent() {
        this.charCallbacks.forEach(c => c(this))

        if (!this.typedCommand) {
            this.unpause()

            if (this.typedText.length == 1) {
                this.stats.restartWPMTimer();
            }
        }


    }


    triggerFinishEvent() {
        this.finishCallbacks.forEach(c => c(this))
        this.pause()
    }
}