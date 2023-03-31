import { Link, Outlet } from "react-router-dom";
import "./breedStyles/Grid.css";

import GridBlock from "./GridBlock.module";

export default function Grid(response) {
  const data = response.data;
  const amountofBlocks = response.data.length / 5;

  return (
    <div className="Grid">
      {(() => {
        const blocks = [];
        for (let i = 1; i <= amountofBlocks; i++) {
          blocks.push(GridBlock(data.splice(0, 5), i));
        }
        return blocks.map((el) => el);
      })()}

      <Outlet />
    </div>
  );
}
