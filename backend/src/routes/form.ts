import express from 'express';
import { User, FormSubmission } from '../models';

const router = express.Router();

// Submit form route
router.post('/submit', async (req, res) => {
  try {
    const { email, answers } = req.body;

    if (!email || !answers) {
      return res.status(400).json({ error: 'Email and answers are required' });
    }

    // Find or create user
    let user = await User.findOne({ where: { email } });
    
    if (!user) {
      // Create anonymous user
      user = await User.create({
        email,
        is_registered: false,
      });
    }

    // Create form submission
    const submission = await FormSubmission.create({
      user_id: user.id,
      answers_json: answers,
    });

    res.status(201).json({
      message: 'Form submitted successfully',
      submission: {
        id: submission.id,
        submitted_at: submission.submitted_at,
      },
    });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's submissions (requires authentication)
router.get('/submissions', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const submissions = await FormSubmission.findAll({
      where: { user_id: req.session.userId },
      order: [['submitted_at', 'DESC']],
    });

    res.json({
      submissions: submissions.map(sub => ({
        id: sub.id,
        answers: sub.answers_json,
        submitted_at: sub.submitted_at,
      })),
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;