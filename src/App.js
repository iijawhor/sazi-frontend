import { useState } from "react";
import "./App.css";
import { Register } from "./exportFiles";
function App() {
  const [user, setUser] = useState(false);

  if (!user) {
    return (
      <div className="appAuthContainer">
        <Register />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Saji for Teacher</h1>
    </div>
  );
}

export default App;
