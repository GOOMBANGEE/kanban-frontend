import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useTokenStore } from "./token.store.ts";

type SocketStore = {
  socket: Socket | null;
  initializeSocket: () => void;
  joinBoard: (boardId: string) => void;
  leaveBoard: (boardId: string) => void;
};

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  initializeSocket: () => {
    const { tokenState } = useTokenStore.getState();

    if (get().socket) {
      console.warn("WebSocket already initialized.");
      return;
    }

    const socket = io("http://localhost:3000/ws", {
      extraHeaders: {
        authorization: tokenState.accessToken ?? "",
      },
    });

    socket.on("receiveMessage", (data) => {
      console.log("WebSocket receiveMessage:", data);
    });

    set({ socket });
  },

  joinBoard: (boardId: string) => {
    const socket = get().socket as Socket;

    if (!socket) {
      console.warn("Socket is not initialized.");
      return;
    }
    socket.emit("joinBoard", boardId, (response: string) => {
      console.log(`Joined board ${boardId}:`, response);
    });
  },

  leaveBoard: (boardId: string) => {
    const socket = get().socket as Socket;

    socket.emit("leaveBoard", boardId, (response: string) => {
      console.log(`Leaved board ${boardId}:`, response);
    });
  },
}));
