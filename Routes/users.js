const express = require('express');
const router = express.Router();
const Users = require('../model/user-model');


router.get('/', (req, res) =>{
    Users.find({}, (err, data) =>{
        if(err) return res.send({error: 'Erro na consulta de usuário!'});
        return res.send(data);
    });
    //return res.send({message: `Tudo certo com o método GET in USERS! Nome: ${obj.nome} Idade: ${obj.idade}`});
});
/*
router.post('/', (req, res) =>{
    //req.body
    return res.send({message: 'Tudo certo com o método POST! in USERS'});
});
*/
router.post('/create', (req, res) =>{
    const {email, password} = req.body;
    if(!email || !password) return res.send({error: 'Dados insuficientes!'})
    
    Users.findOne({email}, (err, data) =>{
        
        // validações
        if(err) return res.send({error: 'Erro ao buscar usuário!'});
        if(data) return res.send({error: 'Erro usuário já registrado!'});

        Users.create(req.body, (err, data) =>{
            if(err) return res.send({error: 'Erro ao criar usuário!'});
            data.password = undefined;
            return res.send(data);
        });
    });
});


module.exports = router;