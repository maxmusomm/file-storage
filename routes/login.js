var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('../src/config/prisma');


/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(req.session);
  res.render('login');
});

router.post('/', async (req, res, next) => {
  const { name, password } = req.body;
  console.log(req.body)
  const user = await prisma.user.findFirst({
    where: {
      name: name,
    }
  });
  if (!user) {
    res.status(400).send('User not found');
    return res.redirect('/login')
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Invalid password');
  }
  req.session.userInfo = { id: user.id, name: user.name };
  res.redirect(`/users/${req.session.userInfo.id}`);
});

module.exports = router;
