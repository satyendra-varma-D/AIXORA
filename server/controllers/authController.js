import { db } from '../config/db.js';
import { authService } from '../services/authService.js';

export const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Please enter both email and password.' });
      }

      const user = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password. Please try again.' });
      }

      const isMatch = await authService.verifyPassword(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password. Please try again.' });
      }

      // old frontend logic expects requiresMFA flag
      return res.json({
        success: true,
        requiresMFA: true,
        user: {
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  verifyMfa: async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!otp || otp.length < 6) {
        return res.status(400).json({ error: 'Please enter the complete 6-digit PIN.' });
      }

      if (otp !== '909090') {
        return res.status(401).json({ error: 'Invalid PIN. Please try again.' });
      }

      const user = db.users.find(u => u.email.toLowerCase() === (email || 'varma@yopmail.com').trim().toLowerCase());
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { accessToken, refreshToken } = authService.generateTokens(user);

      // Set cookie secure parameters
      res.cookie('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 mins
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      return res.json({
        success: true,
        authenticated: true,
        token: accessToken,
        refreshToken,
        user: {
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Error during MFA verification:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  profile: async (req, res) => {
    return res.json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
      }
    });
  },

  logout: async (req, res) => {
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    return res.json({ success: true, message: 'Logged out successfully.' });
  }
};
