const express=require('express');

const app = express();
const db=require('./db')

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const Person=require('./models/persons');

const MenuItem=require('./models/menu')


app.get('/', (req, res) => {
  res.send('Welcome to my resturant')
})



app.get('/idli',(req,res)=>{
    res.send('sure sir');
})

app.get('/io',(req,res)=>{
 var custmized_idli={
    fullname:'Idli',
    size:'10 cm',
    is_sambar:true,
    is_chutney:false
 }
 res.send(custmized_idli);
})




 

const personRouter=require('./routes/routesperson')
app.use('/person',personRouter)

const menurouter=require('./routes/routesmenu')
app.use('/menu',menurouter)

app.listen(3000)