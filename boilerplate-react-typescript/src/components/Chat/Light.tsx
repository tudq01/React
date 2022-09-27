import React ,{memo, useState}  from 'react'
import Lightbox from "react-image-lightbox";
interface Message {
  text?: string;
  uid?: string;
  images?: string[];
  photoURL?: string;
  createdAt?: string;
  roomId?: string;
  displayName?: string;
  id?: string;
}

function Light(props:Message) {
    const [imgState, setState] = useState({ photoIndex: 0, isOpen: false });
  return (
    <>
      {props.images != null && (
        <div className="local-img">
          {props.images.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setState({ ...imgState, isOpen: true })}
            ></img>
          ))}
        </div>
      )}
      {imgState.isOpen && props.images != null && (
        <Lightbox
          mainSrc={props.images[imgState.photoIndex]}
          nextSrc={props.images[(imgState.photoIndex + 1) % props.images.length]}
          prevSrc={
            props.images[
              (imgState.photoIndex + props.images.length - 1) % props.images.length
            ]
          }
          onCloseRequest={() => setState({ ...imgState, isOpen: false })}
          onMovePrevRequest={() => {
            props.images != null &&
              setState({
                ...imgState,
                photoIndex:
                  (imgState.photoIndex + props.images.length - 1) %
                  props.images.length,
              });
          }}
          onMoveNextRequest={() => {
            props.images != null &&
              setState({
                ...imgState,
                photoIndex: (imgState.photoIndex + 1) % props.images.length,
              });
          }}
        />
      )}

      {props.text && <div className="local-message">{props.text}</div>}  
    </>
  );
}

export default memo(Light)