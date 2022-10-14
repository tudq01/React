import React, { useState, createContext, useEffect } from "react";
import useFirestore from "../hooks/useFirebase";
import { AuthContext, AuthContextType } from "./AuthContext";
import { WhereFilterOp } from "@firebase/firestore";

export type AppContextType = {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  members: { [key: string]: any }[];
  selectedRoom: Room;
  selectedRoomId: string;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string>>;
 
  clearState: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

export interface Room {
  [key: string]: any;
}

interface Condition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: string | { id: string }[] | undefined;
}

export default function AppProvider({ children }: Props) {
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const { currentUser } = React.useContext(AuthContext) as AuthContextType;
  
  // check room co chua ten nay trong phong
  const roomsCondition = React.useMemo<Condition>(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: currentUser.uid,
    };
  }, [currentUser.uid]);
  // console.log(currentUser.uid);
  const [rooms, setRooms] = useState<Room[]>([]);
  
  // console.log(rooms);
  // console.log("Selected id:"+selectedRoomId);

  const selectedRoom = React.useMemo<Room>(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId],
  );

  const usersCondition = React.useMemo<Condition>(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore(
    "users",
    usersCondition,
    { type: "asc", size: 50 }
  
  );
  console.log("Members:" + JSON.stringify(members));
  const clearState = () => {
    setSelectedRoomId("");
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
        clearState,
        setRooms,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
