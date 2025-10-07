import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    let user = await User.findOne({ where: { email } });
    
    if (user && user.is_registered) {
      return res.status(400).json({ error: 'User already registered' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    if (user && !user.is_registered) {
      // Update existing anonymous user to registered
      await user.update({
        password_hash,
        is_registered: true,
      });
    } else {
      // Create new user
      user = await User.create({
        email,
        password_hash,
        is_registered: true,
      });
    }

    // Set session
    req.session.userId = user.id;
    req.session.userEmail = user.email;

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        is_registered: user.is_registered,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find registered user
    const user = await User.findOne({ 
      where: { email, is_registered: true } 
    });

    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set session
    req.session.userId = user.id;
    req.session.userEmail = user.email;

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        is_registered: user.is_registered,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logout successful' });
  });
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await User.findByPk(req.session.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        is_registered: user.is_registered,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;