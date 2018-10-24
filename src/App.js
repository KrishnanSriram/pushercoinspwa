import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './app/components/navbar';

class App extends Component {
  render() {
    return (
      <Container>
        <Navbar />
      </Container>
    );
  }
}

export default App;
