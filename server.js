var express = require("express");
var path = require("path");
const fs = require("fs");
const data = require("./db/db.json")

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
  res.json(data);
  console.log(data);
});

app.post("/api/notes", function(req, res){
  
  let id;
  if (!data.length) {
    id = 0
  }else {
   id =  data[data.length-1].id +1
  }
  req.body.id = id;
  data.push(req.body);

  fs.writeFile((path.join(__dirname + "/db/db.json")), JSON.stringify(data), "utf8" , function(err){
    if(err){
      throw err;
    }
    res.json(data);
    console.log("workin");
  })

});

app.delete("/api/notes/:id", function(req, res){
 const id = req.params.id
 console.log(id, '<======')
 const theIndex = data.findIndex((note)=> note.id === parseInt(id))
 console.log(theIndex)

 data.splice(theIndex, 1);

 fs.writeFile((path.join(__dirname + "/db/db.json")), JSON.stringify(data), "utf8" , function(err){
  if(err){
    throw err;
  }
  res.json(data);
  console.log("workin");
})

});

app.listen(PORT, function(){
  console.log("App listening on PORT "+ PORT);
})