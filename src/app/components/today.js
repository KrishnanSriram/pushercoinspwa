import React, { Component } from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';
import axios from 'axios';
import Loader from './loader';

export default class Today extends Component {
  state = {
    btcprice: '',
    ltcprice: '',
    ethprice: '',
    isLoading: true,
    remote_url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD'
  };

  componentWillMount = () => {
    axios.get(this.state.remote_url)
      .then(response => {
        this.setState({ btcprice: response.data.BTC.USD });
        this.setState({ ethprice: response.data.ETH.USD });
        this.setState({ ltcprice: response.data.LTC.USD });
        this.setState({ isLoading: false});
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
    if(this.state.isLoading === true) {
      return (
        <Loader />
      )
    }
    return (
      <Container>
        <Header as='h5'>Today</Header><br />
        <Grid columns='three' divided>
          <Grid.Row>
            <Grid.Column>
              <Header size='large'>${this.state.btcprice}</Header>
              <Header size='tiny'>1 BTC</Header>
            </Grid.Column>
            <Grid.Column>
              <Header size='large'>${this.state.ethprice}</Header>
              <Header size='tiny'>1 ETH</Header>
            </Grid.Column>
            <Grid.Column>
              <Header size='large'>${this.state.ltcprice}</Header>
              <Header size='tiny'>1 LTC</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

}
