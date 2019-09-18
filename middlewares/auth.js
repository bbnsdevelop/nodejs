const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{

    const tokenHeader = req.headers.auth;
    if(!tokenHeader) return res.send({error: 'Autenticação recusada!'});

    jwt.verify(tokenHeader, 'feijaocomarroz', (err, decoder) =>{
        if(err) return res.send({error: 'Token inválido!'});

        return next();
    });
}

module.exports = auth;