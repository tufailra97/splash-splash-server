import { Router, Request, Response } from 'express';
import { Database } from 'services';

const router = Router();

interface IRegister extends Request {
  body: {
    username: string;
    password: string;
    email: string;
  };
}

router.post('/register', async (request: IRegister, response: Response) => {
  const { username, password, email } = request.body;

  response.json({ username, password, email });
});

export default router;
