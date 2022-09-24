const express = require("express");
const {
  getExpenses,
  addExpense,
  updateExpense,
  getExpensesByName,
  getExpensesByDate,
  deleteExpense,
  sumOfExpenses,
} = require("../controllers/expenseController");
const router = express.Router();

router.route("/").get(getExpenses).post(addExpense);
router.route("/:id").put(updateExpense).delete(deleteExpense);
router.route("/name/:name").get(getExpensesByName);
router.route("/purchaseDate/:purchaseDate").get(getExpensesByDate);
router.route("/total?*").get(sumOfExpenses);

module.exports = router;
