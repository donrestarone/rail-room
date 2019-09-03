import {getApiRoot} from '../Constants/Api'
export const pingApi = () => {
  return new Promise((resolve, reject) => {
    let endpoint = `${getApiRoot()}/api/v1/status`;
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