import React, { useEffect, createContext, useContext, useState } from "react";
import Message from "../../components/Chat/Message";
import Input from "../../components/Chat/Input";
import "./Chat.scss";
import { auth, db } from "../../config/firebase";
import firebase from "firebase";


// cap nhat lai file Message
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { AppContext, AppContextType } from "../../context/AppProvider";
function Chat() {
  const { currentUser } = useContext(AuthContext) as AuthContextType;
const { selectedRoomId, members } = useContext(AppContext) as AppContextType;

/*
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
  */
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
            <Message roomId={selectedRoomId} />
            <Input  />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chat;
