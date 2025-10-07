"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSubmission = exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    is_registered: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
});
class FormSubmission extends sequelize_1.Model {
}
exports.FormSubmission = FormSubmission;
FormSubmission.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    answers_json: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
    },
    submitted_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'FormSubmission',
    tableName: 'form_submissions',
    timestamps: false,
});
// Define associations
User.hasMany(FormSubmission, { foreignKey: 'user_id', as: 'submissions' });
FormSubmission.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
//# sourceMappingURL=index.js.map