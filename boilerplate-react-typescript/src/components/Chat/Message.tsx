import React, { useRef, useEffect,useContext } from "react";
import useFirebase from "../../hooks/useFirebase";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { WhereFilterOp } from "@firebase/firestore-types";
interface Props {
  roomId: string;
}

interface Message {
  text?: string;
  uid?: string;
  photoURL?: string;
  createdAt?: string;
  roomId?: string;
  displayName?: string;
  id:string;
}
interface Condition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: string | [];
}

// xu ly message thay doi
function Message(props: Props) {
  
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const messageListRef = useRef<HTMLDivElement>(null);
  const condition = React.useMemo<Condition>(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: props.roomId,
    }),
    [props.roomId],
  );
  const messages = useFirebase("messages", condition);
  console.log(messages);
  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <div className="message-container" ref={messageListRef}>
      {messages.map((mes: Message) =>
        mes.uid === currentUser.uid ? (
          <div className="local" key={mes.id}>
            <div className="local-message">{mes.text}</div>
          </div>
        ) : (
          <div className="remote-message" key={mes.id}>
            <div className="remote-info">
              <div className="remote-img">
                <img
                  src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
                  alt=""
                />
              </div>
              <span className="remote-name">PipGo</span>
            </div>
            <span className="text-message">{mes.text}</span>
          </div>
        ),
      )}
    </div>
  );
}

export default Message;

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
