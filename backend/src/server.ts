import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import livroRoutes from './routes/livroRoutes';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/livros', livroRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});