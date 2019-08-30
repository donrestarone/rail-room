export const getApiRoot = () => {
  const localRoot = "http://localhost:3000";
  const ngrok = "http://d72ed59f.ngrok.io"
  return ngrok;
};

export const getApiWebsocketRoot = (roomId) => {
  const root = `ws://${getApiRoot().split('http://')[1]}/api/v1/rooms/${roomId}/cable`;
  return root
}