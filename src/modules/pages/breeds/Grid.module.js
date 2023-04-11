import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import GridBlock from "./GridBlock.module";

export default function Grid(response) {
  useEffect(() => {}, [response]);

  const data = Array.from(response.data);
  let amountofBlocks = response.data.length / 5;

  return (
    <div className="Grid">
      {(() => {
        const blocks = [];
        if (!Number.isInteger(amountofBlocks)) {
          amountofBlocks = Math.ceil(amountofBlocks);
        }
        for (let i = 1; i <= amountofBlocks; i++) {
          blocks.push(
            GridBlock(
              data.splice(0, 5),
              i,
              response.func,
              response.effect,
              response.storeFav
            )
          );
        }
        return blocks.map((el) => el);
      })()}

      <Outlet />
    </div>
  );
}
