import React, { Component } from 'react';
import { Grid, Header, Container, Label } from 'semantic-ui-react';
import axios from 'axios';
import Loader from './loader';
import Pusher from 'pusher-js';

export default class Today extends Component {
  state = {
    btcprice: '',
    ltcprice: '',
    ethprice: '',
    refreshTime: '',
    isLoading: true,
    remote_url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD'
  };
  
  sendPricePusher = (data) => {
    axios.post('http://localhost:5000/prices/new', {
        prices: data
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  componentDidMount () {
    console.log('Now invoking another call every 10 seconds!');
    setInterval(() => {
      axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
        .then(response => {
          this.sendPricePusher (response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }, 10000);
    this.prices.bind('coin-prices', price => {
      console.log('Updated at', this.getCurrentTime());
      this.setState({ btcprice: price.prices.BTC.USD });
      this.setState({ ethprice: price.prices.ETH.USD });
      this.setState({ ltcprice: price.prices.LTC.USD, refreshTime: this.getCurrentTime() });
    }, this);
  }

  componentWillMount = () => {
    this.pusher = new Pusher('a825367aa509ac96d725', {
      cluster: 'us2', encrypted: true });
    // Subscribe to the 'coin-prices' channel
    this.prices = this.pusher.subscribe('coin-prices');

    axios.get(this.state.remote_url)
      .then(response => {
        this.setState({ btcprice: response.data.BTC.USD });
        this.setState({ ethprice: response.data.ETH.USD });
        this.setState({ ltcprice: response.data.LTC.USD });
        this.setState({ isLoading: false, refreshTime: this.getCurrentTime()});
      }).catch(error => {
        console.log(error);
      });
  }

  getCurrentTime = () => {
    var date = new Date();
    date.getTime();

    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    return `${hour}:${minutes}:${seconds}`;
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
        <Label size='mini'>Last refreshed at {this.state.refreshTime}</Label>
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
