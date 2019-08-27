const jwt = require('jsonwebtoken');


exports.check_login = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
exports.check_userId = (req, res, next) => {
    try {
        if(req.userData.userId == req.params.userId){
        next();
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};