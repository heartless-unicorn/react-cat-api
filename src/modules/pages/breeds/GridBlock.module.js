import styles from "./breedStyles/GridBlock.module.css";

export default function GridBlock(images, key, func) {
  console.log("here in Block");
  return (
    <div className={`container ${styles.GridBlock}`} key={key}>
      <div className={key % 2 === 0 ? "row flex-row-reverse" : "row"}>
        <div className="col-4">
          <img
            src={`https://cdn2.thecatapi.com/images/${images[0]}.jpg`}
            alt="Cat"
            className="img-fluid"
            onClick={() => {
              func(images[0]);
            }}
          />
          <img
            src={`https://cdn2.thecatapi.com/images/${images[1]}.jpg`}
            alt="Cat"
            className="img-fluid"
            onClick={() => {
              func(images[1]);
            }}
          />
        </div>
        <div className="col-8">
          <div className={`row ${styles.two_pics}`}>
            <div className="col-6">
              <img
                src={`https://cdn2.thecatapi.com/images/${images[2]}.jpg`}
                alt="Cat"
                className="img-fluid"
                onClick={() => {
                  func(images[2]);
                }}
              />
            </div>
            <div className="col-6">
              <img
                src={`https://cdn2.thecatapi.com/images/${images[3]}.jpg`}
                alt="Cat"
                className="img-fluid"
                onClick={() => {
                  func(images[3]);
                }}
              />
            </div>
          </div>
          <div>
            <img
              src={`https://cdn2.thecatapi.com/images/${images[4]}.jpg`}
              alt="Cat"
              className="img-fluid"
              onClick={() => {
                func(images[4]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
