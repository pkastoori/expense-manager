const Category = require("../models/categoryModel");

const getCategories = (req, res) => {
  Category.find()
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ msg: "Error while trying to retrieve categories" });
    });
};

const getCategory = (req, res) => {
  const { id } = req.params;
  Category.findById(id)
    .then((response) => {
      if (!response) return res.status(404).json({ msg: "Category not found" });
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ msg: "Error while trying to fetch category" });
    });
};

const addCategory = (req, res) => {
  const { name, createdAt, subCategories } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Name is mandatory" });
  }

  Category.create({
    name: name,
    createdAt: new Date(createdAt),
    subCategories: subCategories,
  })
    .then((response) => {
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error while adding category" });
    });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const { subCategory } = req.body;
  Category.findByIdAndUpdate(
    id,
    {
      $push: { subCategories: subCategory },
    },
    { new: true, upsert: true }
  )
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error while updating category" });
    });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  Category.findByIdAndDelete(id)
    .then((response) => {
      return res.status(204).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error while deleting category" });
    });
};

const removeSubCategory = (req, res) => {
  const { id } = req.params;
  const { subCategory } = req.body;
  Category.findByIdAndUpdate(
    id,
    {
      $pull: { subCategories: subCategory },
    },
    { new: true, upsert: true }
  )
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Error while removing sub category" });
    });
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  removeSubCategory,
};
