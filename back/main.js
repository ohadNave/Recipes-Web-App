//  Import importent libraries
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("client-sessions");
const cors = require("cors");
require('dotenv').config();

// Application settings
const app = express();
const port = process.env.PORT || 3000;

const corsConfig = {
  origin : true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan(":method url :status :response-time ms"));

app.use(
  session({
    cookieName: "session",
    secret:process.env.COOKIE_SEC,
    duration:  24*1000*3600,
    activeDuration: 0, 
  })
);

//    Import resources
const user = require("./routes/user");
const recipes = require("./routes/recipes");
const auth = require("./routes/auth");


// Routing
app.use("/user", user);
app.use("/recipes", recipes);
app.use("/", auth); //without prefix! 



app.listen(port, () => {
    console.log(`Recipes API listening on port ${port}`)
})

app.use((req,res) => { 
  res.sendStatus(404); 
});


// error middleware
app.use(function (err, req, res, next) {
    console.error(err);
    if(error.status){
      res.status(error.status).send(error.message);
    }else{
      res.status(500).send(error)
    }
  });