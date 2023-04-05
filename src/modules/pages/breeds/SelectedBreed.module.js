import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./breedStyles/SelectedBreed.module.css";

export default function SelectedBreed() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [breedInfo, setBreedInfo] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/images/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBreedInfo([
          {
            url: data.url,
            name: data.breeds[0].name,
            description: data.breeds[0].description,
            temperament: data.breeds[0].temperament,
            origin: data.breeds[0].origin,
            weight: data.breeds[0].weight.metric,
            lifespan: data.breeds[0].life_span,
          },
        ]);
        setReady(true);
      });
  }, [id]);
  if (ready) {
    return (
      <div className={styles.SelectedBreed}>
        <div className={styles.selectedBreedNav}>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className={styles.backButton}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <p> Breeds</p>
          <span>{id}</span>
        </div>
        <div className={styles.imageBox}>
          <img src={breedInfo[0].url} alt="Cat" />
        </div>
        <div className={styles.infoHeaderBox}>
          <div className={styles.name}>
            <h1>{breedInfo[0].name}</h1>

            <p>{breedInfo[0].description}</p>
          </div>
          <div className={`row ${styles.infoBox}`}>
            <div className="col-6">
              <p>
                <span>Temperament:</span> <br />
                {breedInfo[0].temperament}
              </p>
            </div>
            <div className="col-6">
              <p>
                <span>Origin: </span>
                {breedInfo[0].origin}
              </p>
              <p>
                <span>Weight: </span>
                {breedInfo[0].weight} kg
              </p>
              <p>
                <span>Life span: </span>
                {breedInfo[0].lifespan} years
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
