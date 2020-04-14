class Story {
    constructor(name, parts_url, author) {
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
        "Short Stories Collection",
        "/stories/short_stories.json"
    ),
    new Story(
        "Othello, the Moore of Venice",
        "/stories/othello.json",
        "William Shakespeare"
    )
]