import { useSelector } from "react-redux/es/exports";
import Grid from "../breeds/Grid.module";
import "./votes.css";

export default function Likes() {
  const liked = useSelector((store) => store["liked"]);
  if (liked.length === 0) {
    return <p className="empty">No item found</p>;
  } else {
    return (
      <div>
        <Grid
          data={liked}
          func={function Placeholder() {
            return null;
          }}
        />
      </div>
    );
  }
}
