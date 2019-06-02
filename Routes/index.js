//router default
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    
    return res.send({message: "Essa informação é muito importante usuarios não autorizados não deveriam recebe-las"});
})

router.post('/', (req, res) => {
    return res.send({message: "tudo ok com o metodo post da raiz"});
})

module.exports = router;