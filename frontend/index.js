import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import { Input, Box, Message } from './components';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      DAIBalance: 0,
      ETHBalance: 0,
      TOKENBalance: 0,
      error: null
    };
  }

  componentDidMount() {
    const { web3 } = window;

    if (web3) {
      this.getEthBalance(web3);

      window.ethereum.on('accountsChanged', () => {
        this.getEthBalance(web3);
      });
    } else {
      this.setState({
        error: 'Please install metamask on your browser'
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.address != this.state.address) {
      this.getDaiBalance(this.state.address);
    }
  }

  renderAddress() {
    const { address } = this.state;

    return (
      <div className='address'>
        {address.substring(0, 4)}...{address.substring(38, 42)}
        <i aria-hidden='true' className='circle large icon with-color'></i>
      </div>
    );
  }

  renderError() {
    const { error } = this.state;

    if (!error) return null

    return (
      <Message title={error} />
    );
  }

  render() {
    const { ETHBalance, TOKENBalance, DAIBalance } = this.state;

    return (
      <div>
        {this.renderAddress()}

        <Box title='Address Balance'>
          <Input
            prefix='ETH'
            value={ETHBalance}
            icon='ethereum large icon'/>

          <Input
            prefix='DAI'
            value={DAIBalance}
            icon='ethereum large icon'/>
        </Box>

        <Box title='Total USD Token balance'>
          <Input
            prefix='$'
            value={TOKENBalance}/>
        </Box>

        {this.renderError()}
      </div>
    );
  }



  getEthBalance = (web3) => {
    web3.eth.getAccounts((error, accounts) => {
      if (!!error) {
        console.log('\n\n--getAcoount() err:', error);
        return this.setState({ error: 'Internal Error' });
      }

      if (accounts.length === 0) {
        return window.ethereum.enable();
      }

      let account = accounts[0];

      web3.eth.getBalance(account, (err, balance) => {
        balance = web3.fromWei(balance, 'ether');

        return this.setState({
          address: account,
          ETHBalance: balance,
          error: null
        });
      });
    });
  }
  /**
   *Function to retrieve holder DAI balance and USD rate
   *
   */
  getDaiBalance = (address) => {
    axios({
      method: 'GET',
      url: '/balance/' + address,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }
    }).then((response) => {
        if (response.data.success) {
          let DAIBalanceString = web3.toBigNumber(response.data.DAIBalance).toString();
          let DAIBalance = web3.fromWei(DAIBalanceString, 'ether');
          let TOKENBalance = DAIBalance * response.data.TokenInfo.price.rate;

          return this.setState({
            DAIBalance,
            TOKENBalance: TOKENBalance.toFixed(2),
            error: null
          });
        }

        return this.setState({ error: response.data.msg });
      })
      .catch((error) => {
        return this.setState({
          error: 'Internal Error'
        });
      });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
