const express = require("express");

const route = express.Router();
const Admin = require("../models/admin");

route.get("/adminRagister", function (req, res, next) {
  res.render("admin/signin.ejs");
});

route.post("/adminRagister", async function (req, res, next) {
  var personInfo = req.body;
  console.log(req.body);

  if (personInfo.password == personInfo.passwordConf) {
    const newAdmin = new Admin({
      email: personInfo.email,
      username: personInfo.username,
      password: personInfo.password,
      passwordConf: personInfo.passwordConf,
    });
    await newAdmin.save();
  } else {
    res.send({ Success: "password is not matched" });
  }
});
route.get("/adminLogin", (req, res) => {
  res.render("admin/login.ejs");
});
route.post("/adminLogin", function (req, res, next) {
  Admin.findOne({ username: req.body.username })
    .then((data) => {
      if (data) {
        if (data.password === req.body.password) {
          res.redirect("/productList");
        } else {
          res.send({ Success: "Wrong password!" });
        }
      } else {
        res.send({ Success: "This Email Is not registered!" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ Error: "Internal Server Error" });
    });
});

route.get("/forgetpass", (req, res) => {
  res.render("admin/forget.ejs");
});

route.post("/forgetpass", function (req, res, next) {
  
  Admin.findOne({ email: req.body.email }, function (err, data) {
    console.log(data);
    if (!data) {
      res.send({ Success: "This Email Is not regestered!" });
    } else {
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save(function (err, Person) {
          if (err) console.log(err);
          else console.log("Success");
          res.send({ Success: "Password changed!" });
        });
      } else {
        res.send({
          Success: "Password does not matched! Both Password should be same.",
        });
      }
    }
  });
});

module.exports = route;
