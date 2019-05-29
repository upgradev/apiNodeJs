//router default
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: "tudo ok com o metodo get da raiz"});
})

router.post('/', (req, res) => {
    return res.send({message: "tudo ok com o metodo post da raiz"});
})

module.exports = router;