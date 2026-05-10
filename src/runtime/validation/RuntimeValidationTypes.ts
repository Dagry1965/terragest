export interface RuntimeFieldValidation {
  required?: boolean;

  min?: number;

  max?: number;

  minLength?: number;

  maxLength?: number;

  email?: boolean;

  beforeToday?: boolean;
}

export interface RuntimeValidationError {
  field: string;
  message: string;
}