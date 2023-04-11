import { Link, useLocation } from "react-router-dom";

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

  return (
    <div className={`container-fluid ${styles.Navigation}`}>
      <div className="row flex-row-reverse">
        <div className={`col-6`}>
          <div>
            {location.pathname !== "/" ? (
              <Search />
            ) : (
              <div>
                <div className={styles.rectangle}></div>
                <img
                  src={heroImg}
                  alt="Girl and Cat"
                  className={`img-fluid ${styles.heroImg}`}
                />
              </div>
            )}
          </div>
          <div
            className={`${location.pathname !== "/" ? styles.main_info : null}`}
          >
            <Routes />
          </div>
        </div>
        <div className={`col-6 ${styles.nav_module}`}>
          <div className={styles.hero}>
            <img src={logo} alt="PetsPaw Logo" />
            <h1>Hello!</h1>
            <h4>Welcome to my Cat project</h4>
            <h3>Lets start using The Cat API</h3>
          </div>

          <div className={`row ${styles.nav_box}`}>
            <div className="col">
              <Link to="/voting">
                <div className={` ${styles.votingNav} ${styles.nav_container}`}>
                  <img src={votingImg} alt="Voting" className={`img-fluid`} />
                </div>
                <p>Voting</p>
              </Link>
            </div>
            <div className="col">
              <Link to="/breeds">
                <div className={` ${styles.breedNav} ${styles.nav_container}`}>
                  <img src={breedsImg} alt="Breeds" className={`img-fluid`} />
                </div>
                <p>Breeds</p>
              </Link>
            </div>
            <div className="col">
              <Link to="/gallery">
                <div
                  className={` ${styles.galleryNav} ${styles.nav_container}`}
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
