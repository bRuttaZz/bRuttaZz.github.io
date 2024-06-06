const fs = require("fs");
const ejs = require("ejs");
const { TEMPLATE_DIR } = require("../settings")

/**
 * Render html string from file
 * @param {String} infile - template file path
 * @param {Object} data - data object to be passed 
 * @param {Array} templateDirs - array of paths containing templates/partials 
 */
function renderFromFile(infile, data={}, templateDirs=[TEMPLATE_DIR]) {
    const dat = fs.readFileSync(infile, { encoding: "utf-8" });
    return ejs.render(dat, data, {
        views: templateDirs
    })
}


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
    templateDirs = [TEMPLATE_DIR]
) {
    try {
        console.log(`[build](${outFile}) reading template..`)
        html = renderFromFile(inFile, data, templateDirs)
        html = ejs.render(html, { rmWhitespace: true })
        console.log(`[build](${outFile}) dumping out..`)
        fs.writeFileSync(outFile, html, { encoding: "utf-8" })
        console.log(`[build](${outFile}) build complete!`)
    } catch (e) {
        console.error(`[ERROR][build](${outFile}) error renderig html`, e)
        process.exit(1);
    }
}

module.exports = { build, renderFromFile }