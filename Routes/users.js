//router default
const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


//functions aux
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, {expiresIn: config.jtw_expires_in});

}

router.get('/', async (req, res) => {
    //return res.send({message: "tudo ok com o metodo get de usuario"});
    try {       
        const users = await Users.find({})
        //const users = await Users.asdasdadsads({})
        return res.send(users);
    } catch (error) {
        return res.status(500).send({error: "error find users"})
    }
});

router.post('/create', async (req, res) => {
    const {email, password} = req.body;
    
    if(!email || !password) return res.status(400).send({error: 'insufficient data'});
    
    try {
        console.log(req.body);
        
        if(await Users.findOne({email})) return res.status(400).send({error: "user exists"});
        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({user, token: createUserToken(user.id)});

    } catch (error) {
        return res.status(500).send({error: "Error create user: " + error});
    }

});


router.post('/auth', async (req, res) => {

    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({error: 'insufficient data'});

    try {
        //get password compare the password with password in the database
        const user  = await Users.findOne({email}).select('+password');
        if(!user) return res.status(400).send({error: 'Error find user'})

        const pass_ok = await bcrypt.compare(password, user.password);
        if(!pass_ok) return res.status(401).send({error: 'error authentication user'});

        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});

    } catch (error) {
        return res.status(500).send({error: "error authenticate"})
    }

});


module.exports = router;


/* 

status

200 - ok
201 - created
202 - accepted

400 - bad request
401 - unauthorized
403 - forbidden -- authorization
404 -  not found 

500 - Internal Server Error
501 - not implemented
503 - service unavailable


*/