//router default
const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');



router.get('/', async (req, res) => {
    //return res.send({message: "tudo ok com o metodo get de usuario"});
    try {       
        const users = await Users.find({})
        return res.send(users);
    } catch (error) {
        return res.send({error: "error find users"})
    }
});

router.post('/create', async (req, res) => {
    const {email, password} = req.body;
    
    if(!email || !password) return res.send({error: 'insufficient data'});
    
    try {
        console.log(req.body);
        
        if(await Users.findOne({email})) return res.send({error: "user exists"});
        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send(user);

    } catch (error) {
        return res.send({error: "Error create user: " + error});
    }

});


router.post('/auth', async (req, res) => {

    const {email, password} = req.body;
    if(!email || !password) return res.send({error: 'insufficient data'});

    try {
        //get password compare the password with password in the database
        const user  = await Users.findOne({email}).select('+password');
        if(!user) return res.send({error: 'Error find user'})

        const pass_ok = await bcrypt.compare(password, user.password);
        if(!pass_ok) return res.send({error: 'error authentication user'});

        user.password = undefined;
        return res.send(user);

    } catch (error) {
        return res.send({error: "error authenticate"})
    }

});


module.exports = router;