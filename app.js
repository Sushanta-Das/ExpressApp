const express=require("express")
const fs=require("fs")
const path=require("path")
const mongoose = require('mongoose');
const { stringify } = require("querystring");
mongoose.connect('mongodb://127.0.0.1:27017/tube',{useNewUrlParser:true,useUnifiedTopology:true});
const app=express()


//pug engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))

const port=8000

app.use("/static",express.static("static")) //sendind static file
app.use(express.urlencoded())//fetching data


//database
var form = new mongoose.Schema({
    name: String, registration:String, password: String, more:String
  });
// kittySchema.methods.speak = function speak() {
//  };
const Form = mongoose.model('Form', form);
// const silence = new Form{ name: 'Silence' });
// console.log(silence.name); 
// silence.save((err,Kitten)=>
// {
//     if(err) return console.log(err);
//     Kitten.speak();
// }
async function getdata(res){
    rt= await Form.find();
    res.status(200).render('demo',{message:rt})
}
app.get('/', (req, res) => {
    res.status(200).render('demo2')  //showing html
    
  })

app.get("/about",(req,res)=>
{
    res.send("about");
})
app.get("/service",(req,res)=>
{
    res.send("service");
})
app.get("/Contact",(req,res)=>
{
    res.send("contact");
})
app.post("/Contact",(req,res)=>
{
    const formins = new Form(req.body)
    formins.save().then(()=>
    {   
    
    //    getdata(res);
        console.log(req.body);
        res.status(200).send(req.body)
       
    }).catch(()=>
    {
        res.status(400).send("Nt saved")
    })
    res.status(200);
    
})
app.listen(port,()=>
{
    console.log(`App listening on port ${port}`)
})