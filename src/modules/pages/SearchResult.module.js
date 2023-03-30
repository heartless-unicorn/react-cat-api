import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "../pages/breeds/Grid.module";

export default function SearchResult() {
  let { breed } = useParams();
  const [searchResult, setsearchResult] = useState([]);
  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds/")
      .then((response) => response.json())
      .then((data) => {
        data.map((el) => {
          if (el.name.toLowerCase().includes(breed)) {
            setsearchResult((cur) => [...cur, el.reference_image_id]);
          }
        });
      });
  }, []);
  console.log(searchResult);
  return (
    <div>
      {searchResult.length > 0 ? (
        <Grid data={searchResult} />
      ) : (
        <p>"No items found"</p>
      )}
    </div>
  );
}
