import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";

import Grid from "../breeds/Grid.module";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import getBreeds from "../getBreeds";
import styles from "./styles/Gallery.module.css";

export default function Gallery() {
  const favorite = useSelector((state) => state.favorite);
  const isFavorite = function (index) {
    return favorite.some((item) => item.id === index);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gridData, setGridData] = useState([]);
  const [limit, setLimit] = useState("10");
  const [isReversed, reverse] = useState("RAND");
  const [type, setType] = useState("jpg,png,gif");
  const [breeds, setBreeds] = useState([]);

  const APIkey =
    "live_KFI6LB7w6qzReMGnCyNwSPHqXw00jkLK5V0dmEd0PwwCuDP4IjBnBs7ZnqVq7Gw6";
  useEffect(() => {
    getBreeds().then((res) => setBreeds(res));
  }, []);

  useEffect(() => {
    fetchPics();
  }, [isReversed, limit, type]);

  function fetchPics() {
    fetch(
      ` https://api.thecatapi.com/v1/images/search?limit=${limit}&order=${isReversed}&api_key=${APIkey}&mime_types=${type}`
    )
      .then((response) => response.json())
      .then((data) => {
        sendData(
          data.map((el) => {
            return {
              id: el.id,
              url: el.url,
            };
          })
        );
      });
  }

  const sendData = useCallback(
    function (arr) {
      if (!arr) {
        fetchPics();
      } else {
        if (isReversed) {
          setGridData(arr.reverse().slice(0, limit));
        } else {
          setGridData(arr.slice(0, limit));
        }
      }
    },
    [breeds, isReversed, limit]
  );

  const getSpecificBreed = useCallback(
    async function (id) {
      await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=${id}&api_key=${APIkey}`
      )
        .then((response) => response.json())
        .then((data) => {
          sendData(
            data.map((el) => {
              return {
                id: el.id,
                url: `https://cdn2.thecatapi.com/images/${el.id}.jpg`,
              };
            })
          );
        });
    },
    [sendData]
  );

  function manageFav(id, url) {
    if (isFavorite(id)) {
      dispatch({
        type: "REMOVE_FROM_FAVORITE",
        payload: id,
      });
      return false;
    } else {
      dispatch({
        type: "ADD_TO_FAVORITE",
        payload: {
          id: id,
          url: url,
        },
      });
      return true;
    }
  }

  return (
    <div className={styles.Gallery}>
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
          <p>Gallery</p>
        </div>
        <Link to="/upload" className={styles.uploadLink}>
          <FontAwesomeIcon icon={faArrowUpFromBracket} /> Upload
        </Link>
      </div>
      <div className={styles.formBox}>
        <form className="row">
          <div className={`col-6 d-flex ${styles.formPart}`}>
            <label>
              <p>Order:</p>
              <select
                defaultValue="random"
                onChange={(e) => reverse(e.target.value)}
              >
                <option value="RAND">Random</option>
                <option value="DESC">A to Z</option>
                <option value="ASC">Z to A</option>
              </select>
            </label>
            <label>
              <p> Limit: </p>
              <select
                defaultValue="10"
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value="5">Limit: 5</option>
                <option value="10">Limit: 10</option>
                <option value="15">Limit: 15</option>
                <option value="20">Limit: 20</option>
              </select>
            </label>
          </div>
          <div className={`col-6 d-flex ${styles.formPart}`}>
            <label>
              <p>Type:</p>
              <select
                defaultValue="All"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="jpg,png,gif">All</option>
                <option value="jpg,png">Static</option>
                <option value="gif">Animated</option>
              </select>
            </label>
            <label>
              <p>Breeds: </p>
              <select onChange={(e) => getSpecificBreed(e.target.value)}>
                <option value="defaut">All breeds</option>
                {breeds.map((el, i) => {
                  return (
                    <option value={el.breed_id} key={i}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
      </div>
      <div>{<Grid data={gridData} func={manageFav} effect={"fav"} />}</div>
    </div>
  );
}
