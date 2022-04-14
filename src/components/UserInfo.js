export class UserInfo {
  constructor ({userNameSelector, userInfoSelector, profileAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo () {
    const userData = {};
    userData.name = this._userName.textContent;
    userData.info = this._userInfo.textContent;
    userData.avatar = this._profileAvatar.style.backgroundImage;

    return userData;
  }

  setUserInfo ({newUserName, newUserInfo, newUserAvatar}) {
    this._userName.textContent = newUserName;
    this._userInfo.textContent = newUserInfo;
    this._profileAvatar.style.backgroundImage = `url('${newUserAvatar}')`
  }
}