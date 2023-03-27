import { useSelector } from "react-redux/es/exports";

export default function Dislikes() {
  const disliked = useSelector((store) => store["disliked"]);
  return (
    <div>
      {disliked.map((el, i) => {
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
