const express = require('express');
const dot = require('dotenv')
dot.config({ path: './backend/.env' }).parsed
const app = express();
const cors = require('cors')
const db = require('./src/db/db')
const port = process.env.PORT || 1997;
const routers = require('./src/router/routers');
// const cookiesession = require('cookie-session');
const passport = require('passport')
// const session = require('express-session');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('', routers);



// app.use(passport.initialize());
// app.use(passport.session());

app.get('/', (req, res) => res.send('Hello Kitty! I am live now'))
app.listen(port, () => console.log(`App listening on port ${port}!`))