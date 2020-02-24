import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Auth from './components/auth';
import HomeContainer from './components/home/homeContainer';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={HomeContainer} />
        <Route path="/home" component={Auth} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
