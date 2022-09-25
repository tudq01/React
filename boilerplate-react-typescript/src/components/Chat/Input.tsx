import React, { useEffect, useState, useContext } from "react";
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile, BsCardImage } from "react-icons/bs";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { AuthContext, AuthContextType } from "../../context/AuthContext";

import firebase from "firebase";
import { db } from "../../config/firebase";
import { v4 as uuidv4 } from "uuid";
interface Props {
  roomId: string;
}
function Input(props: Props) {
  // chosenEmoji.emoji
  // useEffect when chosen emoji change
  const [chosenEmoji, setChosenEmoji] = useState<EmojiClickData>();
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const handleSend = async () => {
    console.log("Send");

    db.collection("messages").add({
      text: text,
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      roomId: props.roomId,
      // roomId: selectedRoom.id,  can them roomId
      displayName: `Guest${currentUser.uid}`,
    });

    setText("");
  };

  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
    console.log("Hi");
  };

  const handleEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    setChosenEmoji(emojiObject);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (typeof chosenEmoji != "undefined") {
      setText(text + chosenEmoji?.emoji);
    }
  }, [chosenEmoji]);

  return (
    <>
      <div className="chat-container">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Nhap tin nhan"
          className="chat-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <BsEmojiSmile
          style={{
            height: "30px",
            fontSize: "1.5rem",
            margin: "10px 12px 0px 0px",
            color: "grey",
          }}
          onClick={handleShowEmoji}
        />
        <BsCardImage
          style={{
            height: "30px",
            fontSize: "1.5rem",
            margin: "10px 12px 0px 0px",
            color: "grey",
          }}
          onClick={handleSend}
        />
        <FiSend
          style={{
            height: "30px",
            fontSize: "1.5rem",
            margin: "10px 16px 0px 0px",
            color: "grey",
          }}
          onClick={handleSend}
        />

        <div className={`emoji-list ${showEmoji ? "show" : "hidden"}" `}>
          {showEmoji && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
    </>
  );
}

export default Input;

/*   `` : expand template string
 `emoji-list ${showEmoji ? "show" : "hidden"}" `
      */
