require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';

import { AppConfig } from 'services';
import routes from 'api';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
AppConfig.validateConfigs();

app.get('/', (_: Request, res: Response) => {
  res.send('RUNNING');
});

app.use('/v1/user', routes.register);
app.use('/v1/user', routes.login);

app.listen(AppConfig.getConfigs().port);
