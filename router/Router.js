const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('../doc/swagger')

const userService = require('../service/userService')
const walletService = require('../service/walletService')
const exchangeService = require('../service/exchangeService')


const Router = express.Router()

Router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
// Create a new user
/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new User
 *     description: Creates a new user with the given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: password
 *               email:
 *                 type: string
 *                 example: email@test.com
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
Router.route('/users/login').post(userService.signUp);

// Check wallet
/**
 * @swagger
 * /api/v1/users/wallet:
 *  post:
 *   tags:
 *    - Wallet
 *   summary: Create a new Wallet
 *   description: Creates a new wallet with the given details.
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               example: 4622770a-7fd3-4d91-a6ae-e22697fa2574
 *             crypto_id:
 *               type: string
 *               example: 989542fa-dea0-46ce-abb4-6011c2ae01e4
 *   responses:
 *     200:
 *       description: Wallet created successfully
 *     400:
 *       description: Bad request
 */

Router.route('/users/wallet').post(walletService.createWallet);

// Get wallet
/**
 * @swagger
 * /api/v1/users/wallet:
 *   get:
 *     tags:
 *       - Wallet
 *     summary: Get a Wallet
 *     description: Get a wallet by wallet_id
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *          type: string
 *          example: 99eeb42d-ebe4-48ce-bcfd-a9efa9f289c7
 *          description: The Wallet ID
 *     responses:
 *      200:
 *          description: Get wallet successfully
 *      400:
 *          description: Bad request
 */
Router.route('/users/wallet').get(walletService.getWallet);

/**
 * @swagger
 * /api/v1/users/wallet/{id}:
 *   put:
 *     tags:
 *       - Wallet
 *     summary: Update a Wallet
 *     description: Update a wallet with the given details.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 447b9706-098b-4b77-b6be-ce467ec947d6
 *         description: The Wallet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: 4622770a-7fd3-4d91-a6ae-e22697fa2574
 *               crypto_id:
 *                 type: string
 *                 example: 989542fa-dea0-46ce-abb4-6011c2ae01e4
 *               balance:
 *                 type: number
 *                 example: 150.0
 *     responses:
 *       200:
 *         description: Wallet updated successfully
 *       400:
 *         description: Bad request
 */
Router.route('/users/wallet/:id').put(walletService.updateWallet);

// Create a new order,transaction
/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new Order
 *     description: Creates a new order with the given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: 755b64c3-c412-4cf6-9f56-689943316e9b
 *               pair_id: 
 *                 type: string
 *                 example: 6576b0f4-b324-4710-a2e3-4345babdf31b
 *               type:
 *                 type: string
 *                 example: SELL
 *               amount:
 *                 type: float
 *                 example: 10
 *               price:
 *                 type: float
 *                 example: 100  
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
Router.route('/orders').post(exchangeService.createOrder);

// Get transaction
/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get a transaction
 *     description: Get a transaction by order_id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: b27e7544-7bb8-4e66-97f7-fa8c6866da3f
 *           description: The Order ID
 *     
 *     responses:
 *       200:
 *         description: Get transaction successfully
 *       400:
 *         description: Bad request
 */
Router.route('/orders/:id').get(exchangeService.getTransactionByOrder);


module.exports = Router