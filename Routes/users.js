//router default
const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    //return res.send({message: "tudo ok com o metodo get de usuario"});
    Users.find({}, (err, data) => {
        if(err) return res.send({error: 'Err in the find users' });
        return res.send({data});
    })
})

router.post('/create', (req, res) => {

    const {email, password} = req.body;

    if(!email || !password) return res.send({error: 'insufficient data'});

    Users.findOne({ email},  (err, data) => {
        if(err) return res.send({error: 'Erro find user!'})
        if(data) return res.send({error: 'User exists'})

        Users.create(req.body, (err, data) => {
            if(err) return res.send({error: "error create user"});
            data.password = undefined;
            return res.send(data);
        });
    });
});

router.post('/auth', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.send({error: 'insufficient data'});

    Users.findOne({email}, (err, data) => {
        
        if(err) return res.send({error: 'Error find user'})

        if(!data) return res.send({error: 'User not exists'})

        bcrypt.compare(password, data.password, (err, same) => {
            if(!same) return res.send({error: 'error authentication user'})
            data.password = undefined;
            return res.send(data);
        })

    }).select('+password');
})

module.exports = router;