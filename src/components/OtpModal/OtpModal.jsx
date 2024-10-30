import React, { useState } from 'react';
import { requestOtp, verifyOtp } from "../../services/api";
import styles from './OtpModal.module.css';

function OtpModal({ setIsVerified,setLoginData }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpData,setOtpData]=useState();
  const [otpSent, setOtpSent] = useState(false);

  const handleRequestOtp = async() => {
    const res=await requestOtp(email);
    console.log(res);
    if(res?.success===true){
      setOtpData(res);
      setOtpSent(true);
    }     
  };

  const handleVerifyOtp = async() => {
    const data={
      email,
      name, 
      otp, 
      hash:otpData?.hash 
    }
    const res=await verifyOtp(data);
    if(res?.success===true){
      setLoginData(res);
      setIsVerified(true);
    }      
  };

  return (<div className={styles.modalContainer}>
    <div className={styles.modal}>
      <h2>{otpSent ? 'Enter OTP' : 'Register or Login'}</h2>
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        className={styles.input}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        className={styles.input}
      />
      {!otpSent ? (
        <button onClick={handleRequestOtp} className={styles.button}>Request OTP</button>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className={styles.input}
          />
          <button onClick={handleVerifyOtp} className={styles.button}>Verify OTP</button>
        </>
      )}
    </div>
    </div>
  );
}

export default OtpModal;
