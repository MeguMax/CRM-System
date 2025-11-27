const API_KEY = process.env.API_KEY;

const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!API_KEY) {
        return next();
    }

    if (!apiKey || apiKey !== API_KEY) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid API key'
        });
    }

    next();
};

module.exports = { authenticate };