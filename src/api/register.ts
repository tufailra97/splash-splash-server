import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

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
      return response.status(httpStatus.BAD_REQUEST).json({ errors });
    }

    const emails = await Database.pool.query(
      `SELECT email FROM users where email = $1`,
      [email]
    );

    if (emails.rows.length)
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: [`Email ${email} is already in use.`] });

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const query = await Database.pool.query(
        `INSERT INTO users (email, password, username) VALUES($1, $2, $3) RETURNING *`,
        [email, hashedPassword, username]
      );

      response.status(httpStatus.OK).json({
        message: 'User has been created successfully',
        data: { userId: query.rows[0].userid }
      });
    } catch (error) {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: [httpStatus[httpStatus.INTERNAL_SERVER_ERROR]] });
    }
  }
);

export default router;
