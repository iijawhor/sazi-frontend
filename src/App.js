import { useState } from "react";
import "./App.css";
import { Login, Register } from "./exportFiles";
function App() {
  const [userDetails, setUserDetails] = useState(null);
  console.log("userDetails........", userDetails);

  if (!userDetails) {
    return (
      <>
        <Login setUserDetails={setUserDetails} userDetails={userDetails} />
      </>
    );
  }

  return (
    <div className="App">
      <h1>Saji for Teacher</h1>
      {userDetails.user.fullname}
    </div>
  );
}

export default App;
