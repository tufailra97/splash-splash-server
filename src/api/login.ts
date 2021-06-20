import { Router, Response, Request } from 'express';
import { QueryResult } from 'pg';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AppConfig, Database } from 'services';
import { ValidateParams } from 'utils';
import { User } from 'types';

const router = Router();

interface IRegisterRequest extends Request {
  body: {
    password: string;
    email: string;
  };
}

router.post('/login', async (request: IRegisterRequest, response: Response) => {
  const { password, email } = request.body;

  const validatedEmail = await ValidateParams.validateEmail(email);

  if (!validatedEmail.isValid) {
    const errorMessage = validatedEmail.error?.details[0].message;
    return response.status(httpStatus.BAD_REQUEST).json({
      errors: [errorMessage]
    });
  }

  const query: QueryResult<User.IUsers> = await Database.pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (!query.rowCount)
    return response.status(httpStatus.BAD_REQUEST).json({
      errors: [`Email ${email} not found`]
    });

  const user = query.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return response
      .status(httpStatus.UNAUTHORIZED)
      .json({ errors: ['Invalid password'] });

  try {
    const token = jwt.sign(
      { id: user.userid },
      AppConfig.getConfigs().jwtSecretKey,
      { expiresIn: '2h' }
    );

    response.status(httpStatus.OK).json({ token });
  } catch (error) {
    response.status(httpStatus.OK).json({ error });
  }
});

export default router;
