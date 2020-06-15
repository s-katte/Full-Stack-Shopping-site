const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("./../controllers/user");
const {
  isSignedIn,
  isAdmin,
  isAuthenticated,
} = require("./../controllers/auth");

router.param("userId", getUserById);

//GET user by ID
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//UPDATE user information
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

//GET order list
router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
