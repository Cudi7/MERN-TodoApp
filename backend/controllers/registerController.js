const app = require('express');
const User = require('../config/models/UserModel');
const bcrypt = require('bcrypt');

const route = app.Router();

route.post('/', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const securePassword = await bcrypt.hash(req.body.password, 10);

  try {
    const existingUser = await User.find({ email });

    if (existingUser.length)
      return res.status('400').json({ error: `User ${email} already exists` });

    const newUser = await User.create({
      name,
      email,
      password: securePassword,
    });

    res.status('200').json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status('500').json({ error: error.message });
  }
});

module.exports = route;
