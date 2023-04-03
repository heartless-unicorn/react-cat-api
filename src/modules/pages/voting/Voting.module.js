import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ActionMenu from "./ActionMenu.module";

import backButton from "../../../media/back.png";

import styles from "./Voting.module.css";

export default function Voting() {
  const [randomImg, setRandomImg] = useState({});
  const navigate = useNavigate();
  useEffect(() => fetchImg(), []);
  function fetchImg() {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((response) => response.json())
      .then((link) => {
        setRandomImg({
          url: link[0].url,
          id: link[0].id,
        });
      });
  }

  return (
    <div className={styles.Voting}>
      <div className={styles.backNav}>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={backButton} alt="back" />
        </button>
        <p>Voting</p>
      </div>
      <div className={styles.imageBox}>
        <img src={randomImg.url} alt="Cat" />
      </div>
      <ActionMenu data={randomImg} changeImg={fetchImg} />
    </div>
  );
}
