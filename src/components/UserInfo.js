export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // Get user profile to populate form
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }
  // Edit user profile with form data
  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
