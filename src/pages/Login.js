import React, { useCallback } from "react";
import LoginForm from "../components/LoginForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({ setLoggedIn, setUserInformation }) {
  const loginUser = useCallback((e) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoggedIn(true);
        setUserInformation({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          accessToken: user.accessToken,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ error, errorCode, errorMessage });
      });
  }, []);

  return (
    <div className="PageWrapper">
      <h2>Login</h2>
      <LoginForm loginUser={loginUser} />
    </div>
  );
}

export default Login;
