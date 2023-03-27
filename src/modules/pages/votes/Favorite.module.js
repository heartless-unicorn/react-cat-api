import { useSelector } from "react-redux/es/exports";

export default function Favorite() {
  const favorite = useSelector((store) => store["favorite"]);

  return (
    <div>
      {favorite.map((el, i) => {
        const source = `https://cdn2.thecatapi.com/images/${el}.jpg`;
        return (
          <div key={i}>
            <img src={source} style={{ width: 200 }} alt="Cat" />
          </div>
        );
      })}
    </div>
  );
}
