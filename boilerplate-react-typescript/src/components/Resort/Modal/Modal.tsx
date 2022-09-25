// rsc
// rfce
import React from 'react'
import "./Modal.scss"
interface ModalObj{
    open:boolean;
    onClose:()=>void
}
import firebase from 'firebase';

import { useNavigate } from 'react-router-dom';
const Modal:React.FC<ModalObj> = ({ open, onClose }) => {
  const navigate = useNavigate();
  if (!open) return null;
  const handleClick = ()=>{

 firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  console.error(error);
 })
   
   navigate("/chat");
  }
   return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="modal-header">
            <div className="modal-img"></div>
            <div className="model-title">PipGo</div>
          </div>
          <div className="modal-content">
            <div className="modal-img">
              <img
                src="	https://timo.vn/wp-content/uploads/TDB_website-logo-1-300x58.png"
                alt=""
              />
            </div>
            <div className="modal-desc">
              <p>Kham pha cung chung toi</p>
            </div>
            <button className="guest-button" onClick={handleClick}>Tiếp tục với vai trò khách</button>
            <button className="guest-button">Tiếp tục với vai trò khách</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

/* <div className="content">
            <p>Do you want a</p>
            <h1>$20 CREDIT</h1>
            <p>for your first tade?</p>
          </div>
          <div className="btnContainer">
            <button className="btnPrimary">
              <span className="bold">YES</span>, I love NFT
            </button>
            <button className="btnOutline">
              <span className="bold">NO</span>, thanks
            </button>
          </div>*/ 
