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
        "Orthello, the Moore of Venice",
        "William Shakespeare",
        "/stories/orthello.json"
    )
    // {
    //     name: "Orthello, the Moore of Venice",
    //     author: "William Shakespeare",
    //     parts_url: "/stories/orthello.json"
    // },
    // {
    //     name: "A Study in Scarlet",
    //     author: "Sir Arthur Conan Doyle",
    //     parts: [
    //         {
    //             name: "Mr. Sherlock Holmes",
    //             content: [
    //                 "In the year 1878 I took my degree of Doctor of Medicine of the University of London,",
    //                 "and proceeded to Netley to go through the course prescribed for surgeons in the army.",
    //                 "Having completed my studies there,",
    //                 "I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon.",
    //                 "The regiment was stationed in India at the time,",
    //                 "and before I could join it,",
    //                 "the second Afghan war had broken out.",
    //                 "On landing at Bombay,",
    //                 "I learned that my corps had advanced through the passes,",
    //                 "and was already deep in the enemy's country.",
    //                 "I followed, however, with many other officers who were in the same situation as myself,",
    //                 "and succeeded in reaching Candahar in safety,",
    //                 "where I found my regiment,",
    //                 "and at once entered upon my new duties."
    //             ]
    //         }
    //     ]
    // }
]