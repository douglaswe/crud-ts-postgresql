import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import livroRoutes from './routes/livroRoutes';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/livros', livroRoutes);

app.listen(PORT, () => {
  console.log('Servidor rodando na porta 3000');
});