// Express
const express = require('express');
const app = express();
// Cors
const cors = require('cors');
// Routes
const router = require('./utils/routes');
// Config
const config = require('./config');
// Middlewares
const bodyParser = require('body-parser');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
// Path
const path = require('path');

//-----------------------------------------//
//-----------------------------------------//

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Router
router(app);
// Route Catch 404
// app.use(notFoundHandler);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Listen Port
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening in the Port http://localhost:${config.port}/`);
  }
});
