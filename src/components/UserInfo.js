export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // Get user profile to populate form
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }
  // Edit user profile with form data
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
