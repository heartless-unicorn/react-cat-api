import { useCallback, useEffect, useState } from "react";
import Grid from "./Grid.module";

export default function Breeds() {
  const [breeds, getBreeds] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [isReversed, reverse] = useState(false);
  const [limit, setLimit] = useState(10);

  const APIkey =
    "live_KFI6LB7w6qzReMGnCyNwSPHqXw00jkLK5V0dmEd0PwwCuDP4IjBnBs7ZnqVq7Gw6";

  useEffect(() => {
    const fetchBreedData = async function () {
      await fetch("https://api.thecatapi.com/v1/breeds/")
        .then((response) => response.json())
        .then((value) => {
          getBreeds(
            value.map((el) => {
              return {
                name: el.name,
                id: el.id,
                img: el.reference_image_id,
              };
            })
          );
          console.log("in first");
        })
        .catch((err) => console.log(err));
    };
    fetchBreedData();
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
  }, [sendData, breeds, isReversed, limit]);
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

  return (
    <div className="Breeds">
      <div className="nav-menu">
        <form>
          <select onChange={(e) => getSpecificBreed(e.target.value)}>
            <option value="defaut">All breeds</option>
            {breeds.map((el, i) => {
              return (
                <option value={el.id} key={i}>
                  {el.name}
                </option>
              );
            })}
          </select>
          <select defaultValue="10" onChange={(e) => setLimit(e.target.value)}>
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
            A-Z
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              reverse(true);
            }}
          >
            Z-A
          </button>
        </form>
      </div>

      <Grid data={gridData} />
    </div>
  );
}
