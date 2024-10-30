import { io } from 'socket.io-client';


export const socketInit=(token)=>{
  return new io('http://localhost:7000',{
    query:{  accessToken: token}
  });
}

export function sendMessage(username, message) {
  //socket.send(JSON.stringify({ type: 'send-message', username, message }));
}

//export default socket;
