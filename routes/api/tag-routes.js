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

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
