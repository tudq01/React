import React, { memo, useState } from "react";
import Lightbox from "react-image-lightbox";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
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
function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function Light(props: Message) {
  const [imgState, setState] = useState({ photoIndex: 0, isOpen: false });
  return (
    <>
      {props.images != null && (
        <div className="local-img">
          {props.images.length > 3 ? (
            <ImageList variant="quilted" cols={4} rowHeight={100}>
              {props.images.map((img, index) => (
                <ImageListItem
                  key={index}
                  cols={
                    pattern[
                      index -
                        Math.floor(index / pattern.length) * pattern.length
                    ].cols
                  }
                  rows={
                    pattern[
                      index -
                        Math.floor(index / pattern.length) * pattern.length
                    ].rows
                  }
                  sx={{
                    opacity: ".9",
                    transition: "opacity .3s linear",
                    cursor: "pointer",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <img
                    key={index}
                    {...srcset(
                      img,
                      100,
                      pattern[
                        index -
                          Math.floor(index / pattern.length) * pattern.length
                      ].rows,
                      pattern[
                        index -
                          Math.floor(index / pattern.length) * pattern.length
                      ].cols,
                    )}
                    onClick={() => setState({ ...imgState, isOpen: true })}
                  ></img>
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            props.images.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                onClick={() => setState({ ...imgState, isOpen: true })}
              ></img>
            ))
          )}
        </div>
      )}
      
      {imgState.isOpen && props.images != null && (
        <Lightbox
          mainSrc={props.images[imgState.photoIndex]}
          nextSrc={
            props.images[(imgState.photoIndex + 1) % props.images.length]
          }
          prevSrc={
            props.images[
              (imgState.photoIndex + props.images.length - 1) %
                props.images.length
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

export default Light;

const pattern = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
];
