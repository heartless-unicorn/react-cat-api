import { Route, Routes as MainRoutes } from "react-router-dom";

import Gallery from "../modules/pages/Gallery.module";
import Breeds from "../modules/pages/Breeds.module";
import Voting from "../modules/pages/voting/Voting.module";
import Likes from "../modules/pages/votes/Likes.module";
import Dislikes from "../modules/pages/votes/Dislikes.module";
import Favorite from "../modules/pages/votes/Favorite.module";

export default function Routes() {
  return (
    <div>
      <MainRoutes>
        <Route path="/voting" element={<Voting />} />
        <Route path="/breeds" element={<Breeds />} />
        <Route path="/gallery" element={<Gallery />}></Route>

        <Route path="/likes" element={<Likes />} />
        <Route path="/dislikes" element={<Dislikes />} />
        <Route path="favorite" element={<Favorite />} />
      </MainRoutes>
    </div>
  );
}