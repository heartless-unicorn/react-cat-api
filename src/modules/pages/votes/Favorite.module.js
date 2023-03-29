import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";

export default function Favorite() {
  const favorite = useSelector((store) => store["favorite"]);
  const dispatch = useDispatch();
  const [change, setChange] = useState(true);

  useEffect(() => {}, [change]);
  function removefromFav(id) {
    dispatch({
      type: "REMOVE_FROM_FAVORITE",
      payload: id,
    });
    setChange((cur) => !cur);
  }

  return (
    <div>
      {favorite.map((el, i) => {
        const source = `https://cdn2.thecatapi.com/images/${el}.jpg`;
        return (
          <div key={i}>
            <button
              onClick={() => {
                removefromFav(el);
              }}
            >
              <img src={source} style={{ width: 200 }} alt="Cat" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
