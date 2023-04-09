import { useSelector } from "react-redux/es/exports";
import Grid from "../breeds/Grid.module";

export default function Likes() {
  const liked = useSelector((store) => store["liked"]);
  console.log(liked);
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
