import { useDispatch, useSelector } from "react-redux/es/exports";
import { useState } from "react";

import likeLogo from "../../../media/like.png";
import dislikeLogo from "../../../media/dislike.png";
import favLogo from "../../../media/favorite.png";

import styles from "./ActionMenu.module.css";

export default function ActionMenu(response) {
  const dispatch = useDispatch();
  const [lattestActions, setLattestAction] = useState([]);

  const store = useSelector((store) => store);
  const favorite = !store.favorite.includes(response.data.id);

  function handleAction(act) {
    const currentTime = new Date();
    dispatch({
      type: act,
      payload: response.data.id,
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
          <img src={likeLogo} alt="Like" />
        </button>
        <button
          onClick={() => {
            if (favorite) {
              handleAction("ADD_TO_FAVORITE");
            } else {
              handleAction("REMOVE_FROM_FAVORITE");
            }
          }}
          className={styles.likeButton}
        >
          <img src={favLogo} alt="Favorite" />
        </button>
        <button
          onClick={() => {
            handleAction("ADD_TO_DISLIKES");
          }}
          className={styles.likeButton}
        >
          <img src={dislikeLogo} alt="Dislike" />
        </button>
      </div>
      <div>
        {lattestActions.map((el, i) => {
          return (
            <div key={i}>
              <p>
                <span>{el.time}</span> Image ID: <b>{el.id}</b> was {el.action}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
