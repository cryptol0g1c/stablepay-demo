const express = require('express');
const router = express.Router();
const web3 = require('web3');
const { getDAIBalance, getDAIInfo } = require('../utils/dai');

/**
 * Endpoint to get balance of a specific address and DAI token information
 */
const handlers = {
  get: async(req, res) => {
    const { address } = req.params;

    if (address === undefined || address === null) {
      return res.json({ success: false, msg: 'Address Missing' });
    }

    if (!web3.utils.isAddress(address)) {
      return res.json({ success: false, msg: 'Wrong address format' });
    }

    try {
      return res.json({
        success: true,
        DAIBalance: await getDAIBalance(address),
        TokenInfo: await getDAIInfo()
      });
    } catch (error) {
      return res.json({
        success: false,
        msg: 'Error getting token information or address balance'
      });
    }
  }
}

router.get('/balance/:address', handlers.get);

module.exports = {
  handlers,
  router
};
