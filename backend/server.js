const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const manufacturersRoutes = require('./routes/manufacturers');
const usersRoute = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/chococrave';

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/manufacturers', manufacturersRoutes);
app.use('/api/users', usersRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
