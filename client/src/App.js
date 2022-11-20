import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const newTours = (id) => {
    const removeTours = tours.filter((oneTour) => {
      return oneTour.id !== id;
    });
    setTours(removeTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTours(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length == 0) {
    return (
      <main>
        <h3 className="title">No Tours</h3>
        <button className="btn" onClick={fetchTours}>
          {" "}
          Refresh
        </button>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} newTours={newTours} />
    </main>
  );
}

export default App;
