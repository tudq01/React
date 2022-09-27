import React, { useEffect, createContext, useContext, useState } from "react";
import Message from "../../components/Chat/Message";
import Input from "../../components/Chat/Input";
import "./Chat.scss";
import { auth, db } from "../../config/firebase";
import firebase from "firebase";


import { AuthContext, AuthContextType } from "../../context/AuthContext";
function Chat() {
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const [roomId, setRoomId] = useState("");
  useEffect(() => {
    const getRooms = async () => {
      const roomRef = await db.collection("rooms").add({
        ownerId: currentUser.uid,
        members: ["A6tH7BmMLmYsgEyFMPlB26pzaJ13", currentUser.uid], // can assing member id la sale
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
        
      setRoomId(roomRef.id);
    };
    getRooms();
    console.log("Im render")
  }, []);

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
