import { Router, Response, Request } from 'express';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AppConfig, Database } from 'services';
import { ValidateParams } from 'utils';

const router = Router();

interface IRegisterRequest extends Request {
  body: {
    password: string;
    email: string;
  };
}

router.post(
  '/login',
  async (request: IRegisterRequest, response: Response): Promise<any> => {
    const { password, email } = request.body;

    const validatedEmail = await ValidateParams.validateEmail(email);

    if (!validatedEmail.isValid) {
      const errorMessage = validatedEmail.error?.details[0].message;
      return response.status(httpStatus.BAD_REQUEST).json({
        errors: [errorMessage]
      });
    }

    const user = await Database.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user)
      return response.status(httpStatus.BAD_REQUEST).json({
        errors: [`Email ${email} not found`]
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return response
        .status(httpStatus.UNAUTHORIZED)
        .json({ errors: ['Invalid password'] });

    try {
      const token = jwt.sign(
        { id: user.id },
        AppConfig.getConfigs().jwtSecretKey,
        { expiresIn: '2h' }
      );

      return response.status(httpStatus.OK).json({ token });
    } catch (error) {
      return response.status(httpStatus.OK).json({ error });
    }
  }
);

export default router;
