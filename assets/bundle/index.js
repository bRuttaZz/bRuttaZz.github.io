(()=>{"use strict";const e=JSON.parse('{"hK":"\\"Just another Software Enthusiast, FOSS Lover And Philanthropist!\\"","vK":{"dob":"28-10-2001","height":"not yet measured","occupation":"R&D Engineer, Pixdynamics Pvt Ltd","localization":"Kochi, Kerala","expertise":"Web Technologies, Applied AI, System Design, Containers","proficient-human-languages":"Malayalam, English","proficient-computer-languages":"Python, JS, Go, C++","areas-of-interest":"System Design, System Kernal, Computer Networking","pgp-keys":"<a href=\\"./facts/pgp.key\\" >download</a>","github":"<a href=\\"https://github.com/bruttazz\\">bRuttaZz</a>"},"M3":{"email":"agrajpdas@gmail.com","phone":"+91 9207322658","telegram":"<a href=\\"https://t.me/bruttazz57\\">@bruttazz57</a>","matrix":"<a href=\\"https://matrix.to/#/@bruttazz:matrix.org\\">@bruttazz:matrix.org</a>"},"UK":{"mastodon":"https://fosstodon.org/@bRuttaZz","github":"https://github.com/bruttazz","instagram":"https://www.instagram.com/bRuttaZz","linkedin":"https://www.linkedin.com/in/agraj-p-das-a656a423b","twitter":"https://twitter.com/bruttazz_"},"yd":{"github":"./assets/images/socialmedia/github.png","mastodon":"./assets/images/socialmedia/mastodon.png","instagram":"./assets/images/socialmedia/insta.png","linkedin":"./assets/images/socialmedia/linkedin.png","twitter":"./assets/images/socialmedia/twitter.png"}}'),t=JSON.parse('{"d":[{"name":"devC","shortInfo":"A linux command line utility to build \'python venv\' like reusable virtualenv from Dockerfile/Containerfile or directly from a container image. Virtualenv for containers!","source":"https://github.com/bruttazz/devc","license":"GPLv3","link":"https://bruttazz.github.io/devc","coverimage":"https://raw.githubusercontent.com/bRuttaZz/devc/main/assets/tad.png"},{"name":"Colbaking","shortInfo":"Nothing but an old school chrome-dino-game clone!","source":"https://github.com/bruttazz/colbaking","license":"MIT","link":"https://bruttazz.github.io/colbaking","coverimage":"https://raw.githubusercontent.com/bRuttaZz/colbaking/main/game/preview.png"}]}');window.onload=()=>{!function(){const t=document.getElementById("bio-text");for(let n in e.vK)t.innerHTML+='<div class="bio-info">\n        <span>KEYY</span><b> VALL </b>\n    </div>'.replaceAll("VALL",e.vK[n]).replaceAll("KEYY",n.replaceAll("-"," "))}(),function(){document.getElementById("shortinfo").innerHTML=`<center> ${e.hK} </center>`;const t=document.getElementById("contact-keys"),n=document.getElementById("contact-vals");for(let a in e.M3)t.innerHTML+=`<div><b>${a} : </b></div>`,n.innerHTML+=`<div> &nbsp${e.M3[a]}</div>`;const a=document.getElementById("social-media");for(let t in e.yd)a.innerHTML+=`<a href=${e.UK[t]}>\n            <img src="${e.yd[t]}" width=20px> \n        </a>`}(),function(){for(let e of t.d)document.querySelector(".project-cards").innerHTML+='<div class="project-card">\n        <div>\n            <center>\n                <a href="PROJECT_LINK">\n                    <img width="130px" src="IMAGE_LINK">\n                </a>\n                <br><b>PROJECT_NAME</b>\n            </center>\n        </div>\n        <div>\n            <p>SHORT_INFO</p>\n            <p>\n                <a href="SOURCE_LINK">\n                    <span class="source-link">source</span>\n                </a>\n                <span class="license">license : LICENSE_NAME</span>\n            </p>\n        </div>\n    </div>'.replaceAll("PROJECT_NAME",e.name).replaceAll("PROJECT_LINK",e.link).replaceAll("IMAGE_LINK",e.coverimage).replaceAll("SHORT_INFO",e.shortInfo).replaceAll("SOURCE_LINK",e.source).replaceAll("LICENSE_NAME",e.license)}(),function(){const e=document.querySelector(".avatar"),t=document.querySelector(".realtar");document.querySelector(".profile-img").addEventListener("click",(()=>{t.classList.contains("d-none")?(t.classList.remove("d-none"),e.classList.add("d-none")):(t.classList.add("d-none"),e.classList.remove("d-none"))}))}()}})();