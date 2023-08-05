import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (request, response, next) => {
  const { token } = request.cookies;
  if (!token)
    return response.status(401).json({ message: 'No token, Unauthorized' });

  jwt.verify(token, TOKEN_SECRET, (err, userDecoded) => {
    if (err) return response.status(403).json({ message: 'Invalid Token' });
    request.user = userDecoded;
    next();
  });
};
