const express=require('express');
const router=express.Router();
const Person=require('..//models/persons');

router.post('/',async(req,res)=>{
  try{
  const data=req.body
  const newperson=new Person(data)
  const response=await newperson.save();
  res.status(200).json(response);
  }
  catch(err){
    console.log(err)
    res.status(500).json({error:'Internal server errot'});
  }
})

router.get('/',async(req,res)=>{
  try{
    const data=await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})

router.get('/:workType',async(req,res)=>{
  try{
    const workType=req.params.workType;
    if(workType=='chef' || workType=='manager' || workType=='waiter'){
      const response=await Person.find({work:workType});
      console.log('response fetched');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:'Invalid work type'});
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'})
  }
})

router.put('/:id',async(req,res)=>{
  try{
    const personID=req.params.id;
    const updatedpersondata=req.body;
    const response=await Person.findByIdAndUpdate(personID,updatedpersondata,{
      new:true,
      runValidators:true
    })
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log('data update')
    res.status(200).json(response);
  }
  catch(err){
    console.log(err)
    res.status(500).json({error:'Invalid server error'})
  }
})

router.delete('/:id',async(req,res)=>{
  try{
    const personID=req.params.id;
    const response=await Person.findByIdAndDelete(personID);

    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log('data delete')
    res.status(200).json({message:'person deleted sucessfully'});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Invalid server error'});
  }

})

module.exports=router