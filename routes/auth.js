/**
 * path: api/login
 */

const { Router } = require("express");
const { createUser } = require("../controllers/auth");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/new",
  [check("name", "name is required").not().isEmpty()],
  createUser
);

module.exports = router;
