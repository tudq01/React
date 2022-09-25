import { createContext,useReducer } from "react";


type Props = {
  children?: React.ReactNode;
};
const CHANGE_USER = "CHANGE_USER";

import User from "firebase";

interface Chat {
  roomId: string;
  user?: User.User;
}
interface ChatType {
  type: typeof CHANGE_USER;
  payload: Chat;
}

export type ChatContextType = {
  data: Chat;
  dispatch: React.Dispatch<ChatType>;
};

export const ChatContext = createContext<ChatContextType | null>(null);

// change user
// con sale thi change roomId
export const ChatContextProvider: React.FC<Props> = ({ children }) => {
  const INITIAL_STATE = {
    roomId: "1",
  };

  const chatReducer = (state: Chat, action: ChatType) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload.user,
          roomId: action.payload.roomId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
