export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = process.env.REACT_APP_API_KEY_3 || "";

export const API_KEY_4 = process.env.REACT_APP_API_KEY_4 || "";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        }

        throw response;
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        })
      });

  });
};

