require('dotenv').config();
import express from 'express';
import route from 'routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(3000, route);
