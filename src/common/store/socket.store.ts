import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useTokenStore } from "./token.store.ts";
import { useEnvStore } from "./env.store.ts";
import { ReceiveMessage } from "../common.type.ts";

type SocketStore = {
  socket: Socket | null;
  receiveMessage: ReceiveMessage | undefined;
  resetReceiveMessage: () => void;
  initializeSocket: () => void;
  joinBoard: (boardId: string) => void;
  leaveBoard: (boardId: string) => void;
};

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  receiveMessage: undefined,
  resetReceiveMessage: () => set({ receiveMessage: undefined }),

  initializeSocket: () => {
    const { tokenState } = useTokenStore.getState();
    const { envState } = useEnvStore.getState();
    const websocketUrl = envState.websocketUrl;

    if (get().socket) {
      console.warn("WebSocket already initialized.");
      return;
    }

    const socket = io(websocketUrl, {
      extraHeaders: {
        authorization: tokenState.accessToken ?? "",
      },
    });

    socket.on("receiveMessage", (data: ReceiveMessage) => {
      set({ receiveMessage: data });
    });

    set({ socket });
  },

  joinBoard: (boardId: string) => {
    const socket = get().socket as Socket;

    if (!socket) {
      console.warn("Socket is not initialized.");
      return;
    }
    socket.emit("joinBoard", boardId);
  },

  leaveBoard: (boardId: string) => {
    const socket = get().socket as Socket;
    socket.emit("leaveBoard", boardId);
  },
}));
