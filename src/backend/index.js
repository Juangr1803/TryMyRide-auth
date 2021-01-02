// Express
const express = require('express');
const app = express();
// Routes
const router = require('./utils/routes');
// Config
const config = require('./config');
// Body-Parser
const bodyParser = require('body-parser');

//-----------------------------------------//
//-----------------------------------------//

// Middlewares
app.use(express.json());
app.use(bodyParser.json());

// Router
router(app);

// Listen Port
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening in the Port http://localhost:${config.port}/`);
  }
});
