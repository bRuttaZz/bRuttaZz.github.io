const fs = require("fs");
const ejs = require("ejs");


/**
 * build html file
 * @param {String} inFile - input template file 
 * @param {String} outFile - output file path 
 * @param {Object} data - data object to be passed to the rendering function 
 * @param {Array} templateDirs - array of paths containing templates
 */
function build(
    inFile,
    outFile,
    data = {},
    templateDirs = ["./_src/templates"]
) {
    try {
        console.log(`[build](${outFile}) reading template..`)
        const dat = fs.readFileSync(inFile, { encoding: "utf-8" });
        console.log(`[build](${outFile}) rendering html..`)
        let html = ejs.render(dat, data, {
            views: templateDirs
        })
        html = ejs.render(html, { rmWhitespace: true })
        console.log(`[build](${outFile}) dumping out..`)
        fs.writeFileSync(outFile, html, { encoding: "utf-8" })
        console.log(`[build](${outFile}) build complete!`)
    } catch (e) {
        console.error(`[ERROR][build](${outFile}) error renderig html`, e)
        process.exit(1);
    }
}

module.exports = { build }