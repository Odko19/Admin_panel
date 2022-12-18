import { useState, useEffect } from "react";
import Main from "./componants/Main";
import Login from "./componants/Login";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  return <div>{user ? <Main /> : <Login />}</div>;
}

export default App;
