import { writable, derived } from "svelte/store";

import StatsController from "./StatsController";

export default class Controller {

    constructor() {

        // Story
        this.story = undefined;
        this.partNum = 0;

        this.typedText = "";
        this.typedLines = [];

        // Stats
        this.stats = new StatsController();

        // Callback stuff
        this.lineCallbacks = [];
        this.charCallbacks = [];
        this.notReadyCallbacks = [];


        this._paused = false;

        // DEBUG
        window.c = this;
    }

    setStory(story, part = 0) {

        this.story = story
        this.partNum = part

        this.typedText = "";
        this.typedLines = [];

        this.stats.reset();


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
        this.typedLines.push(line);
        this.triggerLineEvent();
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

    get paused() {
        return this._paused;
    }

    set paused(v) {
        this._paused = v

        if (this._paused) {
            this.stats.pauseWPMTimer();
        } else {
            this.stats.unpauseWPMTimer();
        }
    }

    // Command processing

    processCommand(command) {
        let r = command.match(/:jump ([0-9]+)/i);
        if (r && r[1]) {
            let l = r[1];

            if (l < this.currentPart.content.length) {
                this.typedLines.push(...Array(Number(l)))
                this.triggerLineEvent()
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

        // Update stats

        if (!this.typedCommand) {
            this.stats.calculateAccuracy(this.typedText, this.prevLine, true);
            this.stats.calculateWPM(this.typedText, true)
        }

        console.log(this.stats.wpmData.startTime)
    }

    triggerCharEvent() {
        this.charCallbacks.forEach(c => c(this))

        if (!this.typedCommand) {
            this.paused = false;

            console.log(this.typedText)

            if (this.typedText.length == 1) {
                this.stats.restartWPMTimer();
            }
        }


    }

    triggerNotReadyEvent() {
        this.notReadyCallbacks.forEach(c => c(this))
    }


}