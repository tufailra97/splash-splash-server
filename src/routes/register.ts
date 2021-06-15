import { Router, Request, Response } from 'express';

import { Database } from 'services';
import { ValidateParams } from 'utils';

const router = Router();

interface IRegisterRequest extends Request {
  body: {
    username: string;
    password: string;
    email: string;
  };
}

router.post(
  '/register',
  async (request: IRegisterRequest, response: Response) => {
    let errors: string[] = [];
    const { username, password, email } = request.body;
    const validatedEmail = await ValidateParams.validateEmail(email);
    const validatedPassword = await ValidateParams.validatePassword(password);
    const validatedUsername = await ValidateParams.vlidateUsername(username);

    if (!validatedEmail.isValid) {
      const errorMessage = validatedEmail.error?.details[0].message as string;
      errors.push(errorMessage);
    }

    if (!validatedPassword.isValid) {
      const errorMessage = validatedPassword.error?.details[0]
        .message as string;
      errors.push(errorMessage);
    }

    if (!validatedUsername.isValid) {
      const errorMessage = validatedUsername.error?.details[0]
        .message as string;
      errors.push(errorMessage);
    }

    if (
      !validatedEmail.isValid ||
      !validatedPassword.isValid ||
      !validatedUsername.isValid
    ) {
      return response.status(404).json({ errors });
    }

    try {
      const query = await Database.getPool().query(
        `INSERT INTO users (email, password, username) VALUES($1, $2, $3) RETURNING *`,
        [email, password, username]
      );

      response.json({
        query
      });
    } catch (error) {
      response.status(501).json('Internal Server Error');
    }
  }
);

export default router;
