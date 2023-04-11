import { useDispatch, useSelector } from "react-redux/es/exports";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrown,
  faFaceSmile,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";

import styles from "./ActionMenu.module.css";

export default function ActionMenu(response) {
  const dispatch = useDispatch();
  const [lattestActions, setLattestAction] = useState([]);

  const favorite = useSelector((state) => state.favorite);
  const isFavorite = favorite.some((item) => item.id === response.data.id);
  function handleAction(act) {
    const currentTime = new Date();

    dispatch({
      type: act,
      payload: {
        url: response.data.url,
        id: response.data.id,
      },
    });

    setLattestAction((curr) => [
      ...curr,
      {
        id: response.data.id,
        time: `${currentTime.getHours()}:${currentTime.getMinutes()}`,
        action: (function () {
          if (act === "ADD_TO_LIKES") {
            return "added to likes";
          } else if (act === "ADD_TO_DISLIKES") {
            return "added to dislikes";
          } else if (act === "ADD_TO_FAVORITE") {
            return "added to favorite";
          } else if (act === "REMOVE_FROM_FAVORITE") {
            return "removed from favorite";
          }
        })(),
      },
    ]);
    response.changeImg();
  }

  return (
    <div className={styles.ActionMenu}>
      <div className={styles.action_buttons}>
        <button
          onClick={() => {
            handleAction("ADD_TO_LIKES");
          }}
          className={styles.likeButton}
        >
          <FontAwesomeIcon icon={faFaceSmile} />
        </button>
        <button
          onClick={() => {
            if (isFavorite) {
              handleAction("REMOVE_FROM_FAVORITE");
            } else {
              handleAction("ADD_TO_FAVORITE");
            }
          }}
          className={styles.favButton}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button
          onClick={() => {
            handleAction("ADD_TO_DISLIKES");
          }}
          className={styles.dislikeButton}
        >
          <FontAwesomeIcon icon={faFaceFrown} />
        </button>
      </div>
      <div className={styles.actionLog}>
        {lattestActions.map((el, i) => {
          let icon;
          if (el.action === "added to likes") {
            icon = (
              <FontAwesomeIcon icon={faFaceSmile} className={styles.like} />
            );
          } else if (el.action === "added to dislikes") {
            icon = (
              <FontAwesomeIcon icon={faFaceFrown} className={styles.dislike} />
            );
          } else {
            icon = <FontAwesomeIcon icon={faHeart} className={styles.fav} />;
          }
          return (
            <div key={i} className={styles.actionField}>
              <p>
                <span>{el.time}</span> Image ID: <b>{el.id}</b> was {el.action}
              </p>
              <div>{icon}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
