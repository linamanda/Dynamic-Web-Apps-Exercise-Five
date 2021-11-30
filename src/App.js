import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import CreateUser from "./pages/CreateUser";
import Header from "./components/Header";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import { initializeApp } from "firebase/app";
import FirebaseConfig from "./components/FirebaseConfig";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

function App() {
  // Track if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);

  //Check to see if there is any loading...
  const [loading, setLoading] = useState(true);

  // Store user information in state
  const [userInformation, setUserInformation] = useState({});

  const [appInitialized, setAppInitialized] = useState(false);

  // Ensure app is initialized when it is ready to be
  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(FirebaseConfig);
    setAppInitialized(true);
  }, []);

  // Check to see if user is logged in
  // User loads page, check their status
  // Set state accordingly
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      auth.onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in
          const uid = user.uid;
          setUserInformation(user);
          setLoggedIn(true);
        } else {
          // User is signed out
          setUserInformation({});
          setLoggedIn(false);
        }
        // Whenever state changes setLoading to false
        setLoading(false);
      });
    }
  }, [appInitialized]);

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation({});
        setLoggedIn(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  if (loading || !appInitialized) return null;

  return (
    <>
      <Header logout={logout} loggedIn={loggedIn} />
      <Router>
        <Routes>
          <Route
            path="/user/:id"
            element={
              loggedIn ? (
                <UserProfile userInformation={userInformation} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/create"
            element={
              !loggedIn ? (
                <CreateUser
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to={`/user/${userInformation.uid}`} />
              )
            }
          />
          <Route
            path="/"
            element={
              !loggedIn ? (
                <Login
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to={`/user/${userInformation.uid}`} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
