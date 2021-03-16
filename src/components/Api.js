export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch(err => console.log(err));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch(err => console.log(err));
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch(err => console.log(err));
  }

  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/` + cardId, {
      headers: this.headers,
      method: 'DELETE',
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch(err => console.log(err));
  }

  editUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch(err => console.log(err));
  }

  editUserAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar,
      }),
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch(err => console.log(err));
  }

  changeCardLikeStatus({ cardId, cardLiked }) {
    return fetch(`${this.baseUrl}/cards/likes/` + cardId, {
      headers: this.headers,
      method: cardLiked ? 'PUT' : 'DELETE',
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch(err => console.log(err));
  }
}
