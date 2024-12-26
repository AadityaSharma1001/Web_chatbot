import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isGoogleSDKLoaded, setIsGoogleSDKLoaded] = useState(false);

  // Verify existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          navigate("/home");
        })
        .catch(() => {
          localStorage.removeItem("jwtToken");
        });
    }
  }, [navigate]);

  // Load Google Sign-In SDK
  useEffect(() => {
    const loadGoogleSDK = () => {
      if (document.getElementById("google-signin-sdk")) return;

      const script = document.createElement("script");
      script.id = "google-signin-sdk";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = initializeGoogleSignIn;
      script.onerror = () => console.error("Failed to load Google Sign-In SDK");

      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          {
            theme: "outline",
            size: "large",
          }
        );

        setIsGoogleSDKLoaded(true);
      }
    };

    loadGoogleSDK();

    return () => {
      const script = document.getElementById("google-signin-sdk");
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCredentialResponse = (response) => {
    const token = response.credential;

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/login`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { jwtToken } = res.data;
        if (jwtToken) {
          localStorage.setItem("jwtToken", jwtToken);
          navigate("/home");
        } else {
          console.error("JWT not received from backend");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
      });
  };

  return (
    <div className="login-container">
      {!isGoogleSDKLoaded && <p>Loading Google Sign-In...</p>}
      <div id="google-signin-button" className="googleLoginButton"></div>
    </div>
  );
};

export default Login;