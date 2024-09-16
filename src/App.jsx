import { useState, useEffect } from "react";
import "./App.css";

import Tour from "./tour";

function App() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [expand, setExpand] = useState(false);
  const url = "https://www.course-api.com/react-tours-project";

  function handleDeleteTour(id) {
    setTours((arr) => arr.filter((tour) => tour.id !== id));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTours(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  // if (tours.length === 0) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <h1>Our Tours</h1>
      {/* {error && <p>Error: {error.message}</p>} */}
      <ul className="tours__list">
        {tours.map((tour) => {
          return (
            <Tour key={tour.id} {...tour} handleDeleteTour={handleDeleteTour} />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
