import React from 'react';
import {Button, Container, FormGroup, TextField} from '@material-ui/core';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {error, email, password, onChangeEmail, onChangePassword} = this.props;

    return (
      <Container>
        <FormGroup style={{width: '50%'}}>
          {error && <TextField disabled value={'Email or password incorrect'} type="text" variant="outlined" />}
          <TextField
            type="email"
            label="Email"
            error={error}
            value={email}
            onChange={event => onChangeEmail(event.target.value)}
          />
          <TextField
            id="standard-basic-2"
            label="Password"
            type="password"
            error={error}
            value={password}
            onChange={event => onChangePassword(event.target.value)}
          />
        </FormGroup>
        <Button style={buttonStyle} variant="contained" color="primary" onClick={this.login}>
          Login
        </Button>
      </Container>
    );
  }
}

const buttonStyle = {
  margin: 10
};

export default LoginPage;
