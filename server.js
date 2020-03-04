const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
 
 return  fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data){
    if (err){
      throw err;
    }
    console.log(res.json(data));
    return res.json(data);
  })
});

app.post("/api/notes", function(req, res){

});

app.delete("/api/notes:id", function(req, res){

});


app.listen(PORT, function(){
  console.log("App listening on PORT "+ PORT);
})