require('dotenv').config();
const express = require('express');
const logger = require('log-driver')({level: "trace"});
const morgan = require('morgan');

let swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./specs/swagger.json');

let app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/docs/swagger', function (req, res) {
    swaggerDocument.servers[0].url = 'http://' + req.get('host');
    res.send(swaggerDocument)
});

app.use('/run', require('./routes/run'));
app.use('/rule_sets', require('./routes/rule_sets'));

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
    let ip = (req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress).split(",")[0];

    let error_details = {
        message: err.message,
        stack: err.stack,
        error: err,
        request_ip: ip,
        request_headers: req.headers,
        request_url: req.url,
        request_params: req.params,
        request_query: req.query,
        request_body: req.body
    };

    if (err.name === 'UnauthorizedError'){
        res.status(401).send(err.message);
    }
    else if (err.code) {
        logger.warn(JSON.stringify(error_details));
        res.status(400);
        res.send([err.message]);
    }
    else {
        logger.error(JSON.stringify(error_details));
        res.status(err.status || 500);
        res.send(err.message || err);
    }
});

module.exports = app;
