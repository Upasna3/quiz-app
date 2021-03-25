const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const PORT = 3001;


//using cors to permit browser for loading of resources from different origin.
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(bodyParser.urlencoded({extended: true}));

//handling get request with id denoting the question id and level the table in db
app.get("/question/:id/:level", (req, res) => {
  const table = "level_" + req.params.level; //tables in db are level_easy, level_medium and level_hard
  const id = req.params.id;  
  db.query(`Select * from ${table} where id = ${id};`,
  (err, result)=>{
      if(err){
          console.log(err);
      }
      if(result.length > 0){
          //console.log(result);
          res.send(result);
      }
  });
});


app.listen(PORT, (req, res) =>{
    console.log('Server is running .....'); 
});