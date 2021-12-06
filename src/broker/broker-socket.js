import io from 'socket.io-client';
let socket;
export const initiateSocket = () => {
    socket = io('http://localhost:8000');
    console.log(`Connecting socket...`);
}
export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
}

export const sendMessage = (ev, message) => {
    if (socket) {
        console.log(message)
        socket.emit(ev, {message});
        console.log(socket.id);
    }
}
