import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Grid from "../breeds/Grid.module";
import "./votes.css";
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
  if (favorite.length === 0) {
    return <p className="empty">No item found</p>;
  } else {
    return (
      <div>
        <Grid
          data={favorite}
          func={removefromFav}
          effect={"fav"}
          storeFav={favorite}
        />
      </div>
    );
  }
}
