import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import getBreeds from "../getBreeds";
import styles from "./styles/Gallery.module.css";

export default function Gallery() {
  const favorite = useSelector((store) => store["favorite"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [limit, setLimit] = useState("10");
  const [isReversed, reverse] = useState("RAND");
  const [type, setType] = useState("jpg,png,gif");

  const [imagesUrl, setImagesUrl] = useState([]);

  const APIkey =
    "live_KFI6LB7w6qzReMGnCyNwSPHqXw00jkLK5V0dmEd0PwwCuDP4IjBnBs7ZnqVq7Gw6";
  const breeds = getBreeds();

  useEffect(() => {
    fetchPics();
  }, [isReversed, limit, type]);

  function fetchPics() {
    fetch(
      ` https://api.thecatapi.com/v1/images/search?limit=${limit}&order=${isReversed}&api_key=${APIkey}&mime_types=${type}`
    )
      .then((response) => response.json())
      .then((data) => {
        setImagesUrl(data.map((el) => [el.id, el.url]));
      });
  }

  function manageFav(id) {
    if (favorite.includes(id)) {
      dispatch({
        type: "REMOVE_FROM_FAVORITE",
        payload: id,
      });
    } else {
      dispatch({
        type: "ADD_TO_FAVORITE",
        payload: id,
      });
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
      <div>
        <form>
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
        </form>
      </div>
      <div>
        {imagesUrl.map((el, i) => {
          return (
            <div key={i}>
              <button
                onClick={() => {
                  manageFav(el[0]);
                }}
              >
                <img src={el[1]} alt="Cat" style={{ width: 200 }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
