import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

export const initSocket = (token: string) => {
  if (!socket) {
    socket = io({
      path: "/api/socket",
      auth: { token },
    })
  }
  return socket
}
