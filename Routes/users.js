//router default
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: "tudo ok com o metodo get de usuario"});
})

router.post('/', (req, res) => {
    return res.send({message: "tudo ok com o metodo post de usuarios"});
})

router.post('/create', (req, res) => {
    return res.send({message: "seu usario foi criado"});
})

module.exports = router;