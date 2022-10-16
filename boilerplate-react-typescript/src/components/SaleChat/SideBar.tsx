import React, { useContext, useEffect, useState, memo } from "react";
import "./SideBar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { AppContext, AppContextType } from "../../context/AppProvider";
import { AuthContext, AuthContextType } from "../../context/AuthContext";

import { db } from "../../config/firebase";
import { collection } from "@firebase/firestore";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@firebase/firestore-types";
import useFirebase, { Condition } from "../../hooks/useFirebase";
import firebase from "firebase";

export interface Room {
  [key: string]: any;
}

function SideBar() {
  const [lastKey, setLastKey] = useState<QueryDocumentSnapshot<DocumentData>>();
  const [firstKey, setFirstKey] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [currentRoom, setCurrent] = useState<Room[]>([]);


  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { setSelectedRoomId, selectedRoomId, rooms, setRooms } = useContext(
    AppContext,
  ) as AppContextType;



  useEffect(() => {
    console.log("im render");
    const roomRef = db
      .collection("rooms")
      .orderBy("createdAt", "desc")
      .where("members", "array-contains", currentUser.uid)
      .limit(5);
    // chua xu ly neu chua co bar chat nao thi lsao
    roomRef.get().then((collections) => {
      // updateState(collection);
      const isCollectionEmpty = collections.size === 0;
      if (!isCollectionEmpty) {
        const documents = collections.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRooms([...documents]);

        const lastDoc = collections.docs[collections.docs.length - 1];
        setLastKey(lastDoc);
        const firstDoc = collections.docs[0];
      
        setFirstKey(firstDoc);
        
           
        

      
      } else {
        // xu ly case chua co gi
        setEmpty(true);
        const roomRef = db
          .collection("rooms")
          .orderBy("createdAt", "desc")
          .where("members", "array-contains", currentUser.uid)
          .endBefore(Date.now());

        roomRef.get().then((collection) => {
          console.log("Before key length:" + collection.docs.length);
          // lang nghe danh sach truoc first key
        });
        const unsubscribe = roomRef.onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            console.log("new first key");
            // doc change since last snap shot
            const documents = snapshot.docChanges().map((newDoc) => ({
              ...newDoc.doc.data(),
              id: newDoc.doc.id,
            }));
            console.log(documents);
            setRooms((prevState) => [...documents, ...prevState]);
          }
        });
        return unsubscribe;
      }
      setLoading(false);
    });
  }, []);
  /*   se up
     const unsubcribe = roomRef.onSnapshot((snapshot) => {
       const documents = snapshot.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
       }));

       /*
     loadMore ? setDocuments( (prevState) => [...prevState,documents] )
     : setDocuments(documents); */
  /*
     setRooms( (prevState) => {
      if(rooms.length==0) return [...documents]
      else return [...prevState,...documents] } ) 
     */

  // no se chi update doc hien tai
  // console.log(rooms);

  // setRooms([...documents]);

  // });



  useEffect(() => {
    console.log("lENGHT:" + rooms.length);
  }, [rooms]);

  const fetchMorePosts = () => {
    setLoading(true);
    if(lastKey){
    const roomRef = db
      .collection("rooms")
      .orderBy("createdAt", "desc")
      .where("members", "array-contains", currentUser.uid)
      .startAfter(lastKey)
      .limit(1);
    /*
    roomRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setRooms((prevState) => [...prevState, ...documents]);
    });*/

    // unsubcribe
    roomRef.get().then((collections) => {
      // updateState(collection);
      const isCollectionEmpty = collections.size === 0;
      if (!isCollectionEmpty) {
        const documents = collections.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRooms((prevState) => [...prevState, ...documents]);

        const lastDoc = collections.docs[collections.docs.length - 1];
        setLastKey(lastDoc);
        // const firstDoc = collections.docs[0];
        // setFirstKey(firstDoc);
      } else {
        setEmpty(true);
      }
      setLoading(false);
    });
  }
  };

  useEffect(() => {
    // get snapshot

      let roomRef;
      //   co the setRoom truc tiep luon
      if(firstKey!=null){
       roomRef = db
        .collection("rooms")
        .orderBy("createdAt", "desc")
        .where("members", "array-contains", currentUser.uid)
        .endBefore(firstKey);

      roomRef.get().then((collection) => {
        console.log("Before key length:" + collection.docs.length);
        // lang nghe danh sach truoc first key
      });
      const unsubcribe = roomRef.onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          console.log("new first key");
          // doc change since last snap shot
          const documents = snapshot.docChanges().map((newDoc) => ({
            ...newDoc.doc.data(),
            id: newDoc.doc.id,
          }));
          console.log(documents);
          setRooms((prevState) => [...documents, ...prevState]);
        }
      });
    
       return unsubcribe;
      } 
        
      
    // console.log("First:" + firstKey?.get("ownerId"));
  }, [firstKey]);

  return (
    <div className="side-bar">
      <div className="bar-header">
        <h3>Chat</h3>
        <div className="search-input">
          <AiOutlineSearch />
          <input type="text" placeholder="Tìm kiếm cuộc trò chuyện" />
        </div>
      </div>
      <div className="chat-list">
        {rooms &&
          rooms.map((room: Room) => (
            <>
              <div
                className="chat-item"
                key={room.id}
                style={
                  room.id === selectedRoomId ? { background: "#ECF3FF" } : {}
                }
                onClick={() => {
                  console.log("CLick room:" + room.id);
                  setSelectedRoomId(room.id);
                }}
              >
                <div className="chat-img">
                  <img
                    src="https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
                    alt=""
                  />
                </div>
                <div className="chat-name">{room.id}</div>
              </div>
            </>
          ))}
      </div>
      <button onClick={() => fetchMorePosts()}>Load More</button>
    </div>
  );
}

export default memo(SideBar);

/*
const updateState = (collections: QuerySnapshot<DocumentData>) => {
    const isCollectionEmpty = collections.size === 0;
    if (!isCollectionEmpty) {
      const room = collections.docs.map((color) => ({
        ...color.data(),
        id: color.id,
      }));

      const lastDoc = collections.docs[collections.docs.length - 1];
      setLastKey(lastDoc);
      const firstDoc = collections.docs[0];
      setFirstKey(firstDoc);

      setRooms((prevState) => [...prevState, ...room]);
    } else {
      setEmpty(true);
    }
    setLoading(false);
  };


<div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
        <div className="chat-item">
          <div className="chat-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <div className="chat-name">Tu</div>
        </div>
*/
