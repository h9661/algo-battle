import { create } from "zustand";
import { UserInfo } from "./useRoom";

export interface GameRoom {
  roomId: string;
  roomName: string;
  capacity: number;
  userCount: number;
  state: "playing" | "waiting";
}

export interface LobbyState {
  userList: UserInfo[];
  gameRoomList: GameRoom[];
}

interface LobbyAction {
  setLobby: (lobbyInfo: LobbyState) => void;
  setAddLobbyUser: (userName: string) => void;
  setRemoveLobbyUser: (userName: string) => void;
  setAddGameRoom: (gameRoom: GameRoom) => void;
  setRemoveGameRoom: (roomId: string) => void;
  setRoomUserCount: (roomId: string, userCount: number) => void;
}

interface LobbyStore extends LobbyState, LobbyAction {}

export const useLobbyStore = create<LobbyStore>(set => ({
  userList: [],
  gameRoomList: [],
  setLobby: lobbyInfo => set(state => lobbyInfo),
  setAddLobbyUser: userName => set(state => ({ userList: state.userList.concat({ userName }) })),
  setRemoveLobbyUser: exitedUserName =>
    set(state => ({ userList: state.userList.filter(({ userName }) => userName !== exitedUserName) })),
  setAddGameRoom: gameRoom => set(state => ({ gameRoomList: state.gameRoomList.concat(gameRoom) })),
  setRemoveGameRoom: targetRoomId =>
    set(state => ({ gameRoomList: state.gameRoomList.filter(({ roomId }) => roomId !== targetRoomId) })),
  setRoomUserCount: (roomId, userCount) =>
    set(state => ({
      gameRoomList: state.gameRoomList.map(gameRoom =>
        gameRoom.roomId === roomId ? { ...gameRoom, userCount } : gameRoom,
      ),
    })),
}));
