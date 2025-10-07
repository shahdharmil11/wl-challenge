export interface User {
  id: number;
  email: string;
  password_hash?: string;
  is_registered: boolean;
  created_at: Date;
}

export interface FormSubmission {
  id: number;
  user_id: number;
  answers_json: Record<string, string>;
  submitted_at: Date;
}

export interface FormAnswers {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  question10: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface SubmitFormRequest {
  email: string;
  answers: FormAnswers;
}