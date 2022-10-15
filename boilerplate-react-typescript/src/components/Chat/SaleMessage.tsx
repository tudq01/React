import React, { useRef, useEffect, useContext, useState, memo } from "react";
import useFirebase from "../../hooks/useFirebase";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import {
  DocumentData,
  QueryDocumentSnapshot,
  WhereFilterOp,
} from "@firebase/firestore-types";

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
  [key: string]: any;
}
interface Condition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: string | [] | undefined;
}
import { AppContext, AppContextType, Room } from "../../context/AppProvider";
import { db } from "../../config/firebase";
import { MdUnsubscribe } from "react-icons/md";

// xu ly message thay doi
function SaleMessage() {
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { setSelectedRoomId, selectedRoomId, rooms, setRooms } = useContext(
    AppContext,
  ) as AppContextType;

  const messageListRef = useRef<HTMLDivElement>(null);

  /*
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
   */

  const [lastKey, setLastKey] = useState<QueryDocumentSnapshot<DocumentData>>();
  const [firstKey, setFirstKey] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [currentRoom, setCurrent] = useState<Room[]>([]);
  const [messages, setMessage] = useState<Message[]>([]);

  useEffect(() => {
    if (selectedRoomId) {
      setMessage([]);
      console.log("im render");
      const msgRef = db
        .collection("messages")
        .orderBy("createdAt", "asc")
        .where("roomId", "==", selectedRoomId)
        .limitToLast(3);

      msgRef.get().then((collections) => {
        // updateState(collection);
        const isCollectionEmpty = collections.size === 0;
        if (!isCollectionEmpty) {
          const firstDoc = collections.docs[0];
          setFirstKey(firstDoc);
          const lastDoc = collections.docs[collections.docs.length - 1];
          setLastKey(lastDoc);

          // da co msg tu trc
          const documents = collections.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          // setMessage([...documents]);

          // lang nghe su kien moi

          const unsubcribe = msgRef.onSnapshot((snapshot) => {
            console.log("new key");
            // doc change since last snap shot
            const documents = snapshot.docs.map((newDoc) => ({
              ...newDoc.data(),
              id: newDoc.id,
            }));
            console.log(documents);
            setMessage([...documents]);
            // setMessage((prevState) => [...prevState,...documents]);
          });

          // chua bat su kien listener khi chat
        } else {
          // chua co msg lan nao
          setMessage([]);

          // listener khi co msg moi
          const unsubcribe = msgRef.onSnapshot((snapshot) => {
            if (snapshot.docs.length > 0) {
              console.log("new key");
              // doc change since last snap shot
              const documents = snapshot.docs.map((newDoc) => ({
                ...newDoc.data(),
                id: newDoc.id,
              }));
              console.log(documents);
              const firstDoc = snapshot.docs[0];
              setFirstKey(firstDoc);
              setMessage([...documents]);
              // setMessage((prevState) => [...prevState,...documents]);
            }
          });
        }
        setLoading(false);
      });
    }
  }, [selectedRoomId]);

  // work welll
  const fetchMorePosts = () => {
    // lay them du lieu chat cu
    setLoading(true);
    if (firstKey != null) {
      const msgRef = db
        .collection("messages")
        .orderBy("createdAt", "asc")
        .where("roomId", "==", selectedRoomId)
        .endBefore(firstKey)
        .limitToLast(2);

      msgRef.get().then((collections) => {
        // updateState(collection);
        const isCollectionEmpty = collections.size === 0;
        if (!isCollectionEmpty) {
          const documents = collections.docs.map(
            (doc) =>
              doc && {
                ...doc.data(),
                id: doc.id,
              },
          );
          setMessage((prevState) => [...documents, ...prevState]);

          // const lastDoc = collections.docs[collections.docs.length - 1];
          // setLastKey(lastDoc);
          const firstDoc = collections.docs[0];
          setFirstKey(firstDoc);
        } else {
          // het du lieu scroll up
          setEmpty(true);
        }
        setLoading(false);
      });
    }
  };

  // tao useEffect cap nhat last key listtener

  // scroll to bottom after message changed
  // hien len thong bao nho o giua man hinh khi co tin nhan moi
  /*
  useEffect(() => {
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);  */

  return (
    <>
      {selectedRoomId ? (
        <>
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
                    mes.images.map((img: string, index: number) => (
                      <img key={index} src={img}></img>
                    ))}
                  {mes.text && <span className="text-message">{mes.text}</span>}
                </div>
              ),
            )}
          </div>
          <button onClick={() => fetchMorePosts()}>Load prev</button>
        </>
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
