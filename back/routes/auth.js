
const express = require("express");
const router = express.Router();
const Bcryptjs = require("bcryptjs");
const DButils = require("./DButils");


router.post("/login", async (req, res, next) => {
  try {
      let user_name = req.body.username;
      let password = req.body.password;
      let user_data = (await DButils.execQuery(`SELECT * FROM dbo.users WHERE username = ('${user_name}')`))[0];
      if (!user_data)
        throw { status: 400, message: "Incorrect username or Password " };
      if (!Bcryptjs.compareSync(password, user_data.password)) {
        throw { status: 400, message: "Incorrect username or Password " };
       }
      req.session.user_id = user_data.user_id;
      res.status(200).send({ message: "Login succeeded", success: true });
  } catch (error) {
    console.log(error);
    if(error.status){
    res.status(error.status).send(error.message);
    }else{
      res.status(500).send(error);
    }  }
});


  router.post("/register", async (req, res, next) => {
    try {
      const users = await DButils.execQuery("SELECT username FROM dbo.users");
      if (users.find((x) => x.username === req.body.username))
        throw { status: 400, message: "Username taken" };
      if (req.body.passwordAgain != req.body.password)
        throw { status: 400, message: "Passwords is not identical." };
      let hash_password = Bcryptjs.hashSync(req.body.password,14);
      let firstName= req.body.first_name;
      let lastName= req.body.last_name;
      let country= req.body.country;
      let email= req.body.email;
      let image= req.body.image;
      await DButils.execQuery(
        `INSERT INTO dbo.users (username, password,first_name,last_name,email,image,country) VALUES ('${req.body.username}', '${hash_password}', '${firstName}', '${lastName}', '${email}','${image}','${country}')`
      );
      res.status(201).send("user created");
    } catch (error) {
      console.log(error);
      if(error.status){
      res.status(error.status).send(error.message);
      }else{
        res.status(500).send(error);
      }
    }
  });


  router.post("/Logout", function (req, res) {
    try{
    if(req.session.user_id){
      req.session.reset(); 
      res.send({ success: true, message: "logout succeeded" });
    }else{
      throw { status: 400, message: "no user associated with session" };
    }
    }catch (err){
      if(err.status){
        res.status(err.status).send(err.message);
        }else{
          res.status(500).send(err);
        }
    }
  });
  module.exports = router;
