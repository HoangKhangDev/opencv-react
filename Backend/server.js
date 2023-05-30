// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const app = express();

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({extended: true}))
 
//ROUTES WILL GO HERE
app.get('/', function(req, res) {
    res.json({ message: 'WELCOME' });   
});

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

// ROUTES
app.get("/upload",(req,res)=>{
    res.send("UpFile")
})
app.post('/upload',(req,res,err)=>{
    console.log(req);
});
 
app.listen(4444, () => console.log('Server started on port http://localhost:4444'));
