const express = require('express');

const router = express.Router();


router.get('/', (req, res) =>{
    let obj = req.query;  
    //return res.send({message: `Tudo certo com o método GET! Nome: ${obj.nome} Idade: ${obj.idade}`});
    return res.send({message: `Tudo certo com o método GET! Nome: ${obj.nome} Idade: ${obj.idade}`});
});

router.post('/', (req, res) =>{
    //req.body
    return res.send({message: 'Tudo certo com o método POST!'});
});


module.exports = router;