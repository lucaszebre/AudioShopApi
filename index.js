const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000;
const  dotenv = require('dotenv');
const cors = require("cors");
const pool = require('./app/config/db.config.js')
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

dotenv.config();
const { POSTGRESQL_PASSWORD } = process.env;
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(cookieParser());

async function connectAndQuery() {
    try {
        await pool.connect();
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Error:', error.message);
    } 
}

connectAndQuery();
// auth router attaches /login, /logout, and /callback routes to the baseURL

require("./app/routes/auth.routes.js")(app);
require("./app/routes/post.routes.js")(app);
require("./app/routes/comments.routes.js")(app);

require("./app/routes/user.routes.js")(app);

app.listen(port, () => {
  console.log(`Server is running`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blog APi by lucaszebre." });
});
