import { useState, useEffect, createContext } from "react";

import axiosInstance from "./axiosInstance";
import Routes from "./Routes";

export const UserContext = createContext({});

function App() {
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState({
    loggedIn: false,
    roll: 0,
    role: "",
  });

  useEffect(() => {
    axiosInstance({
      url: "/user/isAuth",
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        if (!res.data.loggedIn) {
          setUserSession({
            loggedIn: false,
            role: res.data.user.role,
          });
          return setLoading(false);
        }
        const { loggedIn, user } = res.data;
        setUserSession({
          loggedIn,
          roll: user.roll,
          role: user.role,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setUserSession({
          loggedIn: false,
        });
        return;
      });
  }, []);

  return (
    <UserContext.Provider value={userSession}>
      {loading ? <>...Loading</> : <Routes />}
    </UserContext.Provider>
  );
}

export default App;
