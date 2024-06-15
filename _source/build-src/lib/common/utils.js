const { exec } = require("child_process")

/**
 * Get last update time of a file from git. Requires the file to be committed to git
 * @param {String} fileName - fullpath of file
 * @returns {Promise<String>}
 */
function getGitLastUpdateTime(fileName) {
    return new Promise((res) => {
        exec(`git log -1 --format="%ad" -- ${fileName}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Node Error getting last update time info : ${fileName} :  ${err}`)
                return res("")
            }
            if (stderr) {
                console.error(`Command Error getting last update time info : ${fileName} : ${stderr}`)
                return res("")
            }
            if (stdout) {
                const splits = stdout.split(" ")
                stdout = `${splits[2]} ${splits[1]} ${splits[4]}`
            }
            return res(stdout)
        })
    })
}

module.exports = {
    getGitLastUpdateTime
}
