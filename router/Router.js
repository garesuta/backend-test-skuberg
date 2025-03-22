const express = require('express')
const userService = require('../service/userService')
const walletService = require('../service/walletService')
const exchangeService = require('../service/exchangeService')


const Router = express.Router()

Router.get('/', (req, res) => {
    res.send('Hello World')
})
// Create a new user
Router.route('/users/login').post(userService.signUp);

// Check wallet
Router.route('/users/wallet').post(walletService.createWallet);
Router.route('/users/wallet').get(walletService.getWallet);
Router.route('/users/wallet/:id').put(walletService.updateWallet);

// Create a new order,transaction
Router.route('/orders').post(exchangeService.createOrder);
Router.route('/orders/:id').get(exchangeService.getTransactionByOrder);


module.exports = Router