import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";

export default function Gallery() {
  const favorite = useSelector((store) => store["favorite"]);
  const dispatch = useDispatch();

  const [limit, setLimit] = useState("10");
  const [isReversed, reverse] = useState("RAND");
  const [imagesUrl, setImagesUrl] = useState([]);

  const APIkey =
    "live_KFI6LB7w6qzReMGnCyNwSPHqXw00jkLK5V0dmEd0PwwCuDP4IjBnBs7ZnqVq7Gw6";

  useEffect(() => {
    fetchPics();
  }, [isReversed, limit]);

  function fetchPics() {
    fetch(
      ` https://api.thecatapi.com/v1/images/search?limit=${limit}&order=${isReversed}&api_key=${APIkey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setImagesUrl(data.map((el) => el.id));
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
    <div>
      <div>
        <form>
          <select
            defaultValue="random"
            onChange={(e) => reverse(e.target.value)}
          >
            <option value="RAND">Random</option>
            <option value="DESC">A to Z</option>
            <option value="ASC">Z to A</option>
          </select>
          <select defaultValue="10" onChange={(e) => setLimit(e.target.value)}>
            <option value="5">Limit: 5</option>
            <option value="10">Limit: 10</option>
            <option value="15">Limit: 15</option>
            <option value="20">Limit: 20</option>
          </select>
        </form>
        <Link to="/upload">Upload</Link>
      </div>
      <div>
        {imagesUrl.map((el, i) => {
          return (
            <div key={i}>
              <button
                onClick={() => {
                  manageFav(el);
                }}
              >
                <img
                  src={`https://cdn2.thecatapi.com/images/${el}.jpg`}
                  alt="Cat"
                  style={{ width: 200 }}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
