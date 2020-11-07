const jwt = require('jsonwebtoken');

export const auth = (req: any, res: any, next: any) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'auth error' });

  try {
    const decoded = jwt.verify(token, 'randomString');
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'invalid token' });
  }
};
