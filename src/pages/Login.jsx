import React from "react";

import { auth, provider, fbProvider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const countryCode = "+994";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [otp, setOtp] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, fbProvider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  const generateRecaptcha = () => {
    window.RecaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        // size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 12) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.RecaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOtp(otp);
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user;
          localStorage.setItem("isAuth", true);
          setIsAuth(true);
          navigate("/");
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="loginPage_main">
      <div className="loginPage py-4">
      <p>Daxil olun</p>
      <form onSubmit={requestOTP} className="flex justify-center align-center gap-2 flex-col">
        <div className="mb-3">
          <label htmlFor="phoneNumberInput" className="text-white font-bold mr-3">
            Telefon Nömrə: 
          </label>
          <input
            type="tel"
            className="p-1 font-bold"
            id="phoneNumberInput"
            placeholder="+994557777777"
            aria-describedby="emailHelp"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        {expandForm === true ? (
          <>
            <div className="mb-3 flex justify-between gap-2 align-center w-full">
              <label htmlFor="otpInput" className="text-white font-bold mr-3">
                Kod:
              </label>
              <input
                type="number"
                className="p-1 font-bold"
                id="otpInput"
                value={otp}
                onChange={verifyOTP}
              />
            </div>
          </>
        ) : null}
        {expandForm === false ? (
          <button type="submit" className="bg-[#246397] hover:bg-[#bbbbbba9] text-white rounded-lg p-2 w-full mb-3">
            Kod göndər
          </button>
        ) : null}
        <div id="recaptcha-container"></div>
      </form>

      <button onClick={signInWithFacebook} className="login-with-fb-btn mt-5 w-[20vw]">
        Facebook
      </button>
      <button onClick={signInWithGoogle} className="login-with-google-btn w-[20vw]">
        Google (gmail)
      </button>
      </div>
    </div>
  );
}

export default Login;
