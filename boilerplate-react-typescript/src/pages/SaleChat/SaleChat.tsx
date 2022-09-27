import React, { useEffect, useContext, useState } from "react";
import SaleMessage from "../../components/Chat/SaleMessage";
import Input from "../../components/Chat/Input";
import SideBar from "../../components/SaleChat/SideBar";
import { db } from "../../config/firebase";
import "./SaleChat.scss";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { AppContext, AppContextType } from "../../context/AppProvider";
import useFirebase, { Condition } from "../../hooks/useFirebase";

function SaleChat() {
  
  const { selectedRoomId,selectedRoom, members } = useContext(AppContext) as AppContextType;
  
  
  /*
  useEffect(() => {
    const getRooms = async () => {
      const roomRef = await db.collection("rooms").add({
        ownerId: currentUser.uid,
        members: ["Xh40FYw96kOVL6TMXwnuZSarHMz1"], // can assing member id la sale
      });

      setRoomId(roomRef.id);
    };
    getRooms();
  }, []);
*/
    

  return (
    <section className="chat">
      <div className="container">
        <SideBar   />
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-img">
              <img
                src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
                alt=""
              />
            </div>
            <span className="chat-name">{selectedRoom.ownerId}</span>
          </div>
          <div className="chat-content">
            <SaleMessage room={selectedRoom} />
            <Input roomId={selectedRoomId} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SaleChat;
