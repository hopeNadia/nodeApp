import React, {useState, useEffect} from 'react';
import SingUpPage from './signUpComponent';

export const signUpReuqest = async params => {
  let response = await fetch('http://localhost:5000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(params)
  });

  const responseData = await response.json();

  console.log('response', response, responseData);

  if (response.ok && responseData.loginSuccess)
    return {
      ...responseData
    };

  return {
    loginSuccess: false
  };
};

const SignUpContainer = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassowrd] = useState(null);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(null);
  const [passConfirm, setPassConfirm] = useState(null);

  const signupProps = {
    error,
    email,
    password,
    passConfirm,
    userName,
    onChangePassword: setPassowrd,
    onChangeEmail: setEmail,
    onChangeUserName: setUserName,
    onChangeConfirm: setPassConfirm
  };

  return <SingUpPage {...signupProps} />;
};

export default SignUpContainer;
