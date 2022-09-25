import React from "react";
import Message from "../../components/Chat/Message";
import Input from "../../components/Chat/Input";
import SideBar from "../../components/SaleChat/SideBar";
import "./SaleChat.scss";
function SaleChat() {
  return (
    <section className="chat">
      <div className="container">
        <SideBar />
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
            <Message roomId="1"/>
            <Input roomId="1"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SaleChat;
