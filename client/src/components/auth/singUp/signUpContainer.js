import React from 'react';
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

class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      error: null,
      userName: null,
      passConfirm: null
    };
  }
  componentDidMount() {
    console.log('Did mount');
  }

  onChangeEmail = value => {
    this.setState({
      email: value
    });
  };

  onChangeUserName = value => {
    this.setState({
      userName: value
    });
  };

  onChangeConfirm = value => {
    this.setState({
      passConfirm: value
    });
  };

  onChangePassword = value => {
    this.setState({
      password: value
    });
  };

  render() {
    const {error, email, password, passConfirm, userName} = this.state;
    const loginProps = {
      error,
      email,
      password,
      passConfirm,
      userName,
      onChangePassword: this.onChangePassword,
      onChangeEmail: this.onChangeEmail,
      onChangeUserName: this.onChangeUserName,
      onChangeConfirm: this.onChangeConfirm
    };

    return <SingUpPage {...loginProps} />;
  }
}

export default SignUpContainer;
