import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SelectedBreed() {
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
      <div>
        <div>
          <img src={breedInfo[0].url} alt="Cat" style={{ width: 300 }} />
        </div>
        <div>
          <h2>{breedInfo[0].name}</h2>
          <p>{breedInfo[0].description}</p>
        </div>
        <div>
          <p>{breedInfo[0].temperament}</p>
          <p>{breedInfo[0].origin}</p>
          <p>{breedInfo[0].weight} kg</p>
          <p>{breedInfo[0].lifespan} years</p>
        </div>
      </div>
    );
  } else {
    return <div>Waiting...</div>;
  }
}
