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

module.exports = { getRefreshToken, postLogout, postLogin, postRegister };
