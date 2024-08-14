import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import google from "../../../public/assets/google.jpg";
import Quote from "@/Quote/Quote";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const extractUsername = (email) => {
    return email.split('@')[0];
  };

  const handleAuth = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const username = extractUsername(email);
      localStorage.setItem('username', username);
      login();
      navigate("/Main");
    } catch (error) {
      console.error(`An error occurred during ${isLogin ? "login" : "sign-up"}:`, error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:3001/login" : "http://localhost:3001/register";
    const body = isLogin ? { email, password, rememberMe } : { name, email, password };
    handleAuth(url, body);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google Login Success:", response);
      localStorage.setItem('token', response.access_token);

      try {
        // Fetch user profile information
        const profileResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        const profileData = await profileResponse.json();

        const email = profileData.email;
        const username = extractUsername(email); 
        localStorage.setItem('username', username);
        login();
        navigate("/Main");
      } catch (error) {
        console.error("Error fetching Google user profile:", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
    },
  });

  return (
    <div className="login-container">
      <Quote />
      <div className="back">
        <FontAwesomeIcon icon={faAngleLeft} color="#8692A6" fontSize={"18px"} />
        <span>Back</span>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="title">
          <h2>{isLogin ? "Login to your Account" : "Create an Account"}</h2>
          <p>with your {isLogin ? "registered" : ""} Email Address</p>
        </div>
        {!isLogin && (
          <label>
            Name*
            <input
              placeholder="Enter your name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        )}
        <label>
          Email address*
          <input
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password*
          <input
            placeholder="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="show" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </p>
        </label>
        {isLogin && (
          <div className="remember-pass">
            <input 
              className="remember-password"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember my password
          </div>
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        {isLogin && (
          <button
            type="button"
            className="google-login"
            onClick={() => googleLogin()}
            style={{ paddingLeft: "30px", fontSize: "14px", fontWeight: "600" }}
          >
            <img src={google} alt="Google logo" />
            Login with Google
          </button>
        )}
        <p className="toggle-form" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default Login;
