const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
router.use(cors());

router.put("/api/addFav", (req, res) => {
  //   console.log(req.body);
  User.findOne({
    email: req.body.email,
  }).then((response) => {
    // console.log(response);
    const userData = {
      coin: req.body.coin,
    };
    User.updateOne({ $push: { favorite: userData } })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.put("/api/addPort", (req, res) => {
  //   console.log(req.body);
  User.findOne({
    email: req.body.email,
  }).then((response) => {
    // console.log(response);
    const userData = {
      coin: req.body.coin,
      amount: req.body.amount,
      currentPrice: req.body.currentPrice,
    };
    User.updateOne({ $push: { portfolio: userData }, total: req.body.total })
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
router.post("/api/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email,
  }).then((response) => {
    // if (response) {
    //     res.status(400).json({ email: 'Email already exists' });
    //     return res.send('Email already exists');
    // } else {
    const today = new Date();
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      total: 0,
      created: today,
    };
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) throw err;
      userData.password = hash;
      User.create(userData)
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

router.post("/api/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email,
  })
    .then((response) => {
      if (response) {
        if (bcrypt.compareSync(req.body.password, response.password)) {
          console.log(response);
          const payload = {
            _id: response._id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            portfolio: response.portfolio,
            favorite: response.favorite,
            total: response.total,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            // 1 year in seconds
            expiresIn: 31556926,
          });
          res.send(token);
        } else {
          res.status(400).json({ error: "User does not exist" });
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/api/profile", (req, res) => {
  console.log(req.body);
  User.findOne({
    email: req.email,
  })
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/api/displayusers", (req, res) => {
  User.find()
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({ error: "Users do not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = router;
