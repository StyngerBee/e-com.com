const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// http://localhost:3001/api/categories
router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll(
      {
        // be sure to include its associated Products
        include: [{ model: Product}]
      }
    );
    res.json({ categoryData });
  } 
  catch (err) {

    res.status(500).json(err);
  }
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(
        req.params.id,
        {
          //includes associated product
          include: [{ model: Product }]
        }
      );
      if (!categoryData) {
        res.status(404).json({ message: 'No category with this id.'});
      }
      res.json({ categoryData });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

router.post('/', (req, res) => {
  // create a new category
  
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
