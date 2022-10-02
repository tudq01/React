import React, { useContext, useEffect, useState } from "react";
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

export interface Room {
  [key: string]: any;
}

function SideBar() {
  const [lastKey, setLastKey] = useState<QueryDocumentSnapshot<DocumentData>>();
  const [firstKey, setFirstKey] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { setSelectedRoomId, selectedRoomId, rooms, setRooms } = useContext(
    AppContext,
  ) as AppContextType;

  const roomRef = db
    .collection("rooms")
    .orderBy("createdAt", "desc")
    .where("members", "array-contains", currentUser.uid);
  const unsubscribe = roomRef.onSnapshot((snapshot) => {
   return fetchNewPosts();
 });
  useEffect(() => {
    roomRef.limit(10);
   
    roomRef.get().then((collection) => {
      updateState(collection);
    });
  }, []);

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

  const updateNewState = (collections: QuerySnapshot<DocumentData>) => {
    const isCollectionEmpty = collections.size === 0;
    if (!isCollectionEmpty) {
      const room = collections.docs.map((color) => ({
        ...color.data(),
        id: color.id,
      }));

      // co can luu ko
      const lastDoc = collections.docs[collections.docs.length - 1];
      setLastKey(lastDoc);

      const firstDoc = collections.docs[0];
      setFirstKey(firstDoc);

      setRooms((prevState) => {
        prevState.unshift(room);
        return [...prevState];
      });
    } else {
      setEmpty(true);
    }
    setLoading(false);
  };

  const fetchMorePosts = () => {
    setLoading(true);
    roomRef
      .startAfter(lastKey)
      .limit(10)
      .get()
      .then((collections) => {
        updateState(collections);
      });
  };

  const fetchNewPosts = () => {
    setLoading(true);
    roomRef
      .endBefore(firstKey)
      .get()
      .then((collections) => {
        updateNewState(collections);
      });
  };
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
        {rooms.map((room: Room) => (
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

export default SideBar;

/*
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
