'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressLogger = require('express-logger');

var _expressLogger2 = _interopRequireDefault(_expressLogger);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _mysql3 = require('./mysql.config');

var _mysql4 = _interopRequireDefault(_mysql3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 8001;

var connection = _mysql2.default.createConnection(_mysql4.default);

app.use(_bodyParser2.default.json());
app.use((0, _expressLogger2.default)({ path: path.resolve(__dirname, '../express.log') }));

app.listen(PORT, function (err) {
  if (err) {
    throw err;
  }
});