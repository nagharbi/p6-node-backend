//création des routes.

const express = require('express');
const router = express.Router();
const userCtrol = require('../controllers/user');


router.post('/sigunp', userCtrol.signup);
router.post('/login',userCtrol.login);



module.exports = router;

