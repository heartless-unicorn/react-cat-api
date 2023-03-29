import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function showSearchResult(e) {
    e.preventDefault();
    navigate(`/search/${search.trim().toLowerCase()}`);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          showSearchResult(e);
        }}
      >
        <input type="search" onChange={(e) => setSearch(e.target.value)} />
        <input type="submit" />
      </form>
      <Link to="../likes">Likes</Link>
      <Link to="../dislikes">Disikes</Link>
      <Link to="../favorite">Favorites</Link>
    </div>
  );
}
