import { useSelector } from "react-redux/es/exports";
import Grid from "../breeds/Grid.module";

export default function Dislikes() {
  const disliked = useSelector((store) => store["disliked"]);

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
