require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('log-driver')({ level: "trace" });
const morgan = require('morgan');

let enginesRouter = require('./routes/engine');

let swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./specs/swagger.json');

let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/docs/swagger', function (req, res) {
    swaggerDocument.servers[0].url = 'http://' + req.get('host');
    res.send(swaggerDocument)
});

app.use('/run', require('./routes/run'));
app.use('/rule_sets', require('./routes/rule_sets'));
app.use('/engines/', enginesRouter);

app.use('/', swaggerUi.serve);
app.get('/',
    function (req, res) {
        swaggerDocument.servers[0].url = 'http://' + req.get('host');
        swaggerUi.setup(swaggerDocument)(req, res);
    },
    swaggerUi.setup(swaggerDocument)
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.sendStatus(404);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    let error_details = {
        message: err.message,
        stack: err.stack,
        error: err,
        request_headers: req.headers,
        request_url: req.url,
        request_params: req.params,
        request_query: req.query,
        request_body: req.body
    };
    logger.error(JSON.stringify(error_details));

    // render the error page
    res.status(err.status || 500);
    res.send(err.message || err);
});

module.exports = app;
