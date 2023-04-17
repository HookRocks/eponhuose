export default function sendPost(method, url, body) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      mode: 'cors',
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res) {
          resolve(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
