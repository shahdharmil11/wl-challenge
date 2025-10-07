import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class User extends Model {
  public id!: number;
  public email!: string;
  public password_hash?: string;
  public is_registered!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_registered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

export class FormSubmission extends Model {
  public id!: number;
  public user_id!: number;
  public answers_json!: Record<string, string>;
  public readonly submitted_at!: Date;
}

FormSubmission.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  answers_json: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  submitted_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'FormSubmission',
  tableName: 'form_submissions',
  timestamps: false,
});

// Define associations
User.hasMany(FormSubmission, { foreignKey: 'user_id', as: 'submissions' });
FormSubmission.belongsTo(User, { foreignKey: 'user_id', as: 'user' });