const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!singleTagData) {
      return res.status(404).json('No tag found by id');
    }
    return res.status(200).json(singleTagData);
  } catch (err) {
    return res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    return res.status(200).json(newTagData);
  } catch (err) {
    return res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateTagData) {
      return res.status(500).json({message: 'No tag found to update'});
    } else {
      return res.status(200).json(updateTagData);
    };
  } catch (err) {
    return res.status(500).json(err);
  };
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
