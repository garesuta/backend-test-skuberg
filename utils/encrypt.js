const bcrypt = require('bcrypt');
const errors = require('./errors');
const jwt = require('jsonwebtoken');

exports.hashPassword = async (plaintextPassword) => {
    if (plaintextPassword) {
        try {
            const hash = await bcrypt.hash(plaintextPassword, 10);
            return hash;
        } catch (error) {
            console.log(error.message);
            errors.MapError(500, "Internal server error", next);
        }
    }
    return null;
}
exports.comparePassword = async (plaintextPassword, hash) => {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

exports.generateJWT = async (data) => {
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
        return token;
    } catch (error) {
        console.error("Error in generating JWT:", error.message);
        throw new Error("Error generating JWT");
    }
}

exports.verifyToken = async (token) => {
    const result = await jwt.verify(token, process.env.JWT_SECRET);
    return result;
}