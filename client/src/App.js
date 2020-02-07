import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Auth from './components/auth';
import SignUpCont from './components/auth/singUp/signUpContainer';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Auth} />
        <Route path="/about" component={SignUpCont} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
