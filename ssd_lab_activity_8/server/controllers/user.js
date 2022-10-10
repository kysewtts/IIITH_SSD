const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signUp = (req, res, next) => {
  const roll = req.body.roll;
  const password = req.body.password;
  const role = req.body.role;

  console.log("User Signup");

  User.findOne({ roll, role })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            const user = new User({
              roll,
              password: hashedPassword,
              role,
            });
            return user.save();
          })
          .then((info) => {
            res
              .status(201)
              .json({ message: "New User Created", userId: info._id, roll });
          });
      } else {
        res.status(403).json({
          message: `User with rollNo: ${roll} and role: ${role} already exists`,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const roll = req.body.roll;
  const password = req.body.password;
  const role = req.body.role;
  console.log("User login");
  let loadedUser;
  User.findOne({ roll, role })
    .then((user) => {
      if (!user) {
        const error = new Error(`No user with roll number ${roll} found!`);
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Incorrect Password!");
        error.statusCode = 401;
        throw error;
      }
      const userSession = {
        roll: loadedUser.roll,
        role: loadedUser.role,
      };
      req.session.user = userSession;
      res.status(200).json({
        message: "Login successful",
        userSession: userSession,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.isAuth = (req, res, next) => {
  // console.log(req.session);
  if (req.session.user) {
    res.status(200).json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.status(200).json({
      loggedIn: false,
    });
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err && !err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
    res.clearCookie(process.env.SESSION_NAME);
    res.status(200).json({
      message: "Logout successful",
    });
  });
};
