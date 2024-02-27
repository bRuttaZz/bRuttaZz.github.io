"use strict"
const about = require("../facts/about.me.json");
const projects = require("../facts/projects.json");

function renderBio() {
    const bioString = `<div class="bio-info">
        <span>KEYY</span><b> VALL </b>
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
            <img src=\"${about.socialMediaList[key]}\" width=20px> 
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
            <p>
                ${socialMedia}
            </p>
        </center>
    `
    return contactInfo;
}

function renderProjectCards() {
    const cardTemplate = `<div class="project-card">
        <div>
            <center>
                <a href="PROJECT_LINK">
                    <img width="130px" src="IMAGE_LINK">
                </a>
                <br><b>PROJECT_NAME</b>
            </center>
        </div>
        <div>
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
    for (let obj of projects.projects) {
        cards += cardTemplate.replaceAll("PROJECT_NAME", obj.name)
            .replaceAll("PROJECT_LINK", obj.link)
            .replaceAll("IMAGE_LINK", obj.coverimage)
            .replaceAll("SHORT_INFO", obj.shortInfo)
            .replaceAll("SOURCE_LINK", obj.source)
            .replaceAll("LICENSE_NAME", obj.license)
    }
    return cards;
}

module.exports = {
    renderAbout, 
    renderBio, 
    renderProjectCards
}