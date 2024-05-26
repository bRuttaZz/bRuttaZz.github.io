"use strict"
const about = require("../../_writings/configs/about.me.json");
const projects = require("../../_writings/configs/projects.json");

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
    const cardTemplate = `<div class="project-card">
        <div class="vertical-align-center">
            <center>
                <a href="PROJECT_LINK">
                    <img width="130px" src="IMAGE_LINK">
                </a>
                <br><b>PROJECT_NAME</b>
            </center>
        </div>
        <div class="vertical-align-center">
            <p>SHORT_INFO</p>
            <p>
                <a href="SOURCE_LINK">
                    <span class="source-link">source</span>
                </a>
                <span class="license">license : LICENSE_NAME</span>
            </p>
        </div>
    </div>`

    let cards = ""
    for (let obj of projects.pinned) {
        const pro = projects.projects[obj]
        cards += cardTemplate.replaceAll("PROJECT_NAME", pro.name)
            .replaceAll("PROJECT_LINK", pro.link)
            .replaceAll("IMAGE_LINK", pro.coverimage)
            .replaceAll("SHORT_INFO", pro.shortInfo)
            .replaceAll("SOURCE_LINK", pro.source)
            .replaceAll("LICENSE_NAME", pro.license)
    }
    return cards;
}

module.exports = {
    renderAbout, 
    renderBio, 
    renderProjectCards
}