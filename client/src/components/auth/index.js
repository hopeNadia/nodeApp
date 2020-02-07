import React from 'react';
import {AppBar, Tabs, Tab} from '@material-ui/core';
import LoginContainer from './login/loginContainer';
import SignUpContainer from './singUp/signUpContainer';

class AuthConatiner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabItem: 'login'
    };
  }

  handleChange = (event, tab) => {
    this.setState({
      tabItem: tab
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <AppBar position="static" style={styles.appBar}>
          <Tabs centered value={this.state.tabItem} onChange={this.handleChange}>
            <Tab label="Login page" value={'login'} key={1} />
            <Tab label="Sign Up page" value={'signup'} key={2} />
          </Tabs>
        </AppBar>

        {this.state.tabItem === 'login' && <LoginContainer />}
        {this.state.tabItem === 'signup' && <SignUpContainer />}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  appBar: {width: '30%', alignSelf: 'center'}
};

export default AuthConatiner;
