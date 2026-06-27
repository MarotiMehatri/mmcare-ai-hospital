import { io } from "socket.io-client";
const socket = io("http://10.201.71.80:5000");

export default socket;
