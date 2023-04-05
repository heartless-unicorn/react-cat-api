import { Link } from "react-router-dom";
import styles from "./breedStyles/GridBlock.module.css";

export default function GridBlock(images, key) {
  return (
    <div className={`container ${styles.GridBlock}`} key={key}>
      <div className={key % 2 === 0 ? "row flex-row-reverse" : "row"}>
        <div className="col-4">
          <Link to={`${images[0]}`}>
            <img
              src={`https://cdn2.thecatapi.com/images/${images[0]}.jpg`}
              alt="Cat"
              className="img-fluid"
            />
          </Link>
          <Link to={`${images[1]}`}>
            <img
              src={`https://cdn2.thecatapi.com/images/${images[1]}.jpg`}
              alt="Cat"
              className="img-fluid"
            />
          </Link>
        </div>
        <div className="col-8">
          <div className={`row ${styles.two_pics}`}>
            <div className="col-6">
              <Link to={`${images[2]}`}>
                <img
                  src={`https://cdn2.thecatapi.com/images/${images[2]}.jpg`}
                  alt="Cat"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-6">
              <Link to={`${images[3]}`}>
                <img
                  src={`https://cdn2.thecatapi.com/images/${images[3]}.jpg`}
                  alt="Cat"
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>
          <div>
            <Link to={`${images[4]}`}>
              <img
                src={`https://cdn2.thecatapi.com/images/${images[4]}.jpg`}
                alt="Cat"
                className="img-fluid"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
