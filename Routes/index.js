const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');


router.get('/', auth, (req, res) =>{
    let obj = req.query;  
    console.log(res.locals.auth_data);
    //return res.send({message: `Tudo certo com o método GET! Nome: ${obj.nome} Idade: ${obj.idade}`});
    return res.status(200).send({message: `Tudo certo com o método GET! Nome: ${obj.nome} Idade: ${obj.idade}`});
});

router.post('/', (req, res) =>{
    //req.body
    return res.status(200).send({message: 'Tudo certo com o método POST!'});
});


module.exports = router;