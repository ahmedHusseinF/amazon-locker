import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const auth_header = req.headers['authorization'];

  if (!auth_header) {
    return res.status(401).json({
      error: 'Token not provided',
    });
  }

  const [, token] = auth_header.split(' ');

  try {
    const { user_id, email } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { user_id, email };
    return next();
  } catch (error) {
    return res.status(403).json({
      error: 'Token is not valid',
    });
  }
};
