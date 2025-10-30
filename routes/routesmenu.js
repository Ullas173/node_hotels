const express=require('express');
const router=express.Router();
const MenuItem=require('../models/menu')

router.post('/',async(req,res)=>{
  try{
  const data=req.body
  const newperson=new MenuItem(data)
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
    const data=await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})

router.get('/:taste',async(req,res)=>{
  try{
    const tasts=req.params.taste;
    if(tasts=='spicy' || tasts=='sour' || tasts=='sweet'){
      const response=await MenuItem.find({taste:tasts});
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
    const menuID=req.params.id;
    const updatedmenudata=req.body;
    const response=await MenuItem.findByIdAndUpdate(menuID,updatedmenudata,{
      new:true,
      runValidators:true
    })
    if(!response){
      return res.status(404).json({error:'menu not found'});
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
    const menuID=req.params.id;
    const response=await MenuItem.findByIdAndDelete(menuID);

    if(!response){
      return res.status(404).json({error:'menu not found'});
    }
    console.log('data delete')
    res.status(200).json({message:'menu deleted sucessfully'});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Invalid server error'});
  }

})
//commite
module.exports=router