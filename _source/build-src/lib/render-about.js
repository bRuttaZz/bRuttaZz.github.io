"use strict"
const renderers = require("./common/renderers")
const about = require("../../writings/configs/about.me.json")
const projects = require("../../writings/configs/projects.json")

function renderBio() {
    const bioString = `<div class="bio-info">
        <span>KEYY</span><b> &nbspVALL </b>
    </div>`

    let outString = ""
    for (let key in about.generalInfo) {
        outString += bioString
            .replaceAll("VALL", about.generalInfo[key])
            .replaceAll("KEYY", key.replaceAll("-", " "))
    }
    return outString
}


function renderAbout() {
    let contactKeys = ""
    let contactVals = ""
    for (let key in about.contacts) {
        contactKeys += `<div><b>${key} : </b></div>`
        contactVals += `<div> &nbsp${about.contacts[key]}</div>`
    }

    // social media rendering
    let socialMedia = ""
    for (let key in about.socialMediaList) {
        socialMedia += `<a href=${about.socialMedia[key]}>
            <span class=\"${about.socialMediaList[key]}\"></span> 
        </a>`
    }

    const contactInfo = `
        <p><center> ${about["shortInfo"]} </center></p>
        <div class="container-about">
            <div id="contact-keys" class="right">
                ${contactKeys}
            </div>
            <div id="contact-vals" class="left">
                ${contactVals}
            </div>
        </div>
        <center>
            <p class="social-media-icons">
                ${socialMedia}
            </p>
        </center>
    `
    return contactInfo;
}

function renderProjectCards() {
    return renderers.renderProjectCards(projects.projects, projects.pinned)
}

module.exports = {
    renderAbout, 
    renderBio, 
    renderProjectCards
}