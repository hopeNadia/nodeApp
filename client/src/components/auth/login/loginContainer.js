import React, {useState, useEffect} from 'react';
import LoginPage from './loginComponent';
import {useHistory} from 'react-router-dom';

export const loginRequest = async params => {
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

const LoginContainer = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassowrd] = useState(null);
  const [error, setError] = useState(null);
  let history = useHistory();

  useEffect(() => {
    document.title = `You clicked ${email} times`;
  });

  const login = () => {
    // const {email, password} = this.state;
    // const requestResult = await loginRequest({email, password});

    // console.log('loginResult', requestResult);
    // this.setState({error: !requestResult.loginSuccess});

    console.log('LOGIN');
    setPassowrd('');
    history.push('/about');
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
