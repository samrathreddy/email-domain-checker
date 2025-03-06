import dotenv from 'dotenv';
import express from 'express';
import emailCheckerRoute from './routes/emailChecker.js';
import cors from 'cors';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

app.set('trust proxy', 1);

app.use(express.static(path.resolve(__dirname,'build')))


const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Handle preflight requests
app.options('*', cors(corsOptions)); // Preflight requests are always OPTIONS


app.use(cors(corsOptions));


app.use('/api', emailCheckerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});