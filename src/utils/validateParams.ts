import Joi, { ValidationError } from 'joi';

class ValidateParams {
  public static validateEmail = async (
    email: string
  ): Promise<{
    isValid: boolean;
    error: ValidationError | null;
  }> => {
    const schema = Joi.string().email().label('email');
    try {
      await schema.validateAsync(email);
      return {
        isValid: true,
        error: null
      };
    } catch (error) {
      return { error, isValid: false };
    }
  };

  public static validatePassword = async (
    password: string
  ): Promise<{ isValid: boolean; error: ValidationError | null }> => {
    const schema = Joi.string().min(8).max(55).label('password');
    try {
      await schema.validateAsync(password);
      return {
        isValid: true,
        error: null
      };
    } catch (error) {
      return { error, isValid: false };
    }
  };

  public static vlidateUsername = async (
    username: string
  ): Promise<{ isValid: boolean; error: ValidationError | null }> => {
    const schema = Joi.string().min(3).max(55).label('username');
    try {
      await schema.validateAsync(username);
      return {
        isValid: true,
        error: null
      };
    } catch (error) {
      return { error, isValid: false };
    }
  };
}

export default ValidateParams;
