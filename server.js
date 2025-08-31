import express from 'express';
import recipesRoutes from './routes/recipesRoutes.js';
import { errorHandler, logger } from './middlewares/errorHandler.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(logger);

app.use('/api/recipes', recipesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
