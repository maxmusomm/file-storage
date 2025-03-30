var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    res.render('index', { title: 'Express' });

  } catch (err) {
    if (!res.headersSent) {
      next(err)
    }
  }
});

module.exports = router;
