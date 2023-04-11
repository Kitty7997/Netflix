const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', function () {
  console.log('Conection has been made!');
}).on('error', function (error) {
  console.log('Error is: ', error);
})