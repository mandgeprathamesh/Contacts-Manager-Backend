const express=require('express');
const { createcontact, getcontacts, Deletecontact, getindividualcontact, updatecontact } = require('../controller/contactcontroller');
const { validatetoken } = require('../middlewares/validatetokenhandler');
const router=express.Router();


router.use(validatetoken);
router.route('/').get(getcontacts).post(createcontact);
router.route('/:id').put(updatecontact).delete(Deletecontact).get(getindividualcontact);


module.exports=router;