"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const database_1 = require("./config/database");
const auth_1 = __importDefault(require("./routes/auth"));
const form_1 = __importDefault(require("./routes/form"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use(express_1.default.json());
// Session configuration
app.use((0, express_session_1.default)({
    secret: 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/form', form_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
// Start server
const startServer = async () => {
    try {
        await database_1.sequelize.authenticate();
        console.log('Database connection established successfully');
        await database_1.sequelize.sync();
        console.log('Database synchronized');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map