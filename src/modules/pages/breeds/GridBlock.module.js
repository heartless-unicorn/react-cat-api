import styles from "./breedStyles/GridBlock.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

export default function GridBlock(images, key, func, effect, storeFav) {
  const favorite = storeFav !== undefined ? Array.from(storeFav) : [];

  function ImageBlock(i) {
    function checkIfFavorite(index) {
      if (favorite) {
        return favorite.some((item) => item.id === index);
      } else {
        return null;
      }
    }
    return (
      <div
        className={`position-relative ${styles.imageBlock}`}
        onClick={() => {
          func(images[i].id, images[i].url);
          if (storeFav !== undefined) {
            checkIfFavorite();
          }
        }}
      >
        <img src={images[i].url} alt="Cat" className={"img-fluid"} />
        {effect === "fav" && (
          <p className={`${styles.hoverEffect} ${styles.addToFav}`}>
            {checkIfFavorite(images[i].id) ? (
              <FontAwesomeIcon icon={faHeart} />
            ) : (
              <FontAwesomeIcon icon={faRegularHeart} />
            )}
          </p>
        )}
        {effect === "name" && (
          <p className={`${styles.hoverEffect} ${styles.breedName}`}>
            {images[i].name}
          </p>
        )}
      </div>
    );
  }
  return (
    <div className={`container ${styles.GridBlock}`} key={key}>
      <div className={key % 2 === 0 ? "row flex-row-reverse" : "row"}>
        <div className="col-4">
          {ImageBlock(0)}
          {images.length > 1 && ImageBlock(1)}
        </div>
        <div className="col-8">
          <div className={`row`}>
            <div className="col-6">{images.length > 2 && ImageBlock(2)}</div>
            <div className="col-6">{images.length > 3 && ImageBlock(3)}</div>
          </div>
          <div>{images.length > 4 && ImageBlock(4)}</div>
        </div>
      </div>
    </div>
  );
}
