"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDatabase = exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Database configuration
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'wl_challenge',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    logging: false, // Set to console.log to see SQL queries
});
// Test database connection
const testConnection = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('✅ Database connection established successfully');
        return true;
    }
    catch (error) {
        console.error('❌ Unable to connect to database:', error);
        return false;
    }
};
exports.testConnection = testConnection;
// Sync database (create tables)
const syncDatabase = async () => {
    try {
        await exports.sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
        console.log('✅ Database synchronized successfully');
        return true;
    }
    catch (error) {
        console.error('❌ Database sync failed:', error);
        return false;
    }
};
exports.syncDatabase = syncDatabase;
//# sourceMappingURL=database.js.map