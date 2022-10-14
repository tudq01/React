import React, { useRef, useEffect, useContext, useState ,memo} from "react";
import useFirebase from "../../hooks/useFirebase";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { WhereFilterOp } from "@firebase/firestore-types";

interface Props {
  room: Room;
}

interface Message {
  /*
  text: string;
  uid: string;
  photoURL: string;
  createdAt: string;
  roomId: string;
  displayName: string;
  id: string;*/
  [key : string]:any
}
interface Condition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: string | []|undefined;
}
import { AppContext, AppContextType, Room } from "../../context/AppProvider";

// xu ly message thay doi
function SaleMessage() {
  
  const { currentUser } = useContext(AuthContext) as AuthContextType;
   const { selectedRoomId, members } = useContext(AppContext) as AppContextType;

  const messageListRef = useRef<HTMLDivElement>(null);
  const condition = React.useMemo<Condition>(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoomId,
    }),
    [selectedRoomId],
  );

  // size 1 and load more infinite scroll
  const messages = useFirebase("messages", condition, {
    type: "asc",
    size: 50,
  });

  // console.log(messages);
  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <>
      {selectedRoomId ? (
        <div className="message-container" ref={messageListRef}>
          {messages.map((mes: Message) =>
            mes.uid === currentUser.uid ? (
              <div className="local" key={mes.id}>
                {mes.images != null &&
                  mes.images.map((img: string, index: number) => (
                    <img key={index} src={img}></img>
                  ))}
                {mes.text && <div className="local-message">{mes.text}</div>}
              </div>
            ) : (
              <div className="remote-message" key={mes.id}>
                <div className="remote-info">
                  <div className="remote-img">
                    <img src={mes.photoURL} alt="" />
                  </div>
                  <span className="remote-name">{mes.displayName}</span>
                </div>
                {mes.images != null &&
                  mes.images.map((img:string, index:number) => (
                    <img key={index} src={img}></img>
                  ))}
                {mes.text && <span className="text-message">{mes.text}</span>}
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="message-container">Choose a room</div>
      )}
    </>
  );
}

export default SaleMessage;

/*
<div className="remote-message">
        <div className="remote-info">
          <div className="remote-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <span className="remote-name">PipGo</span>
        </div>
        <span className="text-message">
          Hi Using min-content is therefore one possibility for overflowing
          boxes. If it is possible to allow the box to grow to be the minimum
          size required for the content, but no bigger, using this keyword will
          give you that size.
        </span>
      </div>
      <div className="local">
        <div className="local-message">
          {" "}
          Hi Using min-content is therefore one possibility for overflowing
          boxes. If it is possible to allow the box to grow to be the minimum
          size required for the content, but no bigger, using this keyword will
          give you that size.
        </div>
      </div>
      <div className="remote-message">
        <div className="remote-info">
          <div className="remote-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <span className="remote-name">PipGo</span>
        </div>
        <span className="text-message">Hi</span>
      </div>

*/
