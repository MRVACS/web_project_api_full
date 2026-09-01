export const BASE_URL = "http://localhost:3000";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res);
  });
};
export const authorize = (email, password) => {
  // Se envía una solicitud POST a /auth/local.
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // Los parámetros se envuelven en un objeto, convertido en un string
    // JSON y se envían en el cuerpo de la solicitud.
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    /*  console.log(res); */
    return res.ok ? res.json() : Promise.reject(res);
  });
};
export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Especifica un encabezado de autorización con un valor formateado
      // adecuadamente.
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res);
  });
};
