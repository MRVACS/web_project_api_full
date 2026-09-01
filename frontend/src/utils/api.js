export const BASE_URL = "http://localhost:3000";

class Api {
  constructor({ baseUrl, header }) {
    this._baseUrl = baseUrl;
    this._header = header;
  }
  setToken(token) {
    /* console.log("🔑 TOKEN:", token); */
    this._header["Authorization"] = "Bearer " + token;
    /* console.log("📦 HEADERS:", this._header); */
  }
  getCards() {
    return fetch(`${this._baseUrl}/cards/`, { headers: this._header })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
        console.log(`Error: ${err}`);
      });
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._header,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
        console.log(`Error: ${err}`);
      });
  }
  patchProfile(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then((data) => {
      return data.json();
    });
    /*      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
        console.log(`Error: ${err}`);
      }); */
  }
  /*  postCard(card) {
    console.log("🃏 postCard llamado:", card);
    console.log("🌐 URL:", `${this._baseUrl}/cards/`);
    console.log("🔐 Headers:", this._header);
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((data) => {
      console.log("📡 RESPUESTA POST:", res.status, res.statusText);
      return data.json();
    });
  } */
  postCard(card) {
    console.log("🃏 postCard llamado:", card);
    console.log("🌐 URL:", `${this._baseUrl}/cards/`);
    console.log("🔐 Headers:", this._header);

    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then((res) => {
        console.log("📡 RESPUESTA POST:", res.status, res.statusText);

        return res.json().then((data) => ({
          status: res.status,
          data,
        }));
      })
      .then(({ status, data }) => {
        console.log("📦 RESPUESTA DEL BACKEND:", data);

        if (status >= 400) {
          throw new Error(JSON.stringify(data));
        }

        return data;
      });
  }
  patchCard(targetCardId, like) {
    return fetch(`${this._baseUrl}/cards/${targetCardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._header,
    }).then((data) => {
      return data.json();
    });
    /* return fetch(`${this._baseUrl}/cards/${targetCardId}/likes`, {
      method: "PUT",
      headers: this._header,
      body: JSON.stringify({
        isLiked: value,
      }),
    }); */
  }
  patchProfilePicture(source) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify(source),
    }).then((data) => {
      return data.json();
    });
  }
  deleteCard(targetCardId) {
    return fetch(`${this._baseUrl}/cards/${targetCardId}`, {
      method: "DELETE",
      headers: this._header,
    });
  }
}

const newApi = new Api({
  /* baseUrl: "https://around-api.es.tripleten-services.com/v1", */
  baseUrl: "http://localhost:3000",
  header: {
    "Content-Type": "application/json",
  },
});

export default newApi;
