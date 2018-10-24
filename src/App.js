import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './app/components/navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './app/pages/home';
import About from './app/pages/about';

class App extends Component {
  render() {
    return (
      <Container>
        <Navbar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
