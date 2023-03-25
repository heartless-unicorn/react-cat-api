import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import ActionMenu from "./ActionMenu.module";

export default function Voting() {
  const [randomImg, setRandomImg] = useState({});

  // const store = useSelector((state) => state);

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

  return (
    <div>
      <img src={randomImg.url} alt="Cat" style={{ width: 250 }} />
      <ActionMenu data={randomImg} changeImg={fetchImg} />
    </div>
  );
}
