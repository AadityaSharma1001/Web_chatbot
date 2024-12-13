import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const handleCredentialResponse = (response, navigate, axios) => {
  const token = response.credential;
  console.log("Google ID Token:", token);

  // Send the token to your backend for verification
  axios
    .post(
      "/login",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      }
    )
    .then((res) => {
      const { jwtToken } = res.data;
      localStorage.setItem("jwtToken", jwtToken);
      navigate("/dashboard");
    })
    .catch((err) => {
      console.error(err);
    });
};

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verify if the user is already logged in
    axios
      .get("/verify")
      .then((res) => {
        if (res.status === 200) {
          console.log("User already logged in");
          navigate("/home");
        }
      })
      .catch((err) => console.error("User not logged in:", err));

    // Initialize Google Login SDK
    window.google?.accounts.id.initialize({
      client_id:
        "843966867210-kbtpkabomh9385n6ngegl558s5c46b7h.apps.googleusercontent.com",
      callback: (response) => handleCredentialResponse(response, navigate, axios),
    });

    // Render the Google sign-in button
    window.google?.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" }
    );
  }, [navigate]);

  return (
    <button id="google-signin-button" className="googleLoginButton">
      Login with Google
    </button>
  );
};

export default Login;
