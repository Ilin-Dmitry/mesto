export class UserInfo {
  constructor ({userNameSelector, userInfoSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo () {
    const userData = {};
    userData.name = this._userName.textContent;
    userData.info = this._userInfo.textContent;

    return userData;
  }

  setUserInfo ({newUserName, newUserInfo}) {
    this._userName.textContent = newUserName;
    this._userInfo.textContent = newUserInfo;
  }
}