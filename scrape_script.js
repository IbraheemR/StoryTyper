// A small script to scrape shakespeare from shakespeare.mit.edu

let out = "";
document.querySelectorAll("body>*").forEach(el => {
    if (el.nodeName == "BLOCKQUOTE") {
        for (let c of el.children) {
            if (c.nodeName == "A") {
                out += c.innerText + "\n"
            } else if (c.nodeName == "P") {
                out += "[" + c.innerText + "]\n"
            }
        }
    } else {
        out += el.innerText + ": "
    }
})

console.log(JSON.stringify(out.split("\n").filter(x => x)))