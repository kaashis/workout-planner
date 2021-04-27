const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const { getResults } = require("./Services");

const app = express();

app.listen(3000, function () {
  console.log("listening on 3000");
});

//handles reading data from the form
app.use(bodyParser.urlencoded({ extended: true }));

//This tells Express we’re using EJS as the template engine
app.set("view engine", "ejs");

//HANDLERS
//app.get(endpoint, callback)
// app.get('/', (req,res)=>{
//     res.sendFile(__dirname + "/workoutlogs.html");
// })

// app.post('/workouts',(req,res)=>{
//   console.log("Helloooooo");
//     //console.log(req.body);
// })

//DATABASE
MongoClient.connect(
  "mongodb+srv://db_User:myWorkouts@cluster0.w9kul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  }
)
  .then((client) => {
    console.log("Connected to database");
    const db = client.db("users_workouts");
    const workOutsCollection = db.collection("workouts");


      //GET
    app.get("/", (req, res) => {
      db.collection("workouts")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { workouts: results });
        })
        .catch(console.error);
    });

   
    //POST
    app.post("/workouts", (req, res) => {

      let today = new Date();
      var date = today.toLocaleString("default", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
      
      req.body.Date = date;
      
      workOutsCollection
        .insertOne(req.body)
        .then((result) => {
          //console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch(console.error);
 
