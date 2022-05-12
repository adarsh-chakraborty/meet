const User = require('../model/User');

const getRefreshToken = (req, res) => {
  res.send('Web Server is running fine.');
};

const postLogout = (req, res) => {
  res.send('Web Server is running fine.');
};

const postLogin = (req, res) => {
  return res
    .status(500)
    .json({ error: 'Error creating user, try again later.' });
};

const postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Missing fields, username, email, password required' });
  }

  try {
    const checkUser = await User.findOne({ username });
    if (checkUser) {
      return res.status(400).json({ error: 'Username already registered.' });
    }

    const user = await User.create({
      username,
      email,
      password,
      refreshToken: null
    });
    if (user) {
      return res.status(201).json({ result: 'success, user created!' });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Error creating user, try again later.' });
  }
  return res
    .status(500)
    .json({ error: 'Error creating user, try again later.' });
};

const getUsernameExistance = async (req, res) => {
  const username = req.params.username;

  if (username.length < 4) {
    return res.json({
      available: false,
      message: 'Username should be atleast 4 chars long.'
    });
  }
  const user = await User.findOne({ username });
  if (user) {
    return res.json({
      available: false,
      message: 'Username is taken, choose another.'
    });
  }
  res.json({ available: true, message: 'Username is available' });
};

module.exports = {
  getRefreshToken,
  postLogout,
  postLogin,
  postRegister,
  getUsernameExistance
};
