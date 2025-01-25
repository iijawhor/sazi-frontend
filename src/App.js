import { useState } from "react";
import "./App.css";
import { Header, Login, Register, Sidebar } from "./exportFiles";
import { Outlet } from "react-router";
function App() {
  const sidebar = [
    { name: "home", path: "", icon: "", active: "exact" },
    { name: "my class", path: "my-class", icon: "" },
    { name: "assignments", path: "assignments", icon: "" },
    { name: "attendance", path: "attendance", icon: "" },
    { name: "grade book", path: "grade-book", icon: "" },
    { name: "calender", path: "calender", icon: "" },
    { name: "notification", path: "notification", icon: "" },
    { name: "profile", path: "profile", icon: "" }
  ];
  const [userDetails, setUserDetails] = useState(null);

  if (!userDetails) {
    return (
      <>
        <Login setUserDetails={setUserDetails} userDetails={userDetails} />
      </>
    );
  }

  return (
    <div className="app">
      <div className="app-sidebar-container">
        <Sidebar sidebar={sidebar} />
      </div>
      <div className="app-outlet-container">
        <div className="app-header-container">
          <Header />
        </div>
        <Outlet />
      </div>
      <div className="app-widgets">widgets section</div>
    </div>
  );
}

export default App;
