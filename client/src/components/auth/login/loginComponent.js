import React from 'react';
import {Button, Container, FormGroup, TextField} from '@material-ui/core';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {error, email, password, login, setPassowrd, setEmail} = this.props;

    return (
      <Container style={styles.container}>
        <FormGroup>
          {error && <TextField error label="Error" value={error} variant="outlined" multiline="true" />}
          <TextField
            type="email"
            label="Email"
            error={error}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            error={error}
            value={password}
            onChange={event => setPassowrd(event.target.value)}
          />
        </FormGroup>
        <Button style={styles.buttonStyle} variant="contained" color="primary" onClick={login}>
          Login
        </Button>
      </Container>
    );
  }
}

const styles = {
  buttonStyle: {
    margin: 10
  },
  container: {width: '30%', marginTop: 30}
};

export default LoginPage;
