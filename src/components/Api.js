class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch((res) => {console.log(res)})
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
    .then (res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '3a1a4a90-7af6-46c1-8e15-2024cad1ccce',
    'Content-Type': 'application/json'
  }
});