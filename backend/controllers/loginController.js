const app = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const route = app.Router();

route.post('/', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.find({ email });

    if (!existingUser.length)
      return res.status('500').json({ error: "This user doesn't exist" });

    const correctPassword = await bcrypt.compare(
      password,
      existingUser[0].password
    );

    if (!correctPassword)
      return res.status('400').json({ error: 'Incorrect password' });
    else
      res.status('200').json({
        id: existingUser[0].id,
        name: existingUser[0].name,
        email: existingUser[0].email,
      });
  } catch (error) {
    res.status('500').json(error.message);
  }
});

module.exports = route;
