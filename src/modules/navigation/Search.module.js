import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Search.module.css";

import searchLogo from "../../media/search.png";
import likeLogo from "../../media/like.png";
import dislikeLogo from "../../media/dislike.png";
import favLogo from "../../media/favorite.png";

export default function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function showSearchResult(e) {
    console.log(search);
    e.preventDefault();
    navigate(`/search/${search.trim().toLowerCase()}`);
  }

  return (
    <div className={`row ${styles.Search}`}>
      <div className={`col-8`}>
        <form>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for breeds by name"
          />
          <div className={styles.searchLogo}>
            <img
              src={searchLogo}
              alt="Search"
              onClick={(e) => {
                showSearchResult(e);
              }}
            />
          </div>
        </form>
      </div>
      <div className={`col-4 ${styles.likeMenu}`}>
        <Link to="../likes">
          <img src={likeLogo} alt="Like" />
        </Link>

        <Link to="../dislikes">
          <img src={favLogo} alt="Favorite" />
        </Link>

        <Link to="../favorite">
          <img src={dislikeLogo} alt="Disike" />
        </Link>
      </div>
    </div>
  );
}
