import config from './config/envVariablesLoad';
import express from 'express';
import database from './config/database/mongodb';
import passport from './config/passportStrategies';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';

const PORT = config.APP_PORT || 3001;
const app = express();

database.connect()

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});