"use strict";

var _urlJoin = _interopRequireDefault(require("url-join"));

var _Client = _interopRequireDefault(require("./lib/Client"));

var _httpErrors = require("http-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _verify =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var token, scopes, UserId, _process$env, JWT_AUTH_API_URL, JWT_AUTH_APP_ID;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = _ref.token, scopes = _ref.scopes, UserId = _ref.UserId;
            _process$env = process.env, JWT_AUTH_API_URL = _process$env.JWT_AUTH_API_URL, JWT_AUTH_APP_ID = _process$env.JWT_AUTH_APP_ID;

            if (JWT_AUTH_API_URL === null || JWT_AUTH_API_URL === void 0 ? void 0 : JWT_AUTH_API_URL.length) {
              _context.next = 4;
              break;
            }

            throw new TypeError('Required environment variable not set: JWT_AUTH_API_URL');

          case 4:
            if (JWT_AUTH_APP_ID === null || JWT_AUTH_APP_ID === void 0 ? void 0 : JWT_AUTH_APP_ID.length) {
              _context.next = 6;
              break;
            }

            throw new TypeError('Required environment variable not set: JWT_AUTH_APP_ID');

          case 6:
            return _context.abrupt("return", _Client.default.post((0, _urlJoin.default)(JWT_AUTH_API_URL, '/verify'), {
              UserId: UserId,
              token: token,
              scopes: scopes,
              appIdReference: JWT_AUTH_APP_ID
            }).catch(function (err) {
              var _err$response;

              switch (err === null || err === void 0 ? void 0 : (_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.status) {
                case 403:
                  throw new _httpErrors.Forbidden('You do not have access to this resource');

                default:
                  throw new _httpErrors.Unauthorized('Invalid credentials');
              }
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function _verify(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(request, reply) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!request.auth) {
              request.auth = {};
            }

            request.auth.hasScopes =
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(scopes) {
                var _request$headers, _request$headers$auth, _request$headers$XUs;

                var token, parts, scheme, UserId;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!(!scopes || !scopes.length || !scopes[0].length)) {
                          _context2.next = 2;
                          break;
                        }

                        throw TypeError('At least 1 scope must be specified when calling hasScopes()');

                      case 2:
                        if ((_request$headers = request.headers) === null || _request$headers === void 0 ? void 0 : (_request$headers$auth = _request$headers.authorization) === null || _request$headers$auth === void 0 ? void 0 : _request$headers$auth.length) {
                          _context2.next = 4;
                          break;
                        }

                        throw new _httpErrors.Unauthorized('Required Authorization header not set');

                      case 4:
                        if ((_request$headers$XUs = request.headers['X-User-Id']) === null || _request$headers$XUs === void 0 ? void 0 : _request$headers$XUs.length) {
                          _context2.next = 6;
                          break;
                        }

                        throw new _httpErrors.Unauthorized('Required X-User-Id header not set');

                      case 6:
                        token = '';
                        parts = request.headers.authorization.split(' ');

                        if (!(parts.length === 2)) {
                          _context2.next = 13;
                          break;
                        }

                        scheme = parts[0];
                        token = parts[1];

                        if (!(!/^Bearer$/i.test(scheme) || !token.length)) {
                          _context2.next = 13;
                          break;
                        }

                        throw new _httpErrors.BadRequest('Format is Authorization: Bearer [token]');

                      case 13:
                        UserId = request.headers['X-User-Id'];
                        _context2.next = 16;
                        return _verify({
                          token: token,
                          scopes: scopes,
                          UserId: UserId
                        });

                      case 16:
                        return _context2.abrupt("return", true);

                      case 17:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x4) {
                return _ref4.apply(this, arguments);
              };
            }();

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();