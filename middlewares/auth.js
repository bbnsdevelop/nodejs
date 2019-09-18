const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{

    const tokenHeader = req.headers.auth;
    if(!tokenHeader) return res.status(401).send({error: 'Autenticação recusada!'});

    jwt.verify(tokenHeader, 'feijaocomarroz', (err, decoder) =>{
        if(err) return res.status(400).send({error: 'Token inválido!'});
        res.locals.auth_data = decoder;
        return next();
    });
}

module.exports = auth;