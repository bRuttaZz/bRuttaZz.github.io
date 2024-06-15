/**
 * bind avatar switch option
 */
export function bindAvatarSwitch() {
    const avatar = document.createElement("img")
    avatar.classList.add("avatar")
    avatar.src = "./assets/images/avatar.jpg"
    
    const profileImageContainer = document.querySelector(".profile-img")
    const realtar = document.querySelector(".realtar")
    let avatarFlag = true;
    profileImageContainer.addEventListener("click", () => {
        if (avatarFlag) {
            profileImageContainer.removeChild(realtar);
            profileImageContainer.append(avatar);
        } else {
            const currentChild = document.querySelector(".avatar")
            profileImageContainer.removeChild(currentChild);
            profileImageContainer.append(realtar);
        }
        avatarFlag = !avatarFlag
    });    
}

