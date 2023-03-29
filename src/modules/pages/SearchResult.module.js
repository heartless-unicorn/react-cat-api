import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SearchResult() {
  let { breed } = useParams();
  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds/")
      .then((response) => response.json())
      .then((data) => {
        data.map((el) => {
          if (el.name.toLowerCase() === breed) {
            console.log("match");
          }
        });
        console.log(data);
      });
  });
  return <div>Here i search result</div>;
}
