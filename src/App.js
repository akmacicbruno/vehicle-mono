import "./App.css";
import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./Utils/firebase-config";

function App() {
  const [carsMade, setCarsMade] = useState([]);

  useEffect(() => {
    const query = ref(db, "vehicleMade");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          setCarsMade((carsMade) => [...carsMade, project]);
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <div>
        {carsMade.map((project, index) => (
          <h1 key={index}>{project.name}</h1>
        ))}
      </div>
    </div>
  );
}

export default App;
