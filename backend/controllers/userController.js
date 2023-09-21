import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { validationResult } from "express-validator";

// Route : POST /api/users/login
// Access : Public
// Description : Authenticates user
const login = asyncHandler(async (req, res) => {
  const { errors } = validationResult(req);

  if (errors.length !== 0) {
    let errorMessages = [];

    errors.forEach((error) => errorMessages.push(error.msg));

    return res.status(422).json({ errorMessages: errorMessages });
  }

  const { username, password } = req.body;

  console.log(req.body);

  const user = await User.findOne({ username, password });

  if (user) {
    res.status(200).json({
      message: "You have logged in Successfully",
      flag: process.env.FLAG,
    });
    username, password;
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// Route : POST /api/users/signup
// Access : Public
// Description : Register user
const singup = asyncHandler(async (req, res) => {
  const { errors } = validationResult(req);

  if (errors.length !== 0) {
    let errorMessages = [];

    errors.forEach((error) => errorMessages.push(error.msg));

    return res.status(422).json({ errorMessages: errorMessages });
  }

  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  const user = await User.create({ username, password });

  if (user) {
    res.status(201).json({
      message: "You have signed up in successfully",
      username,
      password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

export { login, singup };
