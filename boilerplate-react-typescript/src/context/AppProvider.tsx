import React, { useState, createContext, useEffect } from "react";
import useFirestore from "../hooks/useFirebase";
import { AuthContext, AuthContextType } from "./AuthContext";
import { WhereFilterOp } from "@firebase/firestore";

export type AppContextType = {
  rooms: Room[];
  members: {[key:string]:any}[];
  selectedRoom: Room;
  selectedRoomId: string;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string>>;
  clearState: () => void;
  loadMore:boolean,
  setLoadMore:React.Dispatch<React.SetStateAction<boolean>>
};

export const AppContext = createContext<AppContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};



export interface Room {
 [key:string]:any;
}


interface Condition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: string |{id:string}[] | undefined;
}

export default function AppProvider({ children }: Props) {
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const { currentUser } = React.useContext(AuthContext) as AuthContextType;
  const [loadMore,setLoadMore] = useState(false)
  // check room co chua ten nay trong phong
  const roomsCondition = React.useMemo<Condition>(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: currentUser.uid,
    };
  }, [currentUser.uid]);
  console.log(currentUser.uid);
  const rooms = useFirestore("rooms", roomsCondition,{type:"desc",size:1},loadMore);
   // console.log(rooms);
   // console.log("Selected id:"+selectedRoomId);
  useEffect(()=>{
    if(loadMore== true){
setLoadMore(false);}
  },[loadMore])
  const selectedRoom = React.useMemo<Room>(
    () => rooms.find((room) => room.id === selectedRoomId)||{},
    [rooms,selectedRoomId],
  );

  

  const usersCondition = React.useMemo<Condition>(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore("users", usersCondition,{type:"asc",size:50},loadMore);
  console.log("Members:"+JSON.stringify(members));
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
        loadMore,
        setLoadMore
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
