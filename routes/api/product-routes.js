const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category}, {model: Tag}]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id` be sure to include its associated Category and Tag data
  try {
    const singleProductData = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}]
    });
    if (!singleProductData) {
      return res.status(500).json({ message: 'No Product Found by id'});
    }
    res.status(200).json(singleProductData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // find, update, and product data
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);
    await product.save();
    // set tags if passed in req.body
    if (req.body.tagIds) {
      await product.setTags(req.body.tagIds);
    };
    res.json(await product.getTags());
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json(productData);  
  } catch (err){
    return res.status(500).json(err);
  };
});

module.exports = router;
