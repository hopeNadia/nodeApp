import React from 'react';
import {Button, Container, FormGroup, TextField} from '@material-ui/core';

class SingUpPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      error,
      email,
      password,
      userName,
      passConfirm,
      onChangeEmail,
      onChangePassword,
      onChangeConfirm,
      onChangeUserName
    } = this.props;

    return (
      <Container style={styles.container}>
        <FormGroup>
          {error && <TextField disabled value={'Email or password incorrect'} type="text" variant="outlined" />}
          <TextField
            type="email"
            label="Email"
            error={error}
            value={email}
            onChange={event => onChangeEmail(event.target.value)}
          />
          <TextField
            type="username"
            label="UserName"
            error={error}
            value={userName}
            onChange={event => onChangeUserName(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            error={error}
            value={password}
            onChange={event => onChangePassword(event.target.value)}
          />
          <TextField
            label="Confirm passord"
            type="password"
            error={error}
            value={passConfirm}
            onChange={event => onChangeConfirm(event.target.value)}
          />
        </FormGroup>
        <Button style={styles.buttonStyle} variant="contained" color="primary" onClick={this.login}>
          Sign Up
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

export default SingUpPage;
