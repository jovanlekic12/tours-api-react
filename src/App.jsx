import { useState, useEffect } from "react";
import "./App.css";

import Tour from "./tour";

function App() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const url = "https://www.course-api.com/react-tours-project";

  function handleDeleteTour(id) {
    setTours((arr) => arr.filter((tour) => tour.id !== id));
  }
  function limitWords(str, numWords) {
    const wordsArray = str.split(" ");

    const limitedWordsArray = wordsArray.slice(0, numWords);

    return limitedWordsArray.join(" ");
  }
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTours(data);
    } catch (error) {
      setError(error);
    }
  };
  function handleRefresh() {
    fetchData();
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Our Tours</h1>
      {error && <p>Error: {error.message}</p>}
      <ul className="tours__list">
        {tours.length == 0 ? (
          <button onClick={handleRefresh} className="refresh__btn">
            Refresh
          </button>
        ) : (
          tours.map((tour) => {
            return (
              <Tour
                key={tour.id}
                {...tour}
                handleDeleteTour={handleDeleteTour}
                limitWords={limitWords}
              />
            );
          })
        )}
      </ul>
    </div>
  );
}

export default App;
