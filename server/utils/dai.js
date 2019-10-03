const axios = require('axios');
const _ = require('lodash');
const fromExponential = require('from-exponential');
const web3 = require('web3');

/**
 * Helper function to get DAI balance from EThplorer API
*/
const getDAIBalance = async(address) => {
  if (!address) {
    return 0;
  }

  try {
    const addressInfoURL = `http://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`;
    const addressInfo = await axios.get(addressInfoURL);
    const tokens = _.get(addressInfo, 'data.tokens', []);

    let daiBalance = web3.utils.toBN(0);

    if (tokens.length > 0) {
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].tokenInfo.symbol === 'DAI') {
          let b = fromExponential((tokens[i].balance));
          daiBalance = web3.utils.toBN(b);
          break;
        }
      }
    }

    return daiBalance.toString();
  } catch (error) {
    return 0;
  }
}

/**
 * Helper function to get DAI token info from ETHplorer
 */
const getDAIInfo = async() => {
  try {
    const DAIInfoURL = 'http://api.ethplorer.io/getTokenInfo/0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359?apiKey=freekey';
    const DAIInfo = await axios.get(DAIInfoURL);

    return DAIInfo.data;
  } catch (error) {
    return {
      price: {
        rate: 0
      }
    };
  }
}

module.exports = {
  getDAIBalance,
  getDAIInfo
}
