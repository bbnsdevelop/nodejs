const express = require('express');
const router = express.Router();
const Users = require('../model/user-model');
const bcrypt = require('bcrypt');



//-------------------------- funções async ------------------------------------ //
router.get('/async', async (req, res) =>{
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (error) {
        return res.send({error: 'Erro na busca dos usuários'});
    }
});

router.post('/create-async', async (req, res) =>{
    const {email, password} = req.body;
    if(!email || !password) return res.send({error: 'Dados insuficientes!'});

    try {
        if(await Users.findOne({email})) return res.send({error: 'Usuário já cadastrado'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send(user);
    } catch (error) {
        return res.send({erro: 'Erro ao criar usuário'})
    }

});

router.post('/auth-async', async (req, res) =>{

    const {email, password} = req.body;
    if(!email || !password) return res.send({error: 'Dados insuficientes!'})

    try {
        const user = await Users.findOne({email}).select('+password');
        if(!user) return res.send({error: 'Usuário não registrado'});

        const passOk = await bcrypt.compare(password, user.password);
        if(!passOk) return res.send({error: 'Senha inválida!'});

        user.password = undefined;
        return res.send(user);

    } catch (error) {
        return res.send({error: 'Erro ao autencicar usuário'});        
    }
});

//------------------------------------------------------------------------------//

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

router.post('/auth', (req,res) =>{
    const {email, password} = req.body;
    if(!email || !password) return res.send({error: 'Dados insuficientes!'})

    Users.findOne({email}, (err, data) =>{
        if(err) return res.send({error: 'Erro ao buscar usuário!'});
        if(!data) return res.send({error: 'Usuário não registrado!'});

        bcrypt.compare(password, data.password, (err, same) =>{
            if(!same) return res.send({error: 'Erro ao autenticar usuário'});
            
            data.password = undefined;
            return res.send(data);
        });
    }).select('+password');
});


module.exports = router;