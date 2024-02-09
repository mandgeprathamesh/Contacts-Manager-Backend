const asyncerrorHandler=require('express-async-handler');
const Contact=require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getcontacts=asyncerrorHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Create contacts
//@route POST /api/contacts
//@access public
const createcontact=asyncerrorHandler(async(req,res)=>{
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name ||!email||!phone){
        res.status(400);
        throw new Error("All Fields Are Mandatory");
    } 
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
      });
    res.status(201).json(contact);
});

//@desc Get contact
//@route PUT /api/contacts
//@access public
const updatecontact=asyncerrorHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route Delete /api/contacts
//@access public
const Deletecontact=asyncerrorHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

//@desc Get Individual contact
//@route Get /api/contacts
//@access public
const getindividualcontact=asyncerrorHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});


module.exports={
    getcontacts,
    createcontact,
    updatecontact,
    Deletecontact,
    getindividualcontact,
};