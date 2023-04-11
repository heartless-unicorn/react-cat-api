import { useSelector } from "react-redux/es/exports";
import Grid from "../breeds/Grid.module";
import "./votes.css";

export default function Dislikes() {
  const disliked = useSelector((store) => store["disliked"]);
  if (disliked.length === 0) {
    return <p className="empty">No item found</p>;
  } else {
    return (
      <div>
        <Grid
          data={disliked}
          func={function Placeholder() {
            return null;
          }}
        />
      </div>
    );
  }
}
