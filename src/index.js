const fs = require("fs");
const ejs = require("ejs");
const { renderBio, renderAbout, renderProjectCards } = require("./render.js");


function build(inFile="./src/template.ejs", outFile="index.html") {
    try {
        console.log("[build] reading template..")
        const dat = fs.readFileSync(inFile, { encoding: "utf-8" });
        console.log("[build] rendering html..")
        const html = ejs.render(dat, {
            bioDat: renderBio(),
            contactPortion: renderAbout(),
            projectCards: renderProjectCards(),
        })
        console.log("[build] dumping out..")
        fs.writeFileSync(outFile, html, { encoding: "utf-8" })
        console.log("[build] build complete!")
        process.exit(0)
    } catch (e) {
        console.error("[ERROR][build] error renderig html", e)
        process.exit(1);
    }
}

module.exports = { build }