import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "../pages/breeds/Grid.module";

import styles from "./style/SearchResult.module.css";

export default function SearchResult() {
  let { breed } = useParams();
  const navigate = useNavigate();
  const [searchResult, setsearchResult] = useState([]);
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds/")
      .then((response) => response.json())
      .then((data) => {
        setsearchResult([]);
        data.map((el) => {
          if (el.name.toLowerCase().includes(breed)) {
            setsearchResult((cur) => [
              ...cur,
              {
                id: el.reference_image_id,
                url: `https://cdn2.thecatapi.com/images/${el.reference_image_id}.jpg`,
                name: el.name,
              },
            ]);
          }
        });

        setReady(true);
      });
  }, [breed]);

  function navToPic(id) {
    navigate(`/breeds/${id}`);
  }

  if (isReady) {
    return (
      <div>
        {searchResult.length > 0 ? (
          <Grid data={searchResult} func={navToPic} effect="name" />
        ) : (
          <p>"No items found"</p>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
