let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let enginesRouter = require('./routes/engine');

let swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./specs/swagger.json');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/docs/swagger', function (req, res) {
    swaggerDocument.servers[0].url = 'http://' + req.get('host');
    res.send(swaggerDocument)
});

app.use('/run', require('./routes/run'));
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
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message || err);
});

module.exports = app;
