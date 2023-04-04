
const GET_FORM_URL = 'https://28.javascript.pages.academy/kekstagram/data';
const SEND_FORM_URL = 'https://28.javascript.pages.academy/kekstagra';

const getData = (onSuccess, onError) => {
  fetch(GET_FORM_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // onError();
        throw new Error();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (data, onSuccess, closePopup, onError) => {
  fetch(SEND_FORM_URL, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        closePopup();
      } else {
        throw new Error();
      }
    })
    .catch(() => onError());
};

export {
  sendData,
  getData
};
