const pool = require('../db/pool')
const errors = require('../utils/errors');
const encrypt = require('../utils/encrypt');

exports.signUp = async (req, res, next) => {
    try {
        let body = req.body;
        // console.log(body);
        let sqlCheckDupUser = `SELECT * from public."User" where name = $1;`
        let responseCheckDup = await pool.query(sqlCheckDupUser, [body.name]);
        if (responseCheckDup.rowCount > 0) {
            return res.status(400).json({ status: "failed", data: "User is duplicated" })
        }
        let sql = `INSERT INTO public."User"
                (name, email, password)
                VALUES($1,$2,$3);`;
        let pwd = await encrypt.hashPassword(body.password);
        let response = await pool.query(sql, [body.name, body.email, pwd]);
        // console.log(response);
        if (response.rowCount > 0) {
            // const token = await encrypt.generateJWT({ username: body.name, role: response.rows[0].roles });
            return res.status(200).json({
                status: "success",
                //token: token,
                data: "Create User Successful"
            });
        } else {
            return res.status(400).json({ status: "failed", data: "Insert data failed" });
        }
    } catch (error) {
        console.log(error.message);
        errors.MapError(500, "Internal server error", next);
    }
}