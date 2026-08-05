import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-aixora-2026-delivery-platform';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'another-super-secret-refresh-key-for-aixora-2026';

export const authService = {
  verifyPassword: async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
  },

  generateTokens: (user) => {
    const payload = { id: user.id, email: user.email, name: user.name };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  },

  verifyAccessToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null;
    }
  },

  verifyRefreshToken: (token) => {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  }
};
