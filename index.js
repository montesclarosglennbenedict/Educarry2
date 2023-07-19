const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const cors = require('cors');


const app = express();
const viewsPath = path.join(__dirname, 'src/views');
const routePath = path.join(__dirname, 'src/routes');
app.use(cors());

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'src/public')));

// Handle the root path ("/")
const rootRouteFile = path.join(routePath, 'index.js');
if (fs.existsSync(rootRouteFile)) {
  const rootRoute = require(rootRouteFile);
  app.use('/', rootRoute);
}

// Handle the root path ("/")
const transferResultsRouteFile = path.join(routePath, 'index.js');
if (fs.existsSync(rootRouteFile)) {
  const rootRoute = require(rootRouteFile);
  app.use('/transfer/results', rootRoute);
}

// Error handler middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send('Internal Server Error');
}

app.use(cors({
  origin: 'https://educarry-database.montesclarosglennbenedict.repl.co',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
