const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: {
      model: Product,
    },
  });
  res.json(tags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag = await Tag.findByPk(req.params.id, {
    include: {
      model: Product,
    },
  });
  res.json(tag);
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    const productIds = req.body.productIds;
    await tag.addProducts(productIds);
    res.json("Tag created.");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ error: "Tag does not exist." });
    }
    const { tag_name, productIds } = req.body;
    // Removes existing products
    await tag.setProducts([]);

    // Updating tag_name
    await tag.update({ tag_name });

    // Adding new produts
    if (productIds) {
      const products = await Product.findAll({
        where: { id: productIds },
      });
      await tag.addProducts(products);
    }
    res.json({ message: "Tag updated." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.json({ message: "Tag deleted." });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
