const jwt = require('jsonwebtoken');
const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const createToken = async (tokenData) => {
    try {
        const token = await jwt.sign(tokenData, TOKEN_KEY, { expiresIn: TOKEN_EXPIRY })
        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = createToken;