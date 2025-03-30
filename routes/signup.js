var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('../src/config/prisma'); // Uncommented and fixed

/* GET signup page */
router.get('/', function (req, res, next) {
  res.render('signup');
});

/* POST signup page */
router.post('/', async (req, res) => {
  try {
    const { name, password, repassword } = req.body;

    // Input validation
    if (!name || !password) {
      return res.status(400).send('Name and password are required');
    }

    if (password !== repassword) {
      return res.status(400).send('Passwords do not match');
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { name: name }
    });
    if (existingUser) {
      return res.status(400).send('The user with this name already exists');
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword
      }
    });

    // Set session and redirect
    req.session.userId = user.id;
    console.log('New user created:', user);
    res.redirect('/login');

  } catch (error) {
    console.error('Signup error:', error);
    if (!res.headersSent) {
      res.status(500).send('An error occurred during signup');
    }
  }
});

module.exports = router;