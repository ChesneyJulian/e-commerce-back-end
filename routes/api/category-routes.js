const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value be sure to include its associated Products
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!singleCategoryData) {
      return res.status(500).json({ message: 'No Category Found by id'});
    }
    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create(req.body);
    return res.status(200).json(newCategoryData);
  } catch (err) {
    return res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryData = await Category.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }) 
    if (!updateCategoryData) {
      return res.status(500).json({ message: 'Cannot update category'});
    } else {
      return res.status(200).json(updateCategoryData);
    }
  } catch(err) {
    return res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({message: 'Category Deleted'});
  } catch (err) {
    return res.status(500).json(err);
  };
});

module.exports = router;
