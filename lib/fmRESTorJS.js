"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;

(function (factory) {
  var registeredInModuleLoader;

  if (typeof define === 'function' && define.amd) {
    define(factory);
    registeredInModuleLoader = true;
  }

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory();
    registeredInModuleLoader = true;
  }

  if (!registeredInModuleLoader) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();

    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
})(function () {
  function extend() {
    var i = 0;
    var result = {};

    for (; i < arguments.length; i++) {
      var attributes = arguments[i];

      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }

    return result;
  }

  function decode(s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }

  function init(converter) {
    function api() {}

    function set(key, value, attributes) {
      if (typeof document === 'undefined') {
        return;
      }

      attributes = extend({
        path: '/'
      }, api.defaults, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
      } // We're using "expires" because "max-age" is not supported by IE


      attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

      try {
        var result = JSON.stringify(value);

        if (/^[\{\[]/.test(result)) {
          value = result;
        }
      } catch (e) {}

      value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
      key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
      var stringifiedAttributes = '';

      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue;
        } // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...


        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return document.cookie = key + '=' + value + stringifiedAttributes;
    }

    function get(key, json) {
      if (typeof document === 'undefined') {
        return;
      }

      var jar = {}; // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.

      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var cookie = parts.slice(1).join('=');

        if (!json && cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          var name = decode(parts[0]);
          cookie = (converter.read || converter)(cookie, name) || decode(cookie);

          if (json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          jar[name] = cookie;

          if (key === name) {
            break;
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar;
    }

    api.set = set;

    api.get = function (key) {
      return get(key, false
      /* read as raw */
      );
    };

    api.getJSON = function (key) {
      return get(key, true
      /* read as json */
      );
    };

    api.remove = function (key, attributes) {
      set(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.defaults = {};
    api.withConverter = init;
    return api;
  }

  return init(function () {});
});
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fmRESTorJS =
/*#__PURE__*/
function () {
  function fmRESTorJS(host, database, layout, user, password) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var fmDataSource = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

    _classCallCheck(this, fmRESTorJS);

    this.host = host;
    this.database = database;
    this.layout = layout;
    this.user = user;
    this.password = password;
    this.fmDataSource = fmDataSource;
    this._apiToken = null;
    this._token = {
      saveTo: "localStorage",
      expire: 14,
      name: "fm-data-api"
    }; // SET OPTIONS

    if (options !== null) {
      this.setOptions(options);
    }
  }

  _createClass(fmRESTorJS, [{
    key: "setTokenExpiration",
    value: function setTokenExpiration(value) {
      this._token.expire = value;
    }
  }, {
    key: "setTokenName",
    value: function setTokenName(value) {
      this._token.name = value;
    }
  }, {
    key: "setTokenSaveTo",
    value: function setTokenSaveTo(value) {
      this._token.saveTo = value;
    }
  }, {
    key: "setAPIToken",
    value: function setAPIToken(apiToken) {
      this._apiToken = apiToken;
    }
  }, {
    key: "getAPIToken",
    value: function getAPIToken() {
      return this._apiToken;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if ("token" in options) {
        var token = options.token;

        if ("name" in token) {
          this.setTokenName(token.name);
        }

        if ("saveTo" in token) {
          if (["localStorage", "cookie"].includes(token.saveTo)) {
            this.setTokenSaveTo(token.saveTo);
          }
        }

        if ("expiration" in token) {
          if (Number.isInteger(token.expiration)) {
            this.setTokenExpiration(token.expiration);
          }
        }
      }
    }
  }, {
    key: "isLogged",
    value: function isLogged() {
      var fmJsonToken = undefined;

      if (this._token.saveTo === "localStorage") {
        fmJsonToken = localStorage.getItem(this._token.name) || undefined;
      } else {
        fmJsonToken = Cookies.get(this._token.name) || undefined;
      }

      if (typeof fmJsonToken !== 'undefined') {
        var fmObjectToken = JSON.parse(fmJsonToken);
        var currentDateTime = new Date();
        var expireTokenDateTime = new Date(fmObjectToken.expire);

        if (currentDateTime >= expireTokenDateTime) {
          return false;
        }

        this.setAPIToken(fmObjectToken.token);
        return true;
      }

      return false;
    }
  }, {
    key: "extendTokenExpiration",
    value: function extendTokenExpiration() {
      var currentDateTime = new Date();
      currentDateTime.setMinutes(currentDateTime.getMinutes() + this._token.expire);
      var fmJsonToken = {
        expire: currentDateTime,
        token: this.getAPIToken()
      };

      if (this._token.saveTo === "localStorage") {
        localStorage.setItem(this._token.name, JSON.stringify(fmJsonToken));
      } else {
        Cookies.set(this._token.name, JSON.stringify(fmJsonToken));
      }
    }
    /**
     * @param successCallback
     * @param errorCallback
     */

  }, {
    key: "getProductInformation",
    value: function getProductInformation(successCallback, errorCallback) {
      var _this = this;

      this._callURL({
        endpoint: '/fmi/data/vLatest/productInfo',
        method: 'GET'
      }).then(function (response) {
        var result = _this.getResultFromRequestRespnse(response);

        if (!_this.isResultError(response)) {
          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "getDatabaseNames",

    /**
     *
     * @param successCallback
     * @param errorCallback
     */
    value: function getDatabaseNames(successCallback, errorCallback) {
      var _this2 = this;

      this._callURL({
        headers: {
          'Authorization': 'Basic ' + btoa(this.user + ":" + this.password)
        },
        endpoint: '/fmi/data/vLatest/databases',
        method: 'GET'
      }).then(function (response) {
        var result = _this2.getResultFromRequestRespnse(response);

        if (!_this2.isResultError(response)) {
          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "getScriptNames",

    /**
     * @param successCallback
     * @param errorCallback
     */
    value: function getScriptNames(successCallback, errorCallback) {
      var _this3 = this;

      this._callURL({
        headers: {
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/vLatest/databases/' + this.database + '/scripts/',
        method: 'GET'
      }).then(function (response) {
        var result = _this3.getResultFromRequestRespnse(response);

        if (!_this3.isResultError(response)) {
          _this3.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "getLayoutNames",

    /**
     * @param successCallback
     * @param errorCallback
     */
    value: function getLayoutNames(successCallback, errorCallback) {
      var _this4 = this;

      this._callURL({
        headers: {
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/vLatest/databases/' + this.database + '/layouts/',
        method: 'GET'
      }).then(function (response) {
        var result = _this4.getResultFromRequestRespnse(response);

        if (!_this4.isResultError(response)) {
          _this4.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "getLayoutMetadata",

    /**
     * @param successCallback
     * @param errorCallback
     */
    value: function getLayoutMetadata(successCallback, errorCallback) {
      var _this5 = this;

      this._callURL({
        headers: {
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/vLatest/databases/' + this.database + '/layouts/' + this.layout,
        method: 'GET'
      }).then(function (response) {
        var result = _this5.getResultFromRequestRespnse(response);

        if (!_this5.isResultError(response)) {
          _this5.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "createRecord",

    /**
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    value: function createRecord(parameters, successCallback, errorCallback) {
      var _this6 = this;

      this._callURL({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records',
        method: 'POST'
      }, parameters).then(function (response) {
        var result = _this6.getResultFromRequestRespnse(response);

        if (!_this6.isResultError(response)) {
          _this6.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "deleteRecord",

    /**
     * @param id
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    value: function deleteRecord(id) {
      var _this7 = this;

      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var successCallback = arguments.length > 2 ? arguments[2] : undefined;
      var errorCallback = arguments.length > 3 ? arguments[3] : undefined;
      var param = "";

      if (parameters !== null) {
        param = this.convertObjectToGetParameters(parameters);
      }

      this._callURL({
        headers: {
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + id + '?' + param,
        method: 'DELETE'
      }).then(function (response) {
        var result = _this7.getResultFromRequestRespnse(response);

        if (!_this7.isResultError(response)) {
          _this7.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "duplicateRecord",

    /**
     * @param id
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    value: function duplicateRecord(id) {
      var _this8 = this;

      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var successCallback = arguments.length > 2 ? arguments[2] : undefined;
      var errorCallback = arguments.length > 3 ? arguments[3] : undefined;

      this._callURL({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + id,
        method: 'POST'
      }, parameters).then(function (response) {
        var result = _this8.getResultFromRequestRespnse(response);

        if (!_this8.isResultError(response)) {
          _this8.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "editRecord",

    /**
     * @param id
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    value: function editRecord(id, parameters, successCallback, errorCallback) {
      var _this9 = this;

      this._callURL({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + id,
        method: 'PATCH'
      }, parameters).then(function (response) {
        var result = _this9.getResultFromRequestRespnse(response);

        if (!_this9.isResultError(response)) {
          _this9.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "getRecord",

    /**
     * @param id
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    value: function getRecord(id) {
      var _this10 = this;

      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var successCallback = arguments.length > 2 ? arguments[2] : undefined;
      var errorCallback = arguments.length > 3 ? arguments[3] : undefined;
      var param = "";

      if (parameters !== null) {
        param = this.convertObjectToGetParameters(parameters);
      }

      this._callURL({
        headers: {
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + id + '?' + param,
        method: 'GET'
      }).then(function (response) {
        var result = _this10.getResultFromRequestRespnse(response);

        if (!_this10.isResultError(response)) {
          _this10.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "getRecords",

    /**
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    value: function getRecords() {
      var _this11 = this;

      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var successCallback = arguments.length > 1 ? arguments[1] : undefined;
      var errorCallback = arguments.length > 2 ? arguments[2] : undefined;
      var param = "";

      if (parameters !== null) {
        param = this.convertObjectToGetParameters(parameters);
      }

      this._callURL({
        headers: {
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/records/' + '?' + param,
        method: 'GET'
      }).then(function (response) {
        var result = _this11.getResultFromRequestRespnse(response);

        if (!_this11.isResultError(response)) {
          _this11.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "findRecords",

    /**
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    value: function findRecords(parameters, successCallback, errorCallback) {
      var _this12 = this;

      this._callURL({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/_find/',
        method: 'POST'
      }, parameters).then(function (response) {
        var result = _this12.getResultFromRequestRespnse(response);

        if (!_this12.isResultError(response)) {
          _this12.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "setGlobalField",

    /**
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    value: function setGlobalField(parameters, successCallback, errorCallback) {
      var _this13 = this;

      this._callURL({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/globals/',
        method: 'PATCH'
      }, parameters).then(function (response) {
        var result = _this13.getResultFromRequestRespnse(response);

        if (!_this13.isResultError(response)) {
          _this13.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "uploadFileToContainter",

    /**
     * @param id
     * @param containerFieldName
     * @param containerFieldRepetition
     * @param file
     * @param successCallback
     * @param errorCallback
     */
    value: function uploadFileToContainter(id, containerFieldName, containerFieldRepetition, file, successCallback, errorCallback) {
      var _this14 = this;

      // PREPARE FORM DATA
      var data = new FormData();
      data.append("upload", file);

      this._callURL({
        headers: {
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + "/records/" + id + "/containers/" + containerFieldName + "/" + containerFieldRepetition,
        method: 'POST'
      }, data, true).then(function (response) {
        var result = _this14.getResultFromRequestRespnse(response);

        if (!_this14.isResultError(response)) {
          _this14.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "runScript",

    /**
     * @param scriptName
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    value: function runScript(scriptName) {
      var _this15 = this;

      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var successCallback = arguments.length > 2 ? arguments[2] : undefined;
      var errorCallback = arguments.length > 3 ? arguments[3] : undefined;
      var param = "";

      if (parameters !== null) {
        param = this.convertObjectToGetParameters(parameters);
      }

      this._callURL({
        headers: {
          'Authorization': 'Bearer ' + this.getAPIToken()
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/layouts/' + this.layout + '/script/' + scriptName + '?' + param,
        method: 'GET'
      }).then(function (response) {
        var result = _this15.getResultFromRequestRespnse(response);

        if (!_this15.isResultError(response)) {
          _this15.extendTokenExpiration();

          return successCallback(result);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "login",
    value: function login(successCallback, errorCallback) {
      var _this16 = this;

      if (this.isLogged()) {
        return successCallback(true);
      }

      var parameters = null;

      if (this.fmDataSource !== null) {
        parameters = {
          fmDataSource: this.fmDataSource
        };
      }

      return this._callURL({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(this.user + ":" + this.password)
        },
        endpoint: '/fmi/data/v1/databases/' + this.database + '/sessions/',
        method: 'POST'
      }, parameters).then(function (response) {
        var result = _this16.getResultFromRequestRespnse(response);

        if (!_this16.isResultError(response)) {
          _this16.setAPIToken(result.response.token);

          _this16.extendTokenExpiration();

          return successCallback(true);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
    /**
     * @param successCallback
     * @param errorCallback
     * @returns {*}
     */

  }, {
    key: "logout",
    value: function logout(successCallback, errorCallback) {
      var _this17 = this;

      if (!this.isLogged()) {
        return successCallback(true);
      }

      this._callURL({
        endpoint: '/fmi/data/v1/databases/' + this.database + '/sessions/' + this.getAPIToken(),
        method: 'DELETE'
      }).then(function (response) {
        var result = _this17.getResultFromRequestRespnse(response);

        if (!_this17.isResultError(response)) {
          if (_this17._token.saveTo === "localStorage") {
            localStorage.removeItem(_this17._token.name);
          } else {
            Cookies.remove(_this17._token.name);
          }

          return successCallback(true);
        } else {
          return errorCallback(result);
        }
      })["catch"](function (error) {
        return errorCallback(error);
      });
    }
  }, {
    key: "_callURL",
    value: function _callURL(requestSettings) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var isFile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var fetchRequestOptions = {
        method: requestSettings['method']
      };

      if ("headers" in requestSettings) {
        fetchRequestOptions.headers = requestSettings["headers"];
      }

      if (data !== null && isFile === false) {
        fetchRequestOptions.body = JSON.stringify(data);
      }

      if (data !== null && isFile === true) {
        fetchRequestOptions.body = data;
      }

      return fetch('https://' + this.host + requestSettings["endpoint"], fetchRequestOptions).then(function (r) {
        return r.json().then(function (data) {
          return {
            status: r.status,
            result: data
          };
        });
      }).then(function (obj) {
        return obj;
      });
    }
    /**
     * Get JSON from FileMaker request result
     * @param result
     * @returns {null}
     */

  }, {
    key: "getResultFromRequestRespnse",
    value: function getResultFromRequestRespnse(response) {
      return response.result;
    }
  }, {
    key: "isResultError",
    value: function isResultError(result) {
      if ("status" in result) {
        var errorCodes = [400, 401, 403, 404, 405, 415, 500];

        if (errorCodes.includes(result.status)) {
          //let errorCode =  result.messages[0].code;
          // TODO CAUGHT UNSUPPORTED METHODS
          return true;
        }
      } else {
        return true;
      }

      return false;
    }
    /**
     * Convert object to string - get parameters
     * @param parameters
     * @returns {string}
     */

  }, {
    key: "convertObjectToGetParameters",
    value: function convertObjectToGetParameters(parameters) {
      var str = "";

      for (var key in parameters) {
        if (str != "") {
          str += "&";
        }

        str += key + "=" + encodeURIComponent(parameters[key]);
      }

      return str;
    }
  }]);

  return fmRESTorJS;
}();