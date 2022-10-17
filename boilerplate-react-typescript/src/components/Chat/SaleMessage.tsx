import React, { useRef, useEffect, useContext, useState, memo, useCallback } from "react";
import useFirebase from "../../hooks/useFirebase";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import {
  DocumentData,
  FieldValue,
  QueryDocumentSnapshot,
  WhereFilterOp,
} from "@firebase/firestore-types";
import { Timestamp } from "@firebase/firestore";

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
import { NULL } from "node-sass";
import firebase from "firebase";

// xu ly message thay doi
function SaleMessage() {
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { selectedRoomId } = useContext(AppContext) as AppContextType;

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

  const [lastKey, setLastKey] = useState<number | null>();
  const [firstKey, setFirstKey] =
    useState<QueryDocumentSnapshot<DocumentData> | null>();
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [messages, setMessage] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState(false);

  useEffect(() => {
    if (selectedRoomId) {
      setMessage([]);
      setFirstKey(null);
      setLastKey(null);
      setEmpty(false);
      setLoading(false);

      console.log("im render");
      const msgRef = db
        .collection("messages")
        .where("roomId", "==", selectedRoomId)
        .orderBy("createdAt", "asc")
        .limitToLast(6);

      msgRef.get().then((collections) => {
        // updateState(collection);
        const isCollectionEmpty = collections.size === 0;
        if (!isCollectionEmpty) {
          // da co msg tu trc
          const documents = collections.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessage([...documents]);
          const firstDoc = collections.docs[0];
          setFirstKey(firstDoc);
          const lastDoc =
            collections.docs[collections.docs.length - 1].get("createdAt");
          setLastKey(lastDoc);
          console.log("not empty");

          setNewMsg(true);
          // chua bat su kien listener khi chat
        } else {
          // chua co msg lan nao
          // setMessage([]);
          console.log("empty");
         //  setEmpty(true);
          const msgRef = db
            .collection("messages")
            .where("roomId", "==", selectedRoomId)
            .orderBy("createdAt", "asc");
          //  .startAfter(Date.now())

          // listener khi co msg moi
          /*
          const unsubscribe = msgRef.onSnapshot(
            {
              // Listen for document metadata changes
              includeMetadataChanges: false,
            },
            (snapshot) => {
              if (snapshot.docs.length > 0) {
              console.log("new key");
              // doc change since last snap shot
                   if ( !snapshot.metadata.hasPendingWrites ){
              const documents = snapshot.docChanges().map((newDoc) => ({
                ...newDoc.doc.data(),
                id: newDoc.doc.id,
              }));
              console.log(documents);
              setMessage((prevState) => [...prevState, ...documents]);
              }
            }
            },
          );
          return unsubscribe; */
          setLastKey(Date.now());
        }
        // setLoading(false);
      });
    }
  }, [selectedRoomId]);

  // work welll


  const fetchMorePosts = () => {
    // lay them du lieu chat cu
    
    if (firstKey != null) {
      setLoading(true);

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
          setFirstKey(null);
          setEmpty(true);
        }
     
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    // get snapshot
    let msgRef;
    // && messages

    if (lastKey != null) {
      //   co the setRoom truc tiep luon

      console.log("last key");
      msgRef = db
        .collection("messages")
        .where("roomId", "==", selectedRoomId)
        .orderBy("createdAt", "asc")
        .startAfter(lastKey);

      msgRef.get().then((collection) => {
        console.log("After key length:" + collection.docs.length);
        // lang nghe danh sach truoc first key
      });
      const unsubcribe = msgRef.onSnapshot(
        {
          // Listen for document metadata changes
          includeMetadataChanges: false,
        },
        (snapshot) => {
          if (snapshot.docs.length > 0) {
            console.log("new first key");
            if (!snapshot.metadata.hasPendingWrites) {
              // doc change since last snap shot
              const documents = snapshot.docChanges().map((newDoc) => ({
                ...newDoc.doc.data(),
                id: newDoc.doc.id,
              }));
              console.log(documents);
              setMessage((prevState) => [...prevState, ...documents]);
              setNewMsg(true);
            }
          }
        },
      );
      return unsubcribe;
    }
    // console.log("First:" + firstKey?.get("ownerId"));
  }, [lastKey]);

  // tao useEffect cap nhat last key listtener

  // scroll to bottom after message changed
  // hien len thong bao nho o giua man hinh khi co tin nhan moi

  // load prev cung scroll xuong
  useEffect(() => {
    if (newMsg) {
      const node = messageListRef.current;
      if (node) {
        node.scrollTop = node.scrollHeight;
        console.log("im scroll for new msg");
        // messageListRef.current.scrollTop =
        // messageListRef.current.scrollHeight + 50;
        setNewMsg(false);
      }
    }
  }, [newMsg]);
 

  // tat handleScroll di la dc
  const handleScroll = () => {
    console.log("handle scroll")
    const node = messageListRef.current;
    if (node && node.scrollTop === 0) {
      // fetch messages
      if(firstKey&& messages.length>5){
      setTimeout( fetchMorePosts,1000);

      node.scrollTop += 20;
      console.log("Scroll");
      }else {
        console.log("Nodata Scroll");
      }
    }  
  }; 
  /*
  useEffect(()=>{
   if(isEmpty){
     const node = messageListRef.current;
     if (node ) {
       node.scrollTop = 0;
       console.log("No more data");
     }
   }
  },[isEmpty]) */
  return (
    <>

      {selectedRoomId ? (
        <>
          <div
            className="message-container"
            ref={messageListRef}
            onScroll={handleScroll}
          >
            
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
