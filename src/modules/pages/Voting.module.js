import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";

export default function Voting() {
  const [randomImg, setRandomImg] = useState({});
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [lattestActions, setAction] = useState([]);
  useEffect(() => fetchImg(), []);
  function fetchImg() {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((response) => response.json())
      .then((link) => {
        setRandomImg({
          url: link[0].url,
          id: link[0].id,
        });
      });
  }
  function addToLiked() {
    const currentTime = new Date();
    dispatch({
      type: "ADD_T0_LIKES",
      payload: randomImg.id,
    });
    setAction((curr) => [
      ...curr,
      {
        id: randomImg.id,
        time: `${currentTime.getHours()}: ${currentTime.getMinutes()}`,
        action: "ADD_T0_LIKES",
      },
    ]);
    fetchImg();
  }

  console.log(lattestActions);
  return (
    <div>
      <img src={randomImg.url} alt="Cat" style={{ width: 250 }} />
      <button onClick={addToLiked}>Like</button>
    </div>
  );
}
