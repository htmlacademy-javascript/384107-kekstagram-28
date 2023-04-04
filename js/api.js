
const GET_FORM_URL = 'https://28.javascript.pages.academy/kekstagram/data';
const SEND_FORM_URL = 'https://28.javascript.pages.academy/kekstagram';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (url, method = Method.GET, body = null) =>
  fetch(url, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error();
    });

const getData = () => load(GET_FORM_URL);

const sendData = (body) => load(SEND_FORM_URL, Method.POST, body);

export {
  sendData,
  getData
};
