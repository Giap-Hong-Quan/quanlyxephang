import {Server} from "socket.io"

export let io;

export const initSocket = (server)=>{
        io=new Server(server,{
            cors:{
                origin:"*"
            }
        })
        io.on("connection",(Socket)=>{
            console.log("Client đã kết nối",Socket.id);
            Socket.on("disconnect",()=>{
                console.log("Client đã ngừng kết nối",Socket.id)
            })
        })
}