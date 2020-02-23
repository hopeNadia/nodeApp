import React, {useState} from 'react';
import LoginPage from './loginComponent';

export const loginRequest = async params => {
  return fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(params)
  }).then(response => response.json());
};

const LoginContainer = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassowrd] = useState(null);
  const [error, setError] = useState('');

  const login = async () => {
    const result = await loginRequest({email, password});

    if (result.error) {
      setError(result.error);
    }

    console.log(props);
  };

  const loginProps = {
    email,
    password,
    login,
    error,
    setEmail,
    setPassowrd
  };

  return <LoginPage {...loginProps} />;
};

export default LoginContainer;
