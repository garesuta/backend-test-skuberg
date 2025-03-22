const pool = require('./pool')
const { faker } = require('@faker-js/faker');

const seedUsers = async (count = 10) => {
    try {
        const client = await pool.connect();
        const users = [];

        for (let i = 0; i < count; i++) {
            const name = faker.person.fullName();
            const email = faker.internet.email();
            const password = faker.internet.password();

            const result = await client.query(
                `INSERT INTO "User" (name, email, password) VALUES ($1, $2, $3) RETURNING user_id`,
                [name, email, password]
            );
            users.push(result.rows[0].user_id);
        }

        client.release();
        console.log(`${count} users inserted successfully!`);
        return users;
    } catch (err) {
        console.error("Error inserting users:", err);
    }
};

const seedOrders = async (count = 20) => {
    try {
        const client = await pool.connect();

        // Fetch existing user IDs
        const userResult = await client.query(`SELECT user_id FROM "User"`);
        const users = userResult.rows.map(row => row.user_id);

        if (users.length === 0) {
            console.log("No existing users found. Orders cannot be inserted.");
            client.release();
            return;
        }
        // Fetch existing trading pair IDs
        const pairResult = await client.query(`SELECT pair_id FROM "TradePair"`);
        const pairs = pairResult.rows.map(row => row.pair_id);
        if (pairs.length === 0) {
            console.log("No existing trading pairs found. Orders cannot be inserted.");
            client.release();
            return;
        }


        const orderTypes = ["BUY", "SELL", "EXCHANGE"];
        const orderStatuses = ["PENDING", "COMPLETED", "CANCELLED"];

        for (let i = 0; i < count; i++) {
            const userId = faker.helpers.arrayElement(users);
            const pairId = faker.helpers.arrayElement(pairs); // Assuming random UUID for the trading pair
            const type = faker.helpers.arrayElement(orderTypes);
            const amount = faker.number.float({ min: 0.0001, max: 100, precision: 0.00000001 });
            const price = faker.number.float({ min: 0, max: 50000, precision: 0.00000001 });
            const status = faker.helpers.arrayElement(orderStatuses);

            await client.query(
                `INSERT INTO "Order" (user_id, pair_id, type, amount, price, status) VALUES ($1, $2, $3, $4, $5, $6)`,
                [userId, pairId, type, amount, price, status]
            );
        }

        client.release();
        console.log(`${count} orders inserted successfully!`);
    } catch (err) {
        console.error("Error inserting orders:", err);
    }
};

const seedTransactions = async (count = 20) => {
    try {
        const client = await pool.connect();

        // Fetch existing order data
        const orderResult = await client.query(`SELECT order_id, user_id, amount, price FROM "Order"`);
        const orders = orderResult.rows;

        // Fetch existing user data
        const userResult = await client.query(`SELECT user_id FROM "User"`);
        const users = userResult.rows.map(row => row.user_id);

        if (orders.length === 0 || users.length < 2) {
            console.log("Not enough existing orders or users to create transactions.");
            client.release();
            return;
        }

        for (let i = 0; i < count; i++) {
            const order = faker.helpers.arrayElement(orders);
            let buyerId = order.user_id;
            let sellerId;

            // Ensure the buyer and seller are different
            do {
                sellerId = faker.helpers.arrayElement(users);
            } while (sellerId === buyerId);

            const transactionAmount = faker.number.float({ min: 0.0001, max: order.amount, precision: 0.00000001 });
            const transactionPrice = faker.number.float({ min: 0, max: order.price, precision: 0.00000001 });

            await client.query(
                `INSERT INTO "Transaction" (order_id, buyer_id, seller_id, amount, price) VALUES ($1, $2, $3, $4, $5)`,
                [order.order_id, buyerId, sellerId, transactionAmount, transactionPrice]
            );
        }

        client.release();
        console.log(`${count} transactions inserted successfully!`);
    } catch (err) {
        console.error("Error inserting transactions:", err);
    }
};


// seedUsers(10);
// seedOrders(20);
seedTransactions(20);