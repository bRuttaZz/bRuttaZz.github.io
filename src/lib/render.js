"use strict"
import about from "../../facts/about.me.json";
import projects from "../../facts/projects.json";

export function renderBio() {
    const bioString = `<div class="bio-info">
        <span>KEYY</span><b> VALL </b>
    </div>`
    const bioPart = document.getElementById("bio-text");

    for (let key in about.generalInfo) {
        bioPart.innerHTML += bioString
            .replaceAll("VALL", about.generalInfo[key])
            .replaceAll("KEYY", key.replaceAll("-", " "))
    }
}

export function renderAbout() {
    const shortinfo = document.getElementById("shortinfo")
    shortinfo.innerHTML = `<center> ${about["shortInfo"]} </center>`

    const contactKeys = document.getElementById("contact-keys")
    const contactVals = document.getElementById("contact-vals")

    for (let key in about.contacts) {
        contactKeys.innerHTML += `<div><b>${key} : </b></div>`
        contactVals.innerHTML += `<div> &nbsp${about.contacts[key]}</div>`
    }

    const socialMedia = document.getElementById("social-media")
    for (let key in about.socialMediaList) {
        socialMedia.innerHTML += `<a href=${about.socialMedia[key]}>
            <img src=\"${about.socialMediaList[key]}\" width=20px> 
        </a>`
    }
}

export function renderProjectCards() {
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

    for (let obj of projects.projects) {
        document.querySelector(".project-cards").innerHTML += cardTemplate.replaceAll("PROJECT_NAME", obj.name)
            .replaceAll("PROJECT_LINK", obj.link)
            .replaceAll("IMAGE_LINK", obj.coverimage)
            .replaceAll("SHORT_INFO", obj.shortInfo)
            .replaceAll("SOURCE_LINK", obj.source)
            .replaceAll("LICENSE_NAME", obj.license)
    }
}