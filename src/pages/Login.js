import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import "./Login.css";


const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Hata", error);
    }
  };



  return (
    <div className="loginScreen">
      <div className="wrapper">
        
          <h1>Login</h1> 
          <button onClick={signInWithGoogle} className="login-btn">
            {<FaGoogle />}
          </button>
          </div>
         
      </div>
  );
};

export default Login;
