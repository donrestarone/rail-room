import {getApiRoot} from '../Constants/Api'

export const createMessage = (roomId, messageBody, name) => {
  return new Promise((resolve, reject) => {
    let endpoint = `${getApiRoot()}/api/v1/rooms/${roomId}/messages`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        message_body: messageBody,
        sender_name: name
      })
    })
      .then(e => {
        if (e.ok) {
          // console.log(e)
          resolve(e);
        } else {
          // console.log(e)
          reject(e);
        }
      })
      .catch(e => console.log("error::", e));
  });
};