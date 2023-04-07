import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "../pages/breeds/Grid.module";

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
            setsearchResult((cur) => [...cur, el.reference_image_id]);
          }
        });
        console.log("here");
        setReady(true);
      });
  }, [breed]);

  function navToPic(id) {
    navigate(`/breeds/${id}`);
  }

  if (isReady) {
    console.log(searchResult);
    return (
      <div>
        {searchResult.length > 0 ? (
          <Grid data={searchResult} func={navToPic} />
        ) : (
          <p>"No items found"</p>
        )}
      </div>
    );
  } else {
    return <div>Waiting...</div>;
  }
}
