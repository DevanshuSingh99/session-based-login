const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter"); // Import the router

router.use(`/user`, userRouter); // Use the imported router

module.exports = router; // Export the main router
