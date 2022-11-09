const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // finds all tags
  try {
    const tagData = await Tag.findAll(
      {
        // includes its associated Product data
        include: [{ model: Product, through: ProductTag}]
      }
    );
    res.json({ tagData});
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // finds a single tag by its `id`
  try {
    const atagData = await Tag.findByPk( req.params.id,
      { //includes its associated Product data
        include: [{model: Product, through: ProductTag}]
      });
    if (!atagData){
      res.status(400).json(err);
    }
    res.json({atagData});
  } catch (err) {
    res.status(500).json(err)
  }
  
});

router.post('/', async (req, res) => {
  // creates a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // deletes a tag by its `id` value
});

module.exports = router;
