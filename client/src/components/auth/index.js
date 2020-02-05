import React from 'react';
import {TabPanel, AppBar, Tabs, Tab} from '@material-ui/core';
import LoginPage from './components/login';

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

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      error: null,
      tabItem: 'login'
    };
  }
  componentDidMount() {
    console.log('Did mount');
  }

  login = async () => {
    const {email, password} = this.state;
    const requestResult = await loginRequest({email, password});

    console.log('loginResult', requestResult);
    this.setState({error: !requestResult.loginSuccess});
  };

  onChangeEmail = value => {
    this.setState({
      email: value
    });
  };

  onChangePassword = value => {
    this.setState({
      password: value
    });
  };

  handleChange = (event, tab) => {
    this.setState({
      tabItem: tab
    });
  };

  render() {
    const {error, email, password} = this.state;
    const loginProps = {
      error,
      email,
      password,
      onChangePassword: this.onChangePassword,
      onChangeEmail: this.onChangeEmail
    };

    return (
      <React.Fragment>
        <AppBar position="static">
          <Tabs value={this.state.tabItem} onChange={this.handleChange}>
            <Tab label="Login page" value={'login'} key={1} />
            <Tab label="Sign Up page" value={'signup'} key={2} />
          </Tabs>
        </AppBar>
        {this.state.tabItem === 'login' && <LoginPage {...loginProps} />}
      </React.Fragment>
    );
  }
}

export default LoginContainer;
