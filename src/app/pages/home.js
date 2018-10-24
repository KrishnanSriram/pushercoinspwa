import React, { Component } from 'react';
import { Container, Divider, Message } from 'semantic-ui-react';
import Today from './../components/today';
import History from './../components/history';
// import PropTypes from 'prop-types';


export default class Home extends Component {

  // static propTypes = {
  //
  // };

  render() {
    return (
      <Container>
        <br />
        <Message
          header='Welcome to Pushercoins!'
          content='Pushercoin is a realtime price information about BTC, ETH and LTC.'
        />
        <Today />
        <Divider />
        <History />
      </Container>
    );
  }

}
