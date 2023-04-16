import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OTPInput from 'otp-input-react';
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg'
import './App.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from './firebase.config';
import { RecaptchaVerifier,  signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from "react-hot-toast";


const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="App">
      <section className="App-header">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {
          user ? <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2> : (
            <div>
              <h1 className='text-white'>WELCOME TO PHONE OTP</h1>

              {
                showOTP ? (
                  <>
                    <div className='lock text-center'>
                      <BsFillShieldLockFill />
                    </div>
                    <div>
                      <label htmlFor='otp' className='font-bold'>Enter Your Otp</label>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container input"
                      />
                    </div>
                    <div className="BtnContainer Btn">
                     

                      <button
                        onClick={onOTPVerify}>
                           {
                        loading && <CgSpinner size={30} className='Spinner' />
                      }
                        <span>Verify OTP</span>
                      </button>
                    </div>
                  </>) :
                  <>
                    <div className='lock text-center'>
                      <BsTelephoneFill />
                    </div>
                    <div>
                      <label htmlFor='' className='font-bold'>Verify your phone number</label>

                    </div>
                    <div className='country'>
                      {
                        loading && <CgSpinner size={30} className='Spinner' />
                      }
                      <PhoneInput country={"gh"} value={ph} onChange={setPh} />
                      <button onClick={onSignup} className='Btn'>
                        <span>send code via sms</span>
                      </button>
                    </div>
                  </>

              }



            </div>
          )}


      </section>
    </div>
  );
}

export default App;
