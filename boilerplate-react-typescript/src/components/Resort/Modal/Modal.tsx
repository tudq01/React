// rsc
// rfce
import React ,{useContext } from "react";
import "./Modal.scss";
interface ModalObj {
  open: boolean;
  onClose: () => void;
}
import firebase from "firebase";
interface GoogleObj {
  additionalUserInfo: void | firebase.auth.UserCredential;
  user: void | firebase.auth.UserCredential;
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
import { useNavigate } from "react-router-dom";
import { addDocument } from "../../../utils/firebase";
import { db } from "../../../config/firebase";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { AppContext, AppContextType } from "../../../context/AppProvider";
import { Timestamp } from "@firebase/firestore";
const Modal: React.FC<ModalObj> = ({ open, onClose }) => {

  const navigate = useNavigate();
   const { currentUser } = useContext(AuthContext) as AuthContextType;
   const { selectedRoomId, setSelectedRoomId } = useContext(AppContext) as AppContextType;

  if (!open) return null;
  const handleClick = () => {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        console.error(error);
      });
     const getRooms = async () => {
       const roomRef = await db.collection("rooms").add({
         ownerId: currentUser.uid,
         members: ["A6tH7BmMLmYsgEyFMPlB26pzaJ13", currentUser.uid], // can assing member id la sale
         // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
         createdAt: Timestamp.fromDate(new Date()),
       });

       setSelectedRoomId(roomRef.id);
     };
     getRooms();
    navigate("/chat");
  };
  const handleGoogle = async () => {
    // luu thong tin khi dang nhap
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function (result) {
        if (result.additionalUserInfo?.isNewUser) {
          const user = result.user;

          addDocument("users", {
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            uid: user?.uid,
          });
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.error(error);
      });

    navigate("/sale-chat");
  };

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
            <button className="guest-button" onClick={handleClick}>
              Tiếp tục với vai trò khách
            </button>
            <button className="guest-button" onClick={handleGoogle}>
              Login google
            </button>
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
