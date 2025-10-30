const mongoose=require('mongoose');
const personeScehma=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    Salary:{
        type:Number,
        required:true
    }
})

const Person=mongoose.model('Person',personeScehma);
module.exports=Person;