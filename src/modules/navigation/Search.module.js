import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import styles from "./style/Search.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  faFaceFrown,
  faFaceSmile,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";

export default function Search(response) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function showSearchResult(event) {
    event.preventDefault();
    navigate(`/search/${search.trim().toLowerCase()}`);
  }

  function changeMenu() {
    response.menuManager();
  }

  return (
    <div className={`${styles.Search}`}>
      {isTabletOrMobile && (
        <div className={`${styles.menuButton}`}>
          <button>
            <FontAwesomeIcon icon={faBars} onClick={changeMenu} />
          </button>
        </div>
      )}
      <div className={`row ${styles.searchRow}`}>
        <div className={`col-sm-8`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              showSearchResult(e);
            }}
          >
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for breeds by name"
            />
            <div className={styles.searchLogo}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={(e) => {
                  showSearchResult(e);
                }}
              />
            </div>
          </form>
        </div>
        <div className={`col-sm-4 ${styles.likeMenu}`}>
          <Link to="../likes">
            <FontAwesomeIcon icon={faFaceSmile} />
          </Link>

          <Link to="../favorite">
            <FontAwesomeIcon icon={faHeart} className={styles.fav} />
          </Link>

          <Link to="../dislikes">
            <FontAwesomeIcon icon={faFaceFrown} />
          </Link>
        </div>
      </div>
    </div>
  );
}
