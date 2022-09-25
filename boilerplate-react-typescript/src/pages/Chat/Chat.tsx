import React, { useEffect, createContext, useContext, useState } from "react";
import Message from "../../components/Chat/Message";
import Input from "../../components/Chat/Input";
import "./Chat.scss";
import { auth, db } from "../../config/firebase";

import { v4 as uuidv4 } from "uuid";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
function Chat() {
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    setRoomId(uuidv4());
  }, []);
  const [roomId, setRoomId] = useState("");
  useEffect(() => {
    console.log(currentUser.uid);
    const getRooms = async (roomId: string) => {
      db.collection("rooms").add({
        ownerId: currentUser.uid,
        members: ["Xh40FYw96kOVL6TMXwnuZSarHMz1"], // can assing member id la sale
        roomId: roomId,
      });
    };
    roomId && getRooms(roomId);
  }, [roomId]);

  return (
    <section className="chat">
      <div className="container">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-img">
              <img
                src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
                alt=""
              />
            </div>
            <span className="chat-name">PipGo</span>
          </div>
          <div className="chat-content">
            <Message roomId={roomId} />
            <Input roomId={roomId} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chat;
