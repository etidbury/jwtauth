"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

var client = _axios.default.create({
  timeout: 60 * 1000,
  baseURL: CLIENT_BASE_URL
  /* validateStatus: (status) => {
      return (status >= 200 && status < 300 || status === 401 || status === 403);
  }*/

});

_axios.default.interceptors.request.use(function (config) {
  console.debug('Request URL:', config.url);
  return config;
});
/** Cause delays for Spotify API requests */
// const _spotifyApiResponseHandler = async response => {
//     const url = response && response.config && response.config.url || ''
//     if (url.indexOf('api.spotify.com') > -1) {
//         const wait = new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(response)
//             }, SPOTIFY_REQUEST_DELAY)
//         })
//         response = await wait
//     }
//     return response
// }
// client.interceptors.response.use(
//     (response)=>_spotifyApiResponseHandler(response)
//     ,(error)=>_spotifyApiResponseHandler(error).then((response)=>Promise.reject(error && error.response && error.response.data || response) )
// )

/**
 * Pretty-print axios network errors.
 */


var MAX_DATA_CONSOLE_OUT_LENGTH = 600;

var _lastError;

client.interceptors.response.use(function (response) {
  console.debug('Response URL:', response.config.url);
  return response;
}, function (error) {
  try {
    try {
      var errorId = error.response.status + error.config.method.toUpperCase() + error.config.url + error.response.data.substr(0, MAX_DATA_CONSOLE_OUT_LENGTH);

      if (errorId !== _lastError) {
        console.error(error.response.status, error.config.method.toUpperCase(), error.config.url, error.response.data.substr(0, MAX_DATA_CONSOLE_OUT_LENGTH));
        _lastError = errorId;
      }
    } catch (e) {
      var status = error.config.status || error.response && error.response.status;

      var _errorId = status + error.config.method.toUpperCase() + error.config.url;

      if (_errorId !== _lastError) {
        console.error(status, error.config.method.toUpperCase(), error.config.url);
        _lastError = _errorId;
      }
    }
  } catch (e) {
    console.error(error && error.response || error);
  }

  return Promise.reject(error); // return Promise.reject(error)
});
var _default = client;
exports.default = _default;