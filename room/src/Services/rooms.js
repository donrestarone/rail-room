import {getApiRoot} from '../Constants/Api'

export const getRooms = () => {
  return new Promise((resolve, reject) => {
    let endpoint = `${getApiRoot()}/api/v1/rooms`;
    fetch(endpoint, {
      method: "GET",
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

export const createRoom = (name) => {
  return new Promise((resolve, reject) => {
    let endpoint = `${getApiRoot()}/api/v1/rooms`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        room_name: name
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

export const showRoom = (roomId) => {
  return new Promise((resolve, reject) => {
    let endpoint = `${getApiRoot()}/api/v1/rooms/${roomId}`;
    fetch(endpoint, {
      method: "GET",
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