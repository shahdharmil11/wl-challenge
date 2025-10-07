import { Model } from 'sequelize';
export declare class User extends Model {
    id: number;
    email: string;
    password_hash?: string;
    is_registered: boolean;
    readonly created_at: Date;
    readonly updated_at: Date;
}
export declare class FormSubmission extends Model {
    id: number;
    user_id: number;
    answers_json: Record<string, string>;
    readonly submitted_at: Date;
}
//# sourceMappingURL=index.d.ts.map