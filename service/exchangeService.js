const pool = require('../db/pool')
const errors = require('../utils/errors');

exports.createOrder = async (req, res, next) => {
    try {
        let body = req.body;
        let sql = `INSERT INTO public."Order"
                (user_id, pair_id, type, amount, price)
                VALUES($1,$2,$3,$4,$5) RETURNING *;`;
        let response = await pool.query(sql, [body.user_id, body.pair_id, body.type, body.amount, body.price]);
        if (response.rowCount > 0) {
            return res.status(200).json({
                status: "Order Created Successfully",
                data: response.rows[0]
            });
        } else {
            return res.status(400).json({ status: "failed", data: "Insert data failed" });
        }
    } catch (error) {
        console.log(error.message);
        errors.MapError(500, "Internal server error", next);
    }
}

exports.getTransactionByOrder = async (req, res, next) => {
    try {
        let orderId = req.params.id;
        let sql = `SELECT * FROM public."Transaction" WHERE order_id = $1`;
        let response = await pool.query(sql, [orderId]);
        if (response.rowCount > 0) {
            return res.status(200).json({
                status: "Load transaction successfully",
                data: response.rows[0]
            });
        } else {
            return res.status(404).json({ status: "failed", data: "Transaction not found" });
        }
    } catch (error) {
        console.log(error.message);
        errors.MapError(500, "Internal server error", next);
    }
}
