const express = require('express');
const serverConnection = require('./config/db');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const publicController = require('./controllers/publicController');
const cors = require('cors');

// load config files
require('dotenv').config({ path: './config/.env' });
//connect to DB
serverConnection();

const app = express();
app.use(cors());
//ables node to parse post request

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/register', registerController);
app.use('/login', loginController);
app.use('/public', publicController);

app.get('/', (req, res) => {
  res.send('TodosApp API');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server app and running on port ${PORT}`));
