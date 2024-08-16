const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken 
};


async function login(req, res) {
    try {
      console.log('Attempting to log in:', req.body.email);
      
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error("User not found");
      
      console.log('User found:', user.email);
      console.log('Password provided:', req.body.password);
      console.log('Stored password hash:', user.password);
      
      if (!req.body.password || !user.password) {
        throw new Error("Password not provided or stored");
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error("Incorrect password");
      
      console.log('Password matched for user:', user.email);
  
      const token = createJWT(user);
      if (!token) throw new Error("Token creation failed");
  
      console.log('Token created for user:', user.email);
      
      res.json(token);
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(400).json("Bad Credentials");
    }
  }
  
  

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}