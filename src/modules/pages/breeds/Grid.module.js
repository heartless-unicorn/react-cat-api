import { Link, Outlet } from "react-router-dom";

export default function Grid(response) {
  return (
    <div className="Grid">
      {response.data.map((el, i) => {
        return (
          <div key={i}>
            <Link to={`${el}`}>
              {i}
              <img
                src={`https://cdn2.thecatapi.com/images/${el}.jpg`}
                alt="Cat"
                style={{ width: 200 }}
              />
            </Link>
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}
