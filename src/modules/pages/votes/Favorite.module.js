import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Grid from "../breeds/Grid.module";

export default function Favorite() {
  const favorite = useSelector((store) => store["favorite"]);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  function removefromFav(id) {
    dispatch({
      type: "REMOVE_FROM_FAVORITE",
      payload: id,
    });
  }
  return (
    <div>
      <Grid data={favorite} func={removefromFav} effect={"fav"} />
    </div>
  );
}
