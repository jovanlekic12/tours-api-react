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
  function limitWords(str, numWords) {
    // Split the string into an array of words
    const wordsArray = str.split(" ");

    // Slice the array to get the first `numWords` words
    const limitedWordsArray = wordsArray.slice(0, numWords);

    // Join the words back into a string
    return limitedWordsArray.join(" ");
  }
  function expandString(string) {
    return string;
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

  // if (tours.length === 0) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <h1>Our Tours</h1>
      {/* {error && <p>Error: {error.message}</p>} */}
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
