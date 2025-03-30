var express = require('express');
var router = express.Router();
const upload = require('../src/config/multer')
const prisma = require('../src/config/prisma')

/* GET users listing. */
router.get('/:id', async (req, res, next) => {
  const userId = Number(req.params.id)
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: { files: true }
  });

  const files = user.files;

  if (req.session.userInfo && req.session.userInfo.id == userId) {
    res.render('users', { title: 'Users', username: req.session.userInfo.name, userId, files });
  } else {
    res.redirect('/login');
  }
  console.log(req.session.userInfo)

});


router.post('/:id', upload.fields([{ name: 'avatar', maxCount: 3 }]), async (req, res, next) => {
  try {

    for (let i = 0; i < req.files.avatar.length; i++) {
      const file = req.files.avatar[i];



      const madeF = await prisma.file.create({
        data: {
          filename: file.originalname,
          size: file.size,
          mimeType: file.mimetype,
          userId: req.session.userInfo.id,
          path: file.path
        }
      })
      console.log(madeF)

    }


  } catch (err) {
    console.log('U ODed')
    console.error(err)
  }

  res.redirect(req.originalUrl)
});

router.delete('/:id/logout', async (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Could not log out');
    }

    // Clear the session cookie
    res.clearCookie('connect.sid'); // 'connect.sid' is the default name

    // Redirect to home page or login page
    res.redirect('/login');
  });
});

module.exports = router;
