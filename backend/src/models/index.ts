import { sequelize } from '../config/database';
import User from './User';
import FormSubmission from './FormSubmission';

// Define model associations
const initializeAssociations = () => {
  // User has many FormSubmissions
  User.hasMany(FormSubmission, {
    foreignKey: 'userId',
    as: 'formSubmissions',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // FormSubmission belongs to User
  FormSubmission.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

// Initialize associations
initializeAssociations();

// Export all models and database instance
export {
  sequelize,
  User,
  FormSubmission,
  initializeAssociations,
};

// Export model interfaces for type checking
export type { UserAttributes, UserCreationAttributes } from './User';
export type { FormSubmissionAttributes, FormSubmissionCreationAttributes } from './FormSubmission';

// Default export for convenience
export default {
  sequelize,
  User,
  FormSubmission,
  initializeAssociations,
};