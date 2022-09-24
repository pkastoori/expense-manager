const Expense = require("../models/expenseModel");

const getExpenses = (req, res) => {
  Expense.find()
    .sort("-purchaseDate")
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error while retrieving expenses" });
    });
};

const addExpense = (req, res) => {
  const { name, quantity, price, purchaseDate, comment } = req.body;
  if (!name || !quantity || !price || !purchaseDate)
    return res.status(400).json({ msg: "Please enter all the fields" });
  Expense.create({
    name,
    quantity,
    price,
    purchaseDate: new Date(purchaseDate),
    comment,
  })
    .then((response) => {
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error while adding the expense" });
    });
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { name, price, purchaseDate, quantity, comment } = req.body;
  if (!name || !quantity || !price || !purchaseDate)
    return res.status(400).json({ msg: "Please enter all the fields" });
  Expense.findByIdAndUpdate(
    id,
    {
      name,
      price,
      comment,
      quantity,
      purchaseDate: new Date(purchaseDate),
    },
    { new: true }
  )
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error while updating the expense" });
    });
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  Expense.findByIdAndDelete(id)
    .then((response) => {
      return res.status(204).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error while deleting the expense" });
    });
};

const getExpensesByName = (req, res) => {
  const { name } = req.params;
  Expense.find({ name: { $regex: name, $options: "i" } })
    .sort("-purchaseDate")
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error searching for expense" });
    });
};

const getExpensesByDate = (req, res) => {
  const { purchaseDate } = req.params;
  Expense.find({ purchaseDate: new Date(purchaseDate) })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error searching for expense" });
    });
};

const sumOfExpenses = (req, res) => {
  const { start, end } = req.query;
  Expense.aggregate([
    {
      $match: { purchaseDate: { $gte: new Date(start), $lte: new Date(end) } },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$price" },
      },
    },
  ])
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error adding up expenses" });
    });
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getExpensesByName,
  getExpensesByDate,
  sumOfExpenses,
};
