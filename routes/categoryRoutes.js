const express = require("express");
const {
  getCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  removeSubCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/").get(getCategories).post(addCategory);
router
  .route("/:id")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);
router.route("/sub/:id").patch(removeSubCategory);

module.exports = router;
