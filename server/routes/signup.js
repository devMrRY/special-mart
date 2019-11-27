const express = require("express");
const router = express.Router();
const user = require("../views/models/user");
const jwt = require("jwt-simple");
const nodemailer = require("nodemailer");
const config = require("../config/config");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// api to register user for the first time

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    await user.findOne({ email }).then(val => {
      if (!val) {
        const d = new Date();
        const time = d.getTime();
        const token = jwt.encode(
          { email, username, password, time },
          process.env.SECRET_KEY || 'mujhe kya pta'
        );
        console.log(`http:localhost:8080/verify/${token}`);
        ////////
        var transporter = nodemailer.createTransport({
          host: "mail.vinove.com",
          secure: false,
          port: 587,
          auth: {
            user: "rahul.yadav1@mail.vinove.com", // sender's mail address
            pass: "rahul@2019" // sender's password
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        var mailOptions = {
          from: "rahul.yadav1@mail.vinove.com", // sender's mail id
          to: email, // receiver's mail id
          subject: "link to confirm password",
          text: `http:localhost:8080/verify/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            throw error;
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        console.log("mail sending");
        res.send(
          `verification mail has been send to ${email} please verify your account`
        );
      } else {
        res.send("email already exists");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
});

// api to verify token

router.get("/verify/:token", async (req, res, next) => {
  try {
    const decodedtoken = jwt.decode(req.params.token, process.env.SECRET_KEY||'mujhe kya pta');
    const { username, email, password, time } = decodedtoken;
    const d = new Date();
    const t = d.getTime();
    if (t - time <= 300000) {
      await user.insertMany({ username, email, password });
      res.send("email verified successfully");
    } else {
      res.send("email link expired");
    }
  } catch {
    res.send("error 404 page not found");
  }
});

// api to signin user only if credentials match

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    var val = await user.findOne({ email: email, password: password });
    if (val !== null) {
      let d = new Date();
      const time = d.getTime();
      const token = jwt.encode({ email, time }, config.SECRET_KEY);
      await user.updateOne({ email }, { token: token });
      res.send(token);
    } else {
      res.send("credentials doesn not match");
    }
  } catch (err) {
    res.send(err.message);
  }
});

// api to logout user.

router.get("/logout", async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const { email } = jwt.decode(token, process.env.SECRET_KEY);
    await user
      .updateOne({ email }, { token: "" })
      .then(val => {
        res.send(val);
      })
      .catch(() => {
        res.send("some error occured");
      });
  } catch {
    res.send("404 page not found");
  }
});

module.exports = router;
