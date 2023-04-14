import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Routes from "../../routes/Routes";
import Search from "./Search.module";

import styles from "./style/Navigation.module.css";

import logo from "../../media/logo.svg";
import heroImg from "../../media/girl-and-pet.png";
import votingImg from "../../media/vote-table.png";
import breedsImg from "../../media/pet-breeds.png";
import galleryImg from "../../media/images-search.png";

export default function Navigation() {
  let location = useLocation();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const [mainMenu, showMainMenu] = useState(true);

  function manageMainMenu() {
    showMainMenu((cur) => !cur);
    console.log(mainMenu);
  }

  return (
    <div className={`container-fluid ${styles.Navigation}`}>
      <div className="row flex-row-reverse">
        <div
          className={
            isTabletOrMobile ? (mainMenu ? `d-none` : `d-block`) : `col-6`
          }
        >
          {location.pathname !== "/" ? (
            <Search menuManager={manageMainMenu} />
          ) : (
            <div className={styles.homescreenArt}>
              <div className={styles.rectangle}></div>
              <img
                src={heroImg}
                alt="Girl and Cat"
                className={`img-fluid ${styles.heroImg}`}
              />
            </div>
          )}

          <div
            className={`${location.pathname !== "/" ? styles.main_info : null}`}
          >
            <Routes />
          </div>
        </div>
        <div
          className={
            isTabletOrMobile
              ? mainMenu
                ? ` ${styles.nav_module}`
                : `d-none`
              : `col-6 ${styles.nav_module}`
          }
        >
          {isTabletOrMobile ? (
            location.pathname === "/" ? (
              <div className={styles.hero}>
                <img src={logo} alt="PetsPaw Logo" />
                <h1>Hello!</h1>
                <h4>Welcome to my Cat project</h4>
                <h3>Lets start using The Cat API</h3>
              </div>
            ) : (
              <div className={styles.closeMenu}>
                <button onClick={manageMainMenu}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            )
          ) : (
            <div className={styles.hero}>
              <img src={logo} alt="PetsPaw Logo" />
              <h1>Hello!</h1>
              <h4>Welcome to my Cat project</h4>
              <h3>Lets start using The Cat API</h3>
            </div>
          )}

          <div className={`row ${styles.nav_box}`}>
            <div className="col-sm">
              <Link
                to="/voting"
                onClick={() => {
                  isTabletOrMobile && showMainMenu(false);
                }}
              >
                <div
                  className={`d-none d-sm-block ${styles.votingNav} ${styles.nav_container}`}
                >
                  <img src={votingImg} alt="Voting" className={`img-fluid`} />
                </div>
                <p>Voting</p>
              </Link>
            </div>
            <div className="col-sm">
              <Link
                to="/breeds"
                onClick={() => {
                  isTabletOrMobile && showMainMenu(false);
                }}
              >
                <div
                  className={`d-none d-sm-block ${styles.breedNav} ${styles.nav_container}`}
                >
                  <img src={breedsImg} alt="Breeds" className={`img-fluid`} />
                </div>
                <p>Breeds</p>
              </Link>
            </div>
            <div className="col-sm">
              <Link
                to="/gallery"
                onClick={() => {
                  isTabletOrMobile && showMainMenu(false);
                }}
              >
                <div
                  className={`d-none d-sm-block ${styles.galleryNav} ${styles.nav_container}`}
                >
                  <img src={galleryImg} alt="Voting" className={`img-fluid`} />
                </div>
                <p>Gallery</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
