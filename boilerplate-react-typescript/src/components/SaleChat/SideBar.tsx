import React,{useContext} from 'react'
import "./SideBar.scss"
import { AiOutlineSearch } from "react-icons/ai";
import { AppContext, AppContextType, Room } from '../../context/AppProvider';





function SideBar() {
   const { rooms, setSelectedRoomId } = useContext(
     AppContext,
   ) as AppContextType;

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
        {rooms.map((room:Room) => (
          <>
            <div className="chat-item" key={room.id} 
            onClick={()=>{
              console.log("CLick room:"+room.id)
            setSelectedRoomId(room.id)}}>
              <div className="chat-img">
                <img
                  src= "https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
                  alt=""
                />
              </div>
              <div className="chat-name">{room.id}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default SideBar

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