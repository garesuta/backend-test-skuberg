const pool = require('../db/pool')
const errors = require('../utils/errors');

exports.createWallet = async (req, res, next) => {
    try {
        let body = req.body;
        const queryText = `INSERT INTO public."Wallet" 
                (user_id, crypto_id) 
                VALUES($1, $2); `
        const response = await pool.query(queryText, [body.user_id, body.crypto_id]);
        if (response.rowCount > 0) {
            return res.status(200).json({
                status: "success",
                //token: token,
                data: "Create Wallet Successful"
            })
        }
    } catch (error) {
        console.log(error.message);
        errors.MapError(500, "Internal server error", next)
    }
}

exports.updateWallet = async (req, res, next) => {
    try {
        let wallet_id = req.params.id;
        let body = req.body;
        const queryText = `UPDATE public."Wallet"
            SET user_id=$1, crypto_id=$2, balance=$3
            WHERE wallet_id=$4;`
        const response = await pool.query(queryText, [body.user_id, body.crypto_id, body.balance, wallet_id]);
        if (response.rowCount > 0) {
            return res.status(200).json({
                status: "success",
                //token: token,
                data: "Update Wallet Successful"
            })
        }
    }
    catch (error) {
        console.log(error.message);
        errors.MapError(500, "Internal server error", next)
    }
}

exports.getWallet = async (req, res, next) => {
    try {
        let wallet_id = req.query.id;
        const queryText = `SELECT * FROM public."Wallet" WHERE wallet_id=$1;`
        const response = await pool.query(queryText, [wallet_id]);
        if (response.rowCount > 0) {
            return res.status(200).json({
                status: "success",
                data: response.rows[0]
            })
        } else {
            return res.status(404).json({
                status: "failed",
                message: "Wallet not found",
            })
        }
    }
    catch (error) {
        console.log(error.message);
        errors.MapError(500, "Internal server error", next)
    }
}