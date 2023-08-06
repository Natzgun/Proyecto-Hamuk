import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (request, response) => {
  // response.send('register');
  const { username, email, password, career } = request.body;
  // console.log(request.body);

  try {
    // Esta validacion vendra desde el frontend para verificar si ya existe un usuario
    const userFound = await User.findOne({email});
    if(userFound) return response.status(400).json(["User already email exists"]);

    const passwordHash = await bcrypt.hash(password, 10); // Nos devuelve un hash

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      career,
    });
    // Cuando creamos el usuario se debe encriptar tambien la contraseña
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    response.cookie('token', token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    // en esta parte nos va devolver el json pero sin la contraseña
    response.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      career: userSaved.career,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
    // console.log(newUser);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

export const login = async (request, response) => {
  // response.send('register');
  const { email, password, career } = request.body;
  // console.log(request.body);

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return response.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, userFound.password); // Nos devuelve un hash
    if (!isMatch)
      return response.status(404).json({ message: 'Incorrect password' });

    const token = await createAccessToken({ id: userFound._id });
    response.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + (30*24*3600000)),
      domain: process.env.NODE_ENV === 'production' ? 'hamuk.vercel.app' : 'localhost'
    });
    // en esta parte nos va devolver el json pero sin la contraseña
    response.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      career: userFound.career,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
    // console.log(newUser);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

export const logout = (request, response) => {
  response.cookie('token', '', { expires: new Date(0) });
  return response.sendStatus(200);
};

export const profile = async (request, response) => {
  const userFound = await User.findById(request.user.id);
  if (!userFound)
    return response.status(400).json({ message: 'User not found in profile.' });

  return response.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    career: userFound.career,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({message: 'Unauthorized'});

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      career: userFound.career,
    });
  });
};
