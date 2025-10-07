import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// FormSubmission attributes interface
export interface FormSubmissionAttributes {
  id: number;
  userId: number;
  responses: Record<string, any>; // JSON object to store all form responses
  isCompleted: boolean;
  submittedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Optional attributes for creation
export interface FormSubmissionCreationAttributes extends Optional<FormSubmissionAttributes, 'id' | 'isCompleted' | 'submittedAt' | 'createdAt' | 'updatedAt'> {}

// FormSubmission model class
export class FormSubmission extends Model<FormSubmissionAttributes, FormSubmissionCreationAttributes> implements FormSubmissionAttributes {
  public id!: number;
  public userId!: number;
  public responses!: Record<string, any>;
  public isCompleted!: boolean;
  public submittedAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance methods
  public getResponseCount(): number {
    return Object.keys(this.responses || {}).length;
  }

  public getResponse(questionKey: string): any {
    return this.responses?.[questionKey] || null;
  }

  public setResponse(questionKey: string, value: any): void {
    if (!this.responses) {
      this.responses = {};
    }
    this.responses[questionKey] = value;
  }

  public markAsCompleted(): void {
    this.isCompleted = true;
    this.submittedAt = new Date();
  }
}

// Initialize the FormSubmission model
FormSubmission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    responses: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
      validate: {
        isValidJSON(value: any) {
          if (typeof value !== 'object' || value === null) {
            throw new Error('Responses must be a valid JSON object');
          }
        },
      },
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'FormSubmission',
    tableName: 'form_submissions',
    timestamps: true,
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['isCompleted'],
      },
      {
        fields: ['submittedAt'],
      },
    ],
  }
);

export default FormSubmission;