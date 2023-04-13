const mongoose = require('mongoose');

// Check if MONGODB_URI environment variable is defined and has a valid value
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1); // or throw an error, or handle the issue in your desired way
}

// Connect to MongoDB using the retrieved URI
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function () {
  console.log('Database connected successfully!');
}).on('error', function (error) {
  console.log('Error is: ', error);
});
