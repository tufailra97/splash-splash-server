import { Router, Request, Response } from 'express';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import { AppConfig, Database } from 'services';
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
  async (request: IRegisterRequest, response: Response): Promise<any> => {
    const errors: string[] = [];
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

    const emails: User[] = await Database.prisma.user.findMany({
      where: {
        email
      }
    });

    if (emails.length)
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: [`Email ${email} is already in use.`] });

    const hashedPassword = await bcrypt.hash(
      password,
      AppConfig.getConfigs().bCryptSaltRounds
    );

    try {
      const { id } = await Database.prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword
        }
      });

      return response.status(httpStatus.OK).json({
        message: 'User has been created successfully',
        data: { id }
      });
    } catch (error) {
      return response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ errors: [httpStatus[httpStatus.INTERNAL_SERVER_ERROR]] });
    }
  }
);

export default router;
