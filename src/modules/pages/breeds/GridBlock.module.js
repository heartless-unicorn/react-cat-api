import { useEffect, useState } from "react";
import styles from "./breedStyles/GridBlock.module.css";

export default function GridBlock(images, key, func) {
  const [click, clicked] = useState(0);
  useEffect(() => {
    console.log("here");
  }, [click]);
  return (
    <div className={`container ${styles.GridBlock}`} key={key}>
      <div className={key % 2 === 0 ? "row flex-row-reverse" : "row"}>
        <div className="col-4">
          <img
            src={images[0].url}
            alt="Cat"
            className={"img-fluid"}
            onClick={() => {
              clicked((cur) => cur + 1);
              func(images[0].id);
            }}
          />
          <img
            src={images.length < 2 ? null : images[1].url}
            alt="Cat"
            className={images.length < 2 ? "d-none" : "img-fluid"}
            onClick={() => {
              clicked((cur) => cur + 1);
              func(images[1].id);
            }}
          />
        </div>
        <div className="col-8">
          <div className={`row ${styles.two_pics}`}>
            <div className="col-6">
              <img
                src={images.length < 3 ? null : images[2].url}
                alt="Cat"
                className={images.length < 3 ? "d-none" : "img-fluid"}
                onClick={() => {
                  clicked((cur) => cur + 1);
                  func(images[2].id);
                }}
              />
            </div>
            <div className="col-6">
              <img
                src={images.length < 4 ? null : images[3].url}
                alt="Cat"
                className={images.length < 4 ? "d-none" : "img-fluid"}
                onClick={() => {
                  clicked((cur) => cur + 1);
                  func(images[3].id);
                }}
              />
            </div>
          </div>
          <div>
            <img
              src={images.length < 5 ? null : images[4].url}
              alt="Cat"
              className={images.length < 5 ? "d-none" : "img-fluid"}
              onClick={() => {
                clicked((cur) => cur + 1);
                func(images[4].id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
