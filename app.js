const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser =require('body-parser');
mongoose.connect('mongodb://localhost/alviGym', {useNewUrlParser: true, useUnifiedTopology: true });
const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

const gymSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    currentWeight:String,
    height:String,
    bmi:String,
    age:String,
    phoneNumber:String,
    email:String,
    address:String,
    more:String
});

const contact = mongoose.model('contact', gymSchema);

// contact.save(function (err, fluffy) {
//     if (err) return console.error(err);
//     console.log("DATA HAS BEEN SUBMITTED SUCCESSFULLY");
// });  

//ENDPOINTS
app.get("/", (req, res)=>{ 
    res.status(200).render('home.pug');
});

app.get("/contact", (req, res)=>{ 
    res.status(200).render('contact.pug');
});

app.post("/contact",(req,res)=>{
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("THIS DATA SAVED SUCCESSFULLY");
    }).catch(()=>{
        res.status(404).send("This data not saved");
    })
});



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});