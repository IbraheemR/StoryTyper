class Story {
    constructor(name, author, parts_url) {
        this.name = name;
        this.author = author;
        this.parts_url = parts_url;

        this.parts = [];
    }

    load() {
        if (!this.ready) {
            return fetch(this.parts_url)
                .then(data => data.json())
                .then(json => { this.parts = json })
        } else {
            return Promise.resolve()
        }
    }

    get ready() {
        return this.parts.length > 0;
    }
}

export default [
    new Story(
        "Othello, the Moore of Venice",
        "William Shakespeare",
        "/stories/othello.json"
    )
]