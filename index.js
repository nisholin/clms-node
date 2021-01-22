const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes');
let port = 3000;

const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(homeRoutes.routes);

app.get('/', function (request, response) {
	response.sendFile(path.join(__dirname + '/auth/login.html'));
});
app.get('/login', function (request, response) {
	response.sendFile(path.join(__dirname + '/auth/login.html'));
})

app.listen(port, () => console.log("app is listen-"+port));