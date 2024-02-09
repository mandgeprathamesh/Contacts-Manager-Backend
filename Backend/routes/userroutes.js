const express=require('express');
const { registerUser, loginUser, currentUser } = require('../controller/usercontroller');
const { validatetoken } = require('../middlewares/validatetokenhandler');
const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/current',validatetoken,currentUser);

module.exports=router;