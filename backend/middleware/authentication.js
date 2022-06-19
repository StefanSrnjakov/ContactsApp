const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        if (err) return res.status(400).send('Invalid Token')
        else if(token === undefined || token.user_id === '' || token.user_id === undefined) return res.status(401).send('Access Denied')
        req.token = token;
        next();
    });
}

module.exports.authenticateUser = authenticateUser;


