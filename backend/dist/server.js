"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Basic middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
// Basic routes
app.get('/', (req, res) => {
    res.json({
        message: 'WL Challenge API Server',
        status: 'Running',
        timestamp: new Date().toISOString()
    });
});
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        port: PORT,
        database: 'Connected' // This will be dynamic later
    });
});
// Start server with database connection
const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await (0, database_1.testConnection)();
        if (dbConnected) {
            // Sync database
            await (0, database_1.syncDatabase)();
        }
        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Backend server running at http://localhost:${PORT}`);
            console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
            if (dbConnected) {
                console.log(`🗄️  Database connected and synchronized`);
            }
            else {
                console.log(`⚠️  Server running without database connection`);
            }
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map