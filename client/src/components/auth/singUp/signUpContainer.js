import React, {useState, useEffect} from 'react';
import SingUpPage from './signUpComponent';

const signupRequest = async params => {
  return fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(params)
  }).then(response => response.json());
};

const SignUpContainer = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassowrd] = useState(null);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(null);
  const [passConfirm, setPassConfirm] = useState(null);

  const signup = async () => {
    const result = await signupRequest({email, password, userName});

    if (result.error) {
      setError(result.error);
    }
  };

  const signupProps = {
    error,
    email,
    password,
    passConfirm,
    userName,
    onChangePassword: setPassowrd,
    onChangeEmail: setEmail,
    onChangeUserName: setUserName,
    onChangeConfirm: setPassConfirm,
    signup
  };

  return <SingUpPage {...signupProps} />;
};

export default SignUpContainer;
