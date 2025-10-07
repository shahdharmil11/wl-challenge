"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
// Submit form route
router.post('/submit', async (req, res) => {
    try {
        const { email, answers } = req.body;
        if (!email || !answers) {
            return res.status(400).json({ error: 'Email and answers are required' });
        }
        // Find or create user
        let user = await models_1.User.findOne({ where: { email } });
        if (!user) {
            // Create anonymous user
            user = await models_1.User.create({
                email,
                is_registered: false,
            });
        }
        // Create form submission
        const submission = await models_1.FormSubmission.create({
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
    }
    catch (error) {
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
        const submissions = await models_1.FormSubmission.findAll({
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
    }
    catch (error) {
        console.error('Get submissions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=form.js.map