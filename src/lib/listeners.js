export function avatarFliper() {
    const avatar = document.querySelector(".avatar")
    const realtar = document.querySelector(".realtar")
    document.querySelector(".profile-img").addEventListener("click", ()=>{
        if (realtar.classList.contains("d-none")) {
            realtar.classList.remove("d-none")
            avatar.classList.add("d-none")
        } else {
            realtar.classList.add("d-none")
            avatar.classList.remove("d-none")
        }
    });
}