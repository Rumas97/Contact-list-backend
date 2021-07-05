const express = require('express')
const router = express.Router()

let UserModel = require('../models/User.model')

// will handle all GET requests to http://localhost:5005/api/contacts
router.get('/contacts',(req,res)=>{
  UserModel.find()
    .then((contacts)=>{
      res.status(200).json(contacts)
    })
    .catch((err)=>{
      res.status(500).json({error:"Something went wrong", message:err})
    })
})

// will handle all POST requests to http://localhost:5005/api/create

router.post('/create', (req, res) => {  
  const {firstName, lastName, address} = req.body;
  console.log(req.body)
  UserModel.create({firstName: firstName, lastName: lastName, address: address})
        .then((response) => {
             res.status(200).json(response)
        })
        .catch((err) => {
             res.status(500).json({
                  error: 'Something went wrong',
                  message: err
             })
        })  
})

// will handle all GET requests to http:localhost:5005/api/contacts/:id

router.get('/contacts/:id', (req, res) => {
  const{id}=req.params
    UserModel.findById(id)
     .then((response) => {
          res.status(200).json(response)
     })
     .catch((err) => {
          res.status(500).json({
               error: 'Something went wrong',
               message: err
          })
     }) 
})

// will handle all PATCH requests to http://localhost:5005/api/contacts/:id/edit

router.patch('/contacts/:id/edit',(req,res)=>{
  const{id}=req.params
  const{firstName,lastName,address}=req.body
  // {
  //   "$addToSet": { "data": { "$each": newData } },
  //   "$set": { 
  //      "lastTxn": lastTxn,
  //      "updatedAt": new Date()
  //   }
  // }
  UserModel.findByIdAndUpdate(id,{$set:{firstName,lastName}},{new:true})
  .then((response)=>{
    res.status(200).json(response)
    UserModel.findByIdAndUpdate(id,{$addToSet:{address}},{new:true})
    .then((response)=>{
      res.status(200).json(response)
    })
  })
  .catch((err)=>{
    res.status(500).json({
      error:"new address not being added",
      message:err
    })
  })
})
module.exports = router