const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: Product,
  }).then((data) => {
    res.json(data);
  });
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // const response = await Category.findByPk(req.params.id, { include: Product });

  // res.json(response);

  Category.findByPk(req.params.id, {
    include: Product,
  }).then((data) => {
    res.json(data);
  });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body).then((newCategory) => {
    res.json(newCategory);
  });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedData) => {
    res.json(updatedData);
  });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deletedStatus) => {
    res.json(deletedStatus);
  });
});

module.exports = router;
