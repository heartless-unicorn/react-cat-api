import { Link } from "react-router-dom";

export default function Search() {
  return (
    <div>
      <input type="search" />
      <Link to="../likes">Likes</Link>
      <Link to="../dislikes">Disikes</Link>
      <Link to="../favorite">Favorites</Link>
    </div>
  );
}
