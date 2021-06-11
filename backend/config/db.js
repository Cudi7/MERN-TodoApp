const mongoose = require('mongoose');

function serverConnection() {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.once('open', () => console.log('Connected to database'));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = serverConnection;
