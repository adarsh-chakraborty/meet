const User = require('../model/User');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken
} = require('../util/auth');

const onlineUsers = require('../util/onlineUsers');

const getRefreshToken = (req, res) => {
  res.send('Web Server is running fine.');
};

const postLogout = (req, res) => {
  res.send('Web Server is running fine.');
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Missing fields, username and password required.' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: 'User does not exists.' });
  }

  user.comparePassword(password, async (err, isMatch) => {
    if (err) {
      return res
        .status(401)
        .json({ error: 'Invalid username, password combination.' });
    }
    console.log(isMatch);
    if (isMatch) {
      const payload = { userId: user._id.toString() };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      const result = await User.findByIdAndUpdate(user._id, { refreshToken });
      console.log(result);
      res.cookie('rt', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        signed: true
      });
      return res.status(202).json({ message: 'Logged in', token: accessToken });
    }
    return res
      .status(403)
      .json({ error: 'Invalid username, password combination.' });
  });
};

const postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Missing fields, username, email, password required' });
  }

  try {
    const checkUser = await User.findOne({ $or: [{ username }, { email }] });
    if (checkUser) {
      return res
        .status(400)
        .json({ error: 'Username or email already registered.' });
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

const postRefreshAccessToken = async (req, res) => {
  const rt = req.signedCookies?.rt?.trim?.();
  console.log(rt);
  if (!rt) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const decodedPayload = verifyRefreshToken(rt);
  if (!decodedPayload) {
    res.clearCookie('rt');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // cookie verified but do we still recognize it?
  // Get refreshToken that we have
  const user = await User.findById(decodedPayload.userId);
  // Check if refreshToken is same
  if (rt === user.refreshToken) {
    // Token is same but is our token expired?
    const decoded2 = verifyRefreshToken(user.refreshToken);
    if (!decoded2) {
      res.clearCookie('rt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // OK Valid Token on both end, Give a new acess Token
    const newToken = generateAccessToken({ userId: user._id });
    return res.status(202).json({ token: newToken });
  }
  return res.json({ error: 'expired token' });
};

const postUserNameForPeerId = async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (!user.peerId) {
    return res.status(409).json({ error: 'User is not online.' });
  }
  res.json({ peerId: user.peerId });
};

module.exports = {
  getRefreshToken,
  postLogout,
  postLogin,
  postRegister,
  getUsernameExistance,
  postRefreshAccessToken,
  postUserNameForPeerId
};
