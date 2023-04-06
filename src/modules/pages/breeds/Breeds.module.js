import { useCallback, useEffect, useState } from "react";
import Grid from "./Grid.module";
import getBreeds from "../getBreeds";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faArrowDownAZ,
  faArrowDownZA,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./breedStyles/Breeds.module.css";

export default function Breeds() {
  const [gridData, setGridData] = useState([]);
  const [isReversed, reverse] = useState(false);
  const [limit, setLimit] = useState(10);
  const [breeds, setBreeds] = useState([]);
  const navigate = useNavigate();
  const APIkey =
    "live_KFI6LB7w6qzReMGnCyNwSPHqXw00jkLK5V0dmEd0PwwCuDP4IjBnBs7ZnqVq7Gw6";

  useEffect(() => {
    getBreeds().then((res) => setBreeds(res));
    sendData();
  }, []);

  const sendData = useCallback(
    function (arr) {
      if (!arr) {
        arr = breeds.map((el) => el.img);
      }
      if (isReversed) {
        setGridData(arr.reverse().slice(0, limit));
      } else {
        setGridData(arr.slice(0, limit));
      }
    },
    [breeds, isReversed, limit]
  );

  useEffect(() => {
    sendData();
  }, [sendData, isReversed, limit]);

  const getSpecificBreed = useCallback(
    async function (id) {
      await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=${id}&api_key=${APIkey}`
      )
        .then((response) => response.json())
        .then((data) => {
          sendData(data.map((el) => el.id));
        });
    },
    [sendData]
  );

  function navToPic(id) {
    navigate(`${id}`);
  }

  return (
    <div className={styles.Breeds}>
      <div className={styles.navMenu}>
        <div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className={styles.backButton}
          >
            {" "}
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <p>Breeds</p>
        <div className={styles.formBox}>
          <form>
            <select
              onChange={(e) => getSpecificBreed(e.target.value)}
              className={styles.breedChoices}
            >
              <option value="defaut">All breeds</option>
              {breeds.map((el, i) => {
                return (
                  <option value={el.id} key={i}>
                    {el.name}
                  </option>
                );
              })}
            </select>
            <select
              defaultValue="10"
              onChange={(e) => setLimit(e.target.value)}
              className={styles.limitForm}
            >
              <option value="5">Limit: 5</option>
              <option value="10">Limit: 10</option>
              <option value="15">Limit: 15</option>
              <option value="20">Limit: 20</option>
            </select>
            <button
              onClick={(e) => {
                e.preventDefault();
                reverse(false);
              }}
            >
              <FontAwesomeIcon icon={faArrowDownAZ} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                reverse(true);
              }}
            >
              <FontAwesomeIcon icon={faArrowDownZA} />
            </button>
          </form>
        </div>
      </div>

      <Grid data={gridData} func={navToPic} />
    </div>
  );
}
