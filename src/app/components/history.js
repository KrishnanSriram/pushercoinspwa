import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Header, Container, Table, Label } from 'semantic-ui-react';
import Loader from './loader';

export default class History extends Component {
  state = {
    todayprice: {},
    yesterdayprice: {},
    twodaysprice: {},
    threedaysprice: {},
    fourdaysprice: {},
    isLoadingToday: true,
    isLoadingYesterday: true,
    isLoading2Days: true,
    isLoading3Days: true,
    isLoading4Days: true,
  };

  getETHPrices = (date) => {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
  }
  // This function gets the BTC price for a specific timestamp/date. The date is passed in as an argument
  getBTCPrices = (date) => {
      return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
  }
  // This function gets the LTC price for a specific timestamp/date. The date is passed in as an argument
  getLTCPrices = (date) => {
      return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
  }

  getTodaysPrice = () => {
    let t = moment().unix();
    axios.all([this.getBTCPrices(t), this.getETHPrices(t), this.getLTCPrices(t)])
      .then(axios.spread((btc, eth, ltc) => {
        let f = {
          date: moment.unix(t).format("MMMM Do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        };
        this.setState({ todayprice: f, isLoadingToday: false });
      }));
  }

  getYesterdaysPrice = () => {
    let t = moment().subtract(1, 'days').unix();
    axios.all([this.getBTCPrices(t), this.getETHPrices(t), this.getLTCPrices(t)])
      .then(axios.spread((btc, eth, ltc) => {
        let f = {
          date: moment.unix(t).format("MMMM Do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        };
        this.setState({ yesterdayprice: f, isLoadingYesterday: false });
      }));
  }

  getTwoDaysPrice = () => {
    let t = moment().subtract(2, 'days').unix();
    axios.all([this.getBTCPrices(t), this.getETHPrices(t), this.getLTCPrices(t)])
      .then(axios.spread((btc, eth, ltc) => {
        let f = {
          date: moment.unix(t).format("MMMM Do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        };
        this.setState({ twodaysprice: f, isLoading2Days: false });
      }));
  }

  renderLoadingTableRow = () => {
    return(
      <Table.Row>
        <Table.Cell>
          <Loader />
        </Table.Cell>
      </Table.Row>
    )
  }

  renderTodaysData = () => {
    return(
      <Table.Row>
        <Table.Cell>
          <Label ribbon>Today</Label>
        </Table.Cell>
        <Table.Cell>{this.state.todayprice.btc}</Table.Cell>
        <Table.Cell>{this.state.todayprice.eth}</Table.Cell>
        <Table.Cell>{this.state.todayprice.ltc}</Table.Cell>
      </Table.Row>
    );
  }

  renderYesterdaysData = () => {
    return (
      <Table.Row>
        <Table.Cell>
          <Label ribbon>Yesterday</Label>
        </Table.Cell>
        <Table.Cell>{this.state.yesterdayprice.btc}</Table.Cell>
        <Table.Cell>{this.state.yesterdayprice.eth}</Table.Cell>
        <Table.Cell>{this.state.yesterdayprice.ltc}</Table.Cell>
      </Table.Row>
    );
  }

  render2DaysData = () => {
    return (
      <Table.Row>
        <Table.Cell>
          <Label ribbon>2 Day's Price</Label>
        </Table.Cell>
        <Table.Cell>{this.state.twodaysprice.btc}</Table.Cell>
        <Table.Cell>{this.state.twodaysprice.eth}</Table.Cell>
        <Table.Cell>{this.state.twodaysprice.ltc}</Table.Cell>
      </Table.Row>
    );
  }

  componentWillMount = () => {
    this.getTodaysPrice();
    this.getYesterdaysPrice();
    this.getTwoDaysPrice();
  }

  render() {
    return (
      <Container>
        <Header as="h5">History</Header><br />
        <Table celled>
          <Table.Body>
            { this.state.isLoadingToday === false ? this.renderTodaysData() : this.renderLoadingTableRow()}
            { this.state.isLoadingYesterday === false ? this.renderYesterdaysData() : this.renderLoadingTableRow()}
            { this.state.isLoading2Days === false ? this.render2DaysData() : this.renderLoadingTableRow()}
          </Table.Body>
          </Table>
      </Container>
    );
  }

}
