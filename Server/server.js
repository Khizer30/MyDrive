const express = require("express") ;
const cors = require("cors") ;
const formidable = require("formidable") ;

// Variables
const app = express() ;
const port = 8000 ;

// Middleware
app.use(cors()) ;

// POST
app.post("/upload", (req, res) =>
{
  let form = new formidable.IncomingForm() ;
  form.parse(req, (err, fields, files) =>
  {
    res.write(files[0].originalFilename + " Uploaded!") ;
    res.end() ;
  }) ;
}) ;

// Server
app.listen(port, (req, res) =>
{
  console.log("Server Start at Port: " + port) ;
})