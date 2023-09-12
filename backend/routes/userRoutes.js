import { Router } from "express";
import { login, singup } from "../controllers/userController.js";
import { check } from "express-validator";

const router = Router();

router.post(
  "/login",
  [
    check("username").notEmpty().withMessage("Username is Required"),
    //   .isString()
    //   .withMessage("The input should be a string!"),
    check("password").notEmpty().withMessage("Password is Required"),
    //   .isString()
    //   .withMessage("The input should be a string!"),
  ],
  login
);

process.env.NODE_ENV !== "production" &&
  router.post(
    "/signup",
    [
      check("username").notEmpty().withMessage("Username is Required"),
      check("password").notEmpty().withMessage("Password is Required"),
    ],
    singup
  );

export default router;
