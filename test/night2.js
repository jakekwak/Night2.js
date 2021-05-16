(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
  else if (typeof define === 'function' && define.amd) define('night2', [], factory);
  else if (typeof exports === 'object') exports['night2'] = factory();
  else root['night2'] = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  return /******/ (function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports;
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {}
        /******/
      }); // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true; // Return the exports of the module
      /******/
      /******/ /******/ return module.exports;
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
        /******/
      }
      /******/
    }; // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function (exports) {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (value, mode) {
      /******/ if (mode & 1) value = __webpack_require__(value);
      /******/ if (mode & 8) return value;
      /******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/ var ns = Object.create(null);
      /******/ __webpack_require__.r(ns);
      /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
      /******/ if (mode & 2 && typeof value != 'string')
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function (key) {
              return value[key];
            }.bind(null, key)
          );
      /******/ return ns;
      /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function (module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default'];
            }
          : /******/ function getModuleExports() {
              return module;
            };
      /******/ __webpack_require__.d(getter, 'a', getter);
      /******/ return getter;
      /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = './src/index.js'));
    /******/
  })(
    /************************************************************************/
    /******/ {
      /***/ './node_modules/suncalc/suncalc.js':
        /*!*****************************************!*\
  !*** ./node_modules/suncalc/suncalc.js ***!
  \*****************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          /*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/

          (function () {
            'use strict';

            // shortcuts for easier to read formulas

            var PI = Math.PI,
              sin = Math.sin,
              cos = Math.cos,
              tan = Math.tan,
              asin = Math.asin,
              atan = Math.atan2,
              acos = Math.acos,
              rad = PI / 180;

            // sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas

            // date/time constants and conversions

            var dayMs = 1000 * 60 * 60 * 24,
              J1970 = 2440588,
              J2000 = 2451545;

            function toJulian(date) {
              return date.valueOf() / dayMs - 0.5 + J1970;
            }
            function fromJulian(j) {
              return new Date((j + 0.5 - J1970) * dayMs);
            }
            function toDays(date) {
              return toJulian(date) - J2000;
            }

            // general calculations for position

            var e = rad * 23.4397; // obliquity of the Earth

            function rightAscension(l, b) {
              return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
            }
            function declination(l, b) {
              return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
            }

            function azimuth(H, phi, dec) {
              return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
            }
            function altitude(H, phi, dec) {
              return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
            }

            function siderealTime(d, lw) {
              return rad * (280.16 + 360.9856235 * d) - lw;
            }

            function astroRefraction(h) {
              if (h < 0)
                // the following formula works for positive altitudes only.
                h = 0; // if h = -0.08901179 a div/0 would occur.

              // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
              // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
              return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
            }

            // general sun calculations

            function solarMeanAnomaly(d) {
              return rad * (357.5291 + 0.98560028 * d);
            }

            function eclipticLongitude(M) {
              var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
                P = rad * 102.9372; // perihelion of the Earth

              return M + C + P + PI;
            }

            function sunCoords(d) {
              var M = solarMeanAnomaly(d),
                L = eclipticLongitude(M);

              return {
                dec: declination(L, 0),
                ra: rightAscension(L, 0)
              };
            }

            var SunCalc = {};

            // calculates sun position for a given date and latitude/longitude

            SunCalc.getPosition = function (date, lat, lng) {
              var lw = rad * -lng,
                phi = rad * lat,
                d = toDays(date),
                c = sunCoords(d),
                H = siderealTime(d, lw) - c.ra;

              return {
                azimuth: azimuth(H, phi, c.dec),
                altitude: altitude(H, phi, c.dec)
              };
            };

            // sun times configuration (angle, morning name, evening name)

            var times = (SunCalc.times = [
              [-0.833, 'sunrise', 'sunset'],
              [-0.3, 'sunriseEnd', 'sunsetStart'],
              [-6, 'dawn', 'dusk'],
              [-12, 'nauticalDawn', 'nauticalDusk'],
              [-18, 'nightEnd', 'night'],
              [6, 'goldenHourEnd', 'goldenHour']
            ]);

            // adds a custom time to the times config

            SunCalc.addTime = function (angle, riseName, setName) {
              times.push([angle, riseName, setName]);
            };

            // calculations for sun times

            var J0 = 0.0009;

            function julianCycle(d, lw) {
              return Math.round(d - J0 - lw / (2 * PI));
            }

            function approxTransit(Ht, lw, n) {
              return J0 + (Ht + lw) / (2 * PI) + n;
            }
            function solarTransitJ(ds, M, L) {
              return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L);
            }

            function hourAngle(h, phi, d) {
              return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
            }

            // returns set time for the given sun altitude
            function getSetJ(h, lw, phi, dec, n, M, L) {
              var w = hourAngle(h, phi, dec),
                a = approxTransit(w, lw, n);
              return solarTransitJ(a, M, L);
            }

            // calculates sun times for a given date and latitude/longitude

            SunCalc.getTimes = function (date, lat, lng) {
              var lw = rad * -lng,
                phi = rad * lat,
                d = toDays(date),
                n = julianCycle(d, lw),
                ds = approxTransit(0, lw, n),
                M = solarMeanAnomaly(ds),
                L = eclipticLongitude(M),
                dec = declination(L, 0),
                Jnoon = solarTransitJ(ds, M, L),
                i,
                len,
                time,
                Jset,
                Jrise;

              var result = {
                solarNoon: fromJulian(Jnoon),
                nadir: fromJulian(Jnoon - 0.5)
              };

              for (i = 0, len = times.length; i < len; i += 1) {
                time = times[i];

                Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);
                Jrise = Jnoon - (Jset - Jnoon);

                result[time[1]] = fromJulian(Jrise);
                result[time[2]] = fromJulian(Jset);
              }

              return result;
            };

            // moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

            function moonCoords(d) {
              // geocentric ecliptic coordinates of the moon

              var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
                M = rad * (134.963 + 13.064993 * d), // mean anomaly
                F = rad * (93.272 + 13.22935 * d), // mean distance
                l = L + rad * 6.289 * sin(M), // longitude
                b = rad * 5.128 * sin(F), // latitude
                dt = 385001 - 20905 * cos(M); // distance to the moon in km

              return {
                ra: rightAscension(l, b),
                dec: declination(l, b),
                dist: dt
              };
            }

            SunCalc.getMoonPosition = function (date, lat, lng) {
              var lw = rad * -lng,
                phi = rad * lat,
                d = toDays(date),
                c = moonCoords(d),
                H = siderealTime(d, lw) - c.ra,
                h = altitude(H, phi, c.dec),
                // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
                pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

              h = h + astroRefraction(h); // altitude correction for refraction

              return {
                azimuth: azimuth(H, phi, c.dec),
                altitude: h,
                distance: c.dist,
                parallacticAngle: pa
              };
            };

            // calculations for illumination parameters of the moon,
            // based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
            // Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

            SunCalc.getMoonIllumination = function (date) {
              var d = toDays(date || new Date()),
                s = sunCoords(d),
                m = moonCoords(d),
                sdist = 149598000, // distance from Earth to Sun in km
                phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
                inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
                angle = atan(
                  cos(s.dec) * sin(s.ra - m.ra),
                  sin(s.dec) * cos(m.dec) - cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra)
                );

              return {
                fraction: (1 + cos(inc)) / 2,
                phase: 0.5 + (0.5 * inc * (angle < 0 ? -1 : 1)) / Math.PI,
                angle: angle
              };
            };

            function hoursLater(date, h) {
              return new Date(date.valueOf() + (h * dayMs) / 24);
            }

            // calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

            SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
              var t = new Date(date);
              if (inUTC) t.setUTCHours(0, 0, 0, 0);
              else t.setHours(0, 0, 0, 0);

              var hc = 0.133 * rad,
                h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
                h1,
                h2,
                rise,
                set,
                a,
                b,
                xe,
                ye,
                d,
                roots,
                x1,
                x2,
                dx;

              // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
              for (var i = 1; i <= 24; i += 2) {
                h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
                h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

                a = (h0 + h2) / 2 - h1;
                b = (h2 - h0) / 2;
                xe = -b / (2 * a);
                ye = (a * xe + b) * xe + h1;
                d = b * b - 4 * a * h1;
                roots = 0;

                if (d >= 0) {
                  dx = Math.sqrt(d) / (Math.abs(a) * 2);
                  x1 = xe - dx;
                  x2 = xe + dx;
                  if (Math.abs(x1) <= 1) roots++;
                  if (Math.abs(x2) <= 1) roots++;
                  if (x1 < -1) x1 = x2;
                }

                if (roots === 1) {
                  if (h0 < 0) rise = i + x1;
                  else set = i + x1;
                } else if (roots === 2) {
                  rise = i + (ye < 0 ? x2 : x1);
                  set = i + (ye < 0 ? x1 : x2);
                }

                if (rise && set) break;

                h0 = h2;
              }

              var result = {};

              if (rise) result.rise = hoursLater(t, rise);
              if (set) result.set = hoursLater(t, set);

              if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

              return result;
            };

            // export as Node module / AMD module / browser variable
            if (true) module.exports = SunCalc;
            else {
            }
          })();

          /***/
        },

      /***/ './src/index.js':
        /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          'use strict';

          function _typeof(obj) {
            '@babel/helpers - typeof';
            if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
              _typeof = function _typeof(obj) {
                return typeof obj;
              };
            } else {
              _typeof = function _typeof(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj;
              };
            }
            return _typeof(obj);
          }

          Object.defineProperty(exports, '__esModule', {
            value: true
          });
          exports.default = void 0;

          var _night = _interopRequireWildcard(__webpack_require__(/*! ./night2 */ './src/night2.js'));

          function _getRequireWildcardCache(nodeInterop) {
            if (typeof WeakMap !== 'function') return null;
            var cacheBabelInterop = new WeakMap();
            var cacheNodeInterop = new WeakMap();
            return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
              return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
            })(nodeInterop);
          }

          function _interopRequireWildcard(obj, nodeInterop) {
            if (!nodeInterop && obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || (_typeof(obj) !== 'object' && typeof obj !== 'function')) {
              return { default: obj };
            }
            var cache = _getRequireWildcardCache(nodeInterop);
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj.default = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }

          var _default = _night.default;
          /* eslint-disable */

          exports.default = _default;

          if (_night.IS_BROWSER) {
            (function (window) {
              window.Night2 = _night.default;
            })(window);
          }
          /* eslint-enable */

          module.exports = exports['default'];

          /***/
        },

      /***/ './src/night2.js':
        /*!***********************!*\
  !*** ./src/night2.js ***!
  \***********************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          'use strict';

          Object.defineProperty(exports, '__esModule', {
            value: true
          });
          exports.default = exports.IS_BROWSER = void 0;

          var _suncalc = _interopRequireDefault(
            __webpack_require__(/*! suncalc */ './node_modules/suncalc/suncalc.js')
          );

          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError('Cannot call a class as a function');
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ('value' in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
          }

          var IS_BROWSER = typeof window !== 'undefined';
          exports.IS_BROWSER = IS_BROWSER;

          var Night2 = /*#__PURE__*/ (function () {
            function Night2() {
              var _this = this;

              var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

              _classCallCheck(this, Night2);

              this.settings = this.extendSettings(settings);
              this.today = new Date();
              setInterval(function () {
                return _this.time(new Date());
              }, 1000);
              if (this.settings.auto) this.auto(true);
              this.theme();
            }

            _createClass(Night2, [
              {
                key: 'time',
                value: function time(now) {
                  var midnight = new Date().setHours(24, 0, 0, 0);

                  if (!localStorage.time) {
                    localStorage.setItem('time', JSON.stringify(midnight));
                  } else if (localStorage.location && now.getTime() > JSON.parse(localStorage.time)) {
                    localStorage.removeItem('time');

                    if (this.settings.cacheClear) {
                      localStorage.removeItem('location');

                      if (typeof this.settings.onCacheClear === 'function') {
                        this.settings.onCacheClear();
                      }
                    }
                  }
                }
              },
              {
                key: 'theme',
                value: function theme() {
                  localStorage.dark === 'true' ? this.dark() : this.light();
                }
              },
              {
                key: 'auto',
                value: function auto(init) {
                  if ((init && !localStorage.auto) || !init) {
                    localStorage.setItem('auto', 'true');
                    if (typeof this.settings.onAuto === 'function') this.settings.onAuto();
                  }

                  if ('geolocation' in navigator) this.myLocation();
                }
              },
              {
                key: 'myLocation',
                value: function myLocation() {
                  if (!localStorage.location) {
                    navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this));
                  } else {
                    var location = JSON.parse(localStorage.location);
                    this.checkSunPosition(location.latitude, location.longitude);
                  }
                }
              },
              {
                key: 'success',
                value: function success(pos) {
                  var location = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                  };
                  this.checkSunPosition(location.latitude, location.longitude);

                  if (this.settings.cache) {
                    localStorage.setItem('location', JSON.stringify(location));
                  }
                }
              },
              {
                key: 'error',
                value: function error(err) {
                  if (typeof this.settings.onDenied === 'function') {
                    this.settings.onDenied();
                  }

                  document.dispatchEvent(
                    new CustomEvent('smartDarkError', {
                      detail: err
                    })
                  );
                }
              },
              {
                key: 'checkSunPosition',
                value: function checkSunPosition(latitude, longitude) {
                  var _this2 = this;

                  /* eslint-disable */
                  var times = new _suncalc.default.getTimes(this.today, latitude, longitude);
                  /* eslint-enable */

                  var sunrise = times.sunriseEnd - (times.sunriseEnd - times.sunrise) / 2;
                  var sunset = times.sunset - (times.sunset - times.sunsetStart) / 2;
                  var values = {
                    sunrise: new Date(sunrise),
                    sunset: new Date(sunset),
                    latitude: latitude,
                    longitude: longitude
                  };
                  document.dispatchEvent(
                    new CustomEvent('smartDark', {
                      detail: values
                    })
                  );
                  setInterval(function () {
                    if (localStorage.auto && JSON.parse(localStorage.auto)) {
                      var now = new Date();
                      now.getTime() > sunrise && now.getTime() < sunset ? _this2.light() : _this2.dark();
                    }
                  }, 100);
                }
              },
              {
                key: 'reset',
                value: function reset() {
                  localStorage.clear();
                  if (typeof this.settings.onReset === 'function') this.settings.onReset();
                }
              },
              {
                key: 'light',
                value: function light() {
                  if (typeof this.settings.onLight === 'function') this.settings.onLight();
                  this.isDark = false;

                  if (this.settings.lightClass) {
                    document.body.classList.add(this.settings.lightClass);
                  }

                  document.body.classList.remove(this.settings.darkClass);
                  localStorage.setItem('dark', 'false');
                }
              },
              {
                key: 'dark',
                value: function dark() {
                  if (typeof this.settings.onDark === 'function') this.settings.onDark();
                  this.isDark = true;

                  if (this.settings.lightClass) {
                    document.body.classList.remove(this.settings.lightClass);
                  }

                  document.body.classList.add(this.settings.darkClass);
                  localStorage.setItem('dark', 'true');
                }
              },
              {
                key: 'toggle',
                value: function toggle() {
                  if (typeof this.settings.onToggle === 'function') this.settings.onToggle();
                  this.isDark ? this.light() : this.dark();
                  localStorage.setItem('auto', 'false');
                }
              },
              {
                key: 'extendSettings',
                value: function extendSettings(settings) {
                  var defaultSettings = {
                    lightClass: '',
                    // class added to body when dark mode is disabled
                    darkClass: 'dark',
                    // class added to body when dark mode is enabled
                    cache: true,
                    // cache location coordinates in local storage
                    cacheClear: true,
                    // clear location coordinates in local storage everyday at midnight
                    auto: true,
                    // enable smart switch on script init
                    onAuto: null,
                    // callback on smart switch
                    onLight: null,
                    // callback when dark mode is disabled
                    onDark: null,
                    // callback when dark mode is enabled
                    onToggle: null,
                    // callback on dark/light mode toggle
                    onDenied: null,
                    // callback on geolocation permission deined
                    onCacheClear: null,
                    // callback when location coordinates and midnight time in local storage cleared
                    onReset: null // callback on localStorage reset
                  };
                  var newSettings = {};

                  for (var property in defaultSettings) {
                    // eslint-disable-line no-unused-vars
                    if (property in settings) newSettings[property] = settings[property];
                    else newSettings[property] = defaultSettings[property];
                  }

                  return newSettings;
                }
              }
            ]);

            return Night2;
          })();

          exports.default = Night2;

          /***/
        }

      /******/
    }
  );
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uaWdodDIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25pZ2h0Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uaWdodDIvLi9ub2RlX21vZHVsZXMvc3VuY2FsYy9zdW5jYWxjLmpzIiwid2VicGFjazovL25pZ2h0Mi8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9uaWdodDIvLi9zcmMvbmlnaHQyLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIk5pZ2h0MiIsIklTX0JST1dTRVIiLCJzZXR0aW5ncyIsImV4dGVuZFNldHRpbmdzIiwidG9kYXkiLCJEYXRlIiwic2V0SW50ZXJ2YWwiLCJ0aW1lIiwiYXV0byIsInRoZW1lIiwibm93IiwibWlkbmlnaHQiLCJzZXRIb3VycyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwibG9jYXRpb24iLCJnZXRUaW1lIiwicGFyc2UiLCJyZW1vdmVJdGVtIiwiY2FjaGVDbGVhciIsIm9uQ2FjaGVDbGVhciIsImRhcmsiLCJsaWdodCIsImluaXQiLCJvbkF1dG8iLCJuYXZpZ2F0b3IiLCJteUxvY2F0aW9uIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJzdWNjZXNzIiwiYmluZCIsImVycm9yIiwiY2hlY2tTdW5Qb3NpdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwicG9zIiwiY29vcmRzIiwiY2FjaGUiLCJlcnIiLCJvbkRlbmllZCIsImRvY3VtZW50IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwidGltZXMiLCJnZXRUaW1lcyIsInN1bnJpc2UiLCJzdW5yaXNlRW5kIiwic3Vuc2V0Iiwic3Vuc2V0U3RhcnQiLCJ2YWx1ZXMiLCJjbGVhciIsIm9uUmVzZXQiLCJvbkxpZ2h0IiwiaXNEYXJrIiwibGlnaHRDbGFzcyIsImJvZHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkYXJrQ2xhc3MiLCJvbkRhcmsiLCJvblRvZ2dsZSIsImRlZmF1bHRTZXR0aW5ncyIsIm5ld1NldHRpbmdzIiwicHJvcGVydHkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjOztBQUVkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsNkNBQTZDO0FBQ3RFLHlCQUF5Qiw0Q0FBNEM7QUFDckUseUJBQXlCLCtCQUErQjs7O0FBR3hEOztBQUVBLHNCQUFzQjs7QUFFdEIsK0JBQStCLHdEQUF3RDtBQUN2RiwrQkFBK0IseURBQXlEOztBQUV4RixnQ0FBZ0MsOERBQThEO0FB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LFFBQUwsQ0FBYzhELFFBQWQ7QUFFbEQsV0FBS1IsTUFBTCxHQUFjLEtBQUtoQyxLQUFMLEVBQWQsR0FBNkIsS0FBS0QsSUFBTCxFQUE3QjtBQUVBVixrQkFBWSxDQUFDQyxPQUFiLENBQXFCLE1BQXJCLEVBQTZCLE9BQTdCO0FBQ0Q7OzttQ0FFY1osUSxFQUFVO0FBQ3ZCLFVBQU0rRCxlQUFlLEdBQUc7QUFDdEJSLGtCQUFVLEVBQUUsRUFEVTtBQUNOO0FBQ2hCSyxpQkFBUyxFQUFFLE1BRlc7QUFFSDtBQUNuQnZCLGFBQUssRUFBRSxJQUhlO0FBR1Q7QUFDYmxCLGtCQUFVLEVBQUUsSUFKVTtBQUlKO0FBQ2xCYixZQUFJLEVBQUUsSUFMZ0I7QUFLVjtBQUVaa0IsY0FBTSxFQUFFLElBUGM7QUFPUjtBQUNkNkIsZUFBTyxFQUFFLElBUmE7QUFRUDtBQUNmUSxjQUFNLEVBQUUsSUFUYztBQVNSO0FBQ2RDLGdCQUFRLEVBQUUsSUFWWTtBQVVOO0FBQ2hCdkIsZ0JBQVEsRUFBRSxJQVhZO0FBV047QUFDaEJuQixvQkFBWSxFQUFFLElBWlE7QUFZRjtBQUNwQmdDLGVBQU8sRUFBRSxJQWJhLENBYVI7O0FBYlEsT0FBeEI7QUFnQkEsVUFBTVksV0FBVyxHQUFHLEVBQXBCOztBQUVBLFdBQUssSUFBTUMsUUFBWCxJQUF1QkYsZUFBdkIsRUFBd0M7QUFBRTtBQUN4QyxZQUFJRSxRQUFRLElBQUlqRSxRQUFoQixFQUEwQmdFLFdBQVcsQ0FBQ0MsUUFBRCxDQUFYLEdBQXdCakUsUUFBUSxDQUFDaUUsUUFBRCxDQUFoQyxDQUExQixLQUNLRCxXQUFXLENBQUNDLFFBQUQsQ0FBWCxHQUF3QkYsZUFBZSxDQUFDRSxRQUFELENBQXZDO0FBQ047O0FBRUQsYUFBT0QsV0FBUDtBQUNEIiwiZmlsZSI6Im5pZ2h0Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwibmlnaHQyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5pZ2h0MlwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuaWdodDJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKlxuIChjKSAyMDExLTIwMTUsIFZsYWRpbWlyIEFnYWZvbmtpblxuIFN1bkNhbGMgaXMgYSBKYXZhU2NyaXB0IGxpYnJhcnkgZm9yIGNhbGN1bGF0aW5nIHN1bi9tb29uIHBvc2l0aW9uIGFuZCBsaWdodCBwaGFzZXMuXG4gaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvc3VuY2FsY1xuKi9cblxuKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4vLyBzaG9ydGN1dHMgZm9yIGVhc2llciB0byByZWFkIGZvcm11bGFzXG5cbnZhciBQSSAgID0gTWF0aC5QSSxcbiAgICBzaW4gID0gTWF0aC5zaW4sXG4gICAgY29zICA9IE1hdGguY29zLFxuICAgIHRhbiAgPSBNYXRoLnRhbixcbiAgICBhc2luID0gTWF0aC5hc2luLFxuICAgIGF0YW4gPSBNYXRoLmF0YW4yLFxuICAgIGFjb3MgPSBNYXRoLmFjb3MsXG4gICAgcmFkICA9IFBJIC8gMTgwO1xuXG4vLyBzdW4gY2FsY3VsYXRpb25zIGFyZSBiYXNlZCBvbiBodHRwOi8vYWEucXVhZS5ubC9lbi9yZWtlbi96b25wb3NpdGllLmh0bWwgZm9ybXVsYXNcblxuXG4vLyBkYXRlL3RpbWUgY29uc3RhbnRzIGFuZCBjb252ZXJzaW9uc1xuXG52YXIgZGF5TXMgPSAxMDAwICogNjAgKiA2MCAqIDI0LFxuICAgIEoxOTcwID0gMjQ0MDU4OCxcbiAgICBKMjAwMCA9IDI0NTE1NDU7XG5cbmZ1bmN0aW9uIHRvSnVsaWFuKGRhdGUpIHsgcmV0dXJuIGRhdGUudmFsdWVPZigpIC8gZGF5TXMgLSAwLjUgKyBKMTk3MDsgfVxuZnVuY3Rpb24gZnJvbUp1bGlhbihqKSAgeyByZXR1cm4gbmV3IERhdGUoKGogKyAwLjUgLSBKMTk3MCkgKiBkYXlNcyk7IH1cbmZ1bmN0aW9uIHRvRGF5cyhkYXRlKSAgIHsgcmV0dXJuIHRvSnVsaWFuKGRhdGUpIC0gSjIwMDA7IH1cblxuXG4vLyBnZW5lcmFsIGNhbGN1bGF0aW9ucyBmb3IgcG9zaXRpb25cblxudmFyIGUgPSByYWQgKiAyMy40Mzk3OyAvLyBvYmxpcXVpdHkgb2YgdGhlIEVhcnRoXG5cbmZ1bmN0aW9uIHJpZ2h0QXNjZW5zaW9uKGwsIGIpIHsgcmV0dXJuIGF0YW4oc2luKGwpICogY29zKGUpIC0gdGFuKGIpICogc2luKGUpLCBjb3MobCkpOyB9XG5mdW5jdGlvbiBkZWNsaW5hdGlvbihsLCBiKSAgICB7IHJldHVybiBhc2luKHNpbihiKSAqIGNvcyhlKSArIGNvcyhiKSAqIHNpbihlKSAqIHNpbihsKSk7IH1cblxuZnVuY3Rpb24gYXppbXV0aChILCBwaGksIGRlYykgIHsgcmV0dXJuIGF0YW4oc2luKEgpLCBjb3MoSCkgKiBzaW4ocGhpKSAtIHRhbihkZWMpICogY29zKHBoaSkpOyB9XG5mdW5jdGlvbiBhbHRpdHVkZShILCBwaGksIGRlYykgeyByZXR1cm4gYXNpbihzaW4ocGhpKSAqIHNpbihkZWMpICsgY29zKHBoaSkgKiBjb3MoZGVjKSAqIGNvcyhIKSk7IH1cblxuZnVuY3Rpb24gc2lkZXJlYWxUaW1lKGQsIGx3KSB7IHJldHVybiByYWQgKiAoMjgwLjE2ICsgMzYwLjk4NTYyMzUgKiBkKSAtIGx3OyB9XG5cbmZ1bmN0aW9uIGFzdHJvUmVmcmFjdGlvbihoKSB7XG4gICAgaWYgKGggPCAwKSAvLyB0aGUgZm9sbG93aW5nIGZvcm11bGEgd29ya3MgZm9yIHBvc2l0aXZlIGFsdGl0dWRlcyBvbmx5LlxuICAgICAgICBoID0gMDsgLy8gaWYgaCA9IC0wLjA4OTAxMTc5IGEgZGl2LzAgd291bGQgb2NjdXIuXG5cbiAgICAvLyBmb3JtdWxhIDE2LjQgb2YgXCJBc3Ryb25vbWljYWwgQWxnb3JpdGhtc1wiIDJuZCBlZGl0aW9uIGJ5IEplYW4gTWVldXMgKFdpbGxtYW5uLUJlbGwsIFJpY2htb25kKSAxOTk4LlxuICAgIC8vIDEuMDIgLyB0YW4oaCArIDEwLjI2IC8gKGggKyA1LjEwKSkgaCBpbiBkZWdyZWVzLCByZXN1bHQgaW4gYXJjIG1pbnV0ZXMgLT4gY29udmVydGVkIHRvIHJhZDpcbiAgICByZXR1cm4gMC4wMDAyOTY3IC8gTWF0aC50YW4oaCArIDAuMDAzMTI1MzYgLyAoaCArIDAuMDg5MDExNzkpKTtcbn1cblxuLy8gZ2VuZXJhbCBzdW4gY2FsY3VsYXRpb25zXG5cbmZ1bmN0aW9uIHNvbGFyTWVhbkFub21hbHkoZCkgeyByZXR1cm4gcmFkICogKDM1Ny41MjkxICsgMC45ODU2MDAyOCAqIGQpOyB9XG5cbmZ1bmN0aW9uIGVjbGlwdGljTG9uZ2l0dWRlKE0pIHtcblxuICAgIHZhciBDID0gcmFkICogKDEuOTE0OCAqIHNpbihNKSArIDAuMDIgKiBzaW4oMiAqIE0pICsgMC4wMDAzICogc2luKDMgKiBNKSksIC8vIGVxdWF0aW9uIG9mIGNlbnRlclxuICAgICAgICBQID0gcmFkICogMTAyLjkzNzI7IC8vIHBlcmloZWxpb24gb2YgdGhlIEVhcnRoXG5cbiAgICByZXR1cm4gTSArIEMgKyBQICsgUEk7XG59XG5cbmZ1bmN0aW9uIHN1bkNvb3JkcyhkKSB7XG5cbiAgICB2YXIgTSA9IHNvbGFyTWVhbkFub21hbHkoZCksXG4gICAgICAgIEwgPSBlY2xpcHRpY0xvbmdpdHVkZShNKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlYzogZGVjbGluYXRpb24oTCwgMCksXG4gICAgICAgIHJhOiByaWdodEFzY2Vuc2lvbihMLCAwKVxuICAgIH07XG59XG5cblxudmFyIFN1bkNhbGMgPSB7fTtcblxuXG4vLyBjYWxjdWxhdGVzIHN1biBwb3NpdGlvbiBmb3IgYSBnaXZlbiBkYXRlIGFuZCBsYXRpdHVkZS9sb25naXR1ZGVcblxuU3VuQ2FsYy5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChkYXRlLCBsYXQsIGxuZykge1xuXG4gICAgdmFyIGx3ICA9IHJhZCAqIC1sbmcsXG4gICAgICAgIHBoaSA9IHJhZCAqIGxhdCxcbiAgICAgICAgZCAgID0gdG9EYXlzKGRhdGUpLFxuXG4gICAgICAgIGMgID0gc3VuQ29vcmRzKGQpLFxuICAgICAgICBIICA9IHNpZGVyZWFsVGltZShkLCBsdykgLSBjLnJhO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXppbXV0aDogYXppbXV0aChILCBwaGksIGMuZGVjKSxcbiAgICAgICAgYWx0aXR1ZGU6IGFsdGl0dWRlKEgsIHBoaSwgYy5kZWMpXG4gICAgfTtcbn07XG5cblxuLy8gc3VuIHRpbWVzIGNvbmZpZ3VyYXRpb24gKGFuZ2xlLCBtb3JuaW5nIG5hbWUsIGV2ZW5pbmcgbmFtZSlcblxudmFyIHRpbWVzID0gU3VuQ2FsYy50aW1lcyA9IFtcbiAgICBbLTAuODMzLCAnc3VucmlzZScsICAgICAgICdzdW5zZXQnICAgICAgXSxcbiAgICBbICAtMC4zLCAnc3VucmlzZUVuZCcsICAgICdzdW5zZXRTdGFydCcgXSxcbiAgICBbICAgIC02LCAnZGF3bicsICAgICAgICAgICdkdXNrJyAgICAgICAgXSxcbiAgICBbICAgLTEyLCAnbmF1dGljYWxEYXduJywgICduYXV0aWNhbER1c2snXSxcbiAgICBbICAgLTE4LCAnbmlnaHRFbmQnLCAgICAgICduaWdodCcgICAgICAgXSxcbiAgICBbICAgICA2LCAnZ29sZGVuSG91ckVuZCcsICdnb2xkZW5Ib3VyJyAgXVxuXTtcblxuLy8gYWRkcyBhIGN1c3RvbSB0aW1lIHRvIHRoZSB0aW1lcyBjb25maWdcblxuU3VuQ2FsYy5hZGRUaW1lID0gZnVuY3Rpb24gKGFuZ2xlLCByaXNlTmFtZSwgc2V0TmFtZSkge1xuICAgIHRpbWVzLnB1c2goW2FuZ2xlLCByaXNlTmFtZSwgc2V0TmFtZV0pO1xufTtcblxuXG4vLyBjYWxjdWxhdGlvbnMgZm9yIHN1biB0aW1lc1xuXG52YXIgSjAgPSAwLjAwMDk7XG5cbmZ1bmN0aW9uIGp1bGlhbkN5Y2xlKGQsIGx3KSB7IHJldHVybiBNYXRoLnJvdW5kKGQgLSBKMCAtIGx3IC8gKDIgKiBQSSkpOyB9XG5cbmZ1bmN0aW9uIGFwcHJveFRyYW5zaXQoSHQsIGx3LCBuKSB7IHJldHVybiBKMCArIChIdCArIGx3KSAvICgyICogUEkpICsgbjsgfVxuZnVuY3Rpb24gc29sYXJUcmFuc2l0SihkcywgTSwgTCkgIHsgcmV0dXJuIEoyMDAwICsgZHMgKyAwLjAwNTMgKiBzaW4oTSkgLSAwLjAwNjkgKiBzaW4oMiAqIEwpOyB9XG5cbmZ1bmN0aW9uIGhvdXJBbmdsZShoLCBwaGksIGQpIHsgcmV0dXJuIGFjb3MoKHNpbihoKSAtIHNpbihwaGkpICogc2luKGQpKSAvIChjb3MocGhpKSAqIGNvcyhkKSkpOyB9XG5cbi8vIHJldHVybnMgc2V0IHRpbWUgZm9yIHRoZSBnaXZlbiBzdW4gYWx0aXR1ZGVcbmZ1bmN0aW9uIGdldFNldEooaCwgbHcsIHBoaSwgZGVjLCBuLCBNLCBMKSB7XG5cbiAgICB2YXIgdyA9IGhvdXJBbmdsZShoLCBwaGksIGRlYyksXG4gICAgICAgIGEgPSBhcHByb3hUcmFuc2l0KHcsIGx3LCBuKTtcbiAgICByZXR1cm4gc29sYXJUcmFuc2l0SihhLCBNLCBMKTtcbn1cblxuXG4vLyBjYWxjdWxhdGVzIHN1biB0aW1lcyBmb3IgYSBnaXZlbiBkYXRlIGFuZCBsYXRpdHVkZS9sb25naXR1ZGVcblxuU3VuQ2FsYy5nZXRUaW1lcyA9IGZ1bmN0aW9uIChkYXRlLCBsYXQsIGxuZykge1xuXG4gICAgdmFyIGx3ID0gcmFkICogLWxuZyxcbiAgICAgICAgcGhpID0gcmFkICogbGF0LFxuXG4gICAgICAgIGQgPSB0b0RheXMoZGF0ZSksXG4gICAgICAgIG4gPSBqdWxpYW5DeWNsZShkLCBsdyksXG4gICAgICAgIGRzID0gYXBwcm94VHJhbnNpdCgwLCBsdywgbiksXG5cbiAgICAgICAgTSA9IHNvbGFyTWVhbkFub21hbHkoZHMpLFxuICAgICAgICBMID0gZWNsaXB0aWNMb25naXR1ZGUoTSksXG4gICAgICAgIGRlYyA9IGRlY2xpbmF0aW9uKEwsIDApLFxuXG4gICAgICAgIEpub29uID0gc29sYXJUcmFuc2l0SihkcywgTSwgTCksXG5cbiAgICAgICAgaSwgbGVuLCB0aW1lLCBKc2V0LCBKcmlzZTtcblxuXG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgc29sYXJOb29uOiBmcm9tSnVsaWFuKEpub29uKSxcbiAgICAgICAgbmFkaXI6IGZyb21KdWxpYW4oSm5vb24gLSAwLjUpXG4gICAgfTtcblxuICAgIGZvciAoaSA9IDAsIGxlbiA9IHRpbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIHRpbWUgPSB0aW1lc1tpXTtcblxuICAgICAgICBKc2V0ID0gZ2V0U2V0Sih0aW1lWzBdICogcmFkLCBsdywgcGhpLCBkZWMsIG4sIE0sIEwpO1xuICAgICAgICBKcmlzZSA9IEpub29uIC0gKEpzZXQgLSBKbm9vbik7XG5cbiAgICAgICAgcmVzdWx0W3RpbWVbMV1dID0gZnJvbUp1bGlhbihKcmlzZSk7XG4gICAgICAgIHJlc3VsdFt0aW1lWzJdXSA9IGZyb21KdWxpYW4oSnNldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8gbW9vbiBjYWxjdWxhdGlvbnMsIGJhc2VkIG9uIGh0dHA6Ly9hYS5xdWFlLm5sL2VuL3Jla2VuL2hlbWVscG9zaXRpZS5odG1sIGZvcm11bGFzXG5cbmZ1bmN0aW9uIG1vb25Db29yZHMoZCkgeyAvLyBnZW9jZW50cmljIGVjbGlwdGljIGNvb3JkaW5hdGVzIG9mIHRoZSBtb29uXG5cbiAgICB2YXIgTCA9IHJhZCAqICgyMTguMzE2ICsgMTMuMTc2Mzk2ICogZCksIC8vIGVjbGlwdGljIGxvbmdpdHVkZVxuICAgICAgICBNID0gcmFkICogKDEzNC45NjMgKyAxMy4wNjQ5OTMgKiBkKSwgLy8gbWVhbiBhbm9tYWx5XG4gICAgICAgIEYgPSByYWQgKiAoOTMuMjcyICsgMTMuMjI5MzUwICogZCksICAvLyBtZWFuIGRpc3RhbmNlXG5cbiAgICAgICAgbCAgPSBMICsgcmFkICogNi4yODkgKiBzaW4oTSksIC8vIGxvbmdpdHVkZVxuICAgICAgICBiICA9IHJhZCAqIDUuMTI4ICogc2luKEYpLCAgICAgLy8gbGF0aXR1ZGVcbiAgICAgICAgZHQgPSAzODUwMDEgLSAyMDkwNSAqIGNvcyhNKTsgIC8vIGRpc3RhbmNlIHRvIHRoZSBtb29uIGluIGttXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByYTogcmlnaHRBc2NlbnNpb24obCwgYiksXG4gICAgICAgIGRlYzogZGVjbGluYXRpb24obCwgYiksXG4gICAgICAgIGRpc3Q6IGR0XG4gICAgfTtcbn1cblxuU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24gPSBmdW5jdGlvbiAoZGF0ZSwgbGF0LCBsbmcpIHtcblxuICAgIHZhciBsdyAgPSByYWQgKiAtbG5nLFxuICAgICAgICBwaGkgPSByYWQgKiBsYXQsXG4gICAgICAgIGQgICA9IHRvRGF5cyhkYXRlKSxcblxuICAgICAgICBjID0gbW9vbkNvb3JkcyhkKSxcbiAgICAgICAgSCA9IHNpZGVyZWFsVGltZShkLCBsdykgLSBjLnJhLFxuICAgICAgICBoID0gYWx0aXR1ZGUoSCwgcGhpLCBjLmRlYyksXG4gICAgICAgIC8vIGZvcm11bGEgMTQuMSBvZiBcIkFzdHJvbm9taWNhbCBBbGdvcml0aG1zXCIgMm5kIGVkaXRpb24gYnkgSmVhbiBNZWV1cyAoV2lsbG1hbm4tQmVsbCwgUmljaG1vbmQpIDE5OTguXG4gICAgICAgIHBhID0gYXRhbihzaW4oSCksIHRhbihwaGkpICogY29zKGMuZGVjKSAtIHNpbihjLmRlYykgKiBjb3MoSCkpO1xuXG4gICAgaCA9IGggKyBhc3Ryb1JlZnJhY3Rpb24oaCk7IC8vIGFsdGl0dWRlIGNvcnJlY3Rpb24gZm9yIHJlZnJhY3Rpb25cblxuICAgIHJldHVybiB7XG4gICAgICAgIGF6aW11dGg6IGF6aW11dGgoSCwgcGhpLCBjLmRlYyksXG4gICAgICAgIGFsdGl0dWRlOiBoLFxuICAgICAgICBkaXN0YW5jZTogYy5kaXN0LFxuICAgICAgICBwYXJhbGxhY3RpY0FuZ2xlOiBwYVxuICAgIH07XG59O1xuXG5cbi8vIGNhbGN1bGF0aW9ucyBmb3IgaWxsdW1pbmF0aW9uIHBhcmFtZXRlcnMgb2YgdGhlIG1vb24sXG4vLyBiYXNlZCBvbiBodHRwOi8vaWRsYXN0cm8uZ3NmYy5uYXNhLmdvdi9mdHAvcHJvL2FzdHJvL21waGFzZS5wcm8gZm9ybXVsYXMgYW5kXG4vLyBDaGFwdGVyIDQ4IG9mIFwiQXN0cm9ub21pY2FsIEFsZ29yaXRobXNcIiAybmQgZWRpdGlvbiBieSBKZWFuIE1lZXVzIChXaWxsbWFubi1CZWxsLCBSaWNobW9uZCkgMTk5OC5cblxuU3VuQ2FsYy5nZXRNb29uSWxsdW1pbmF0aW9uID0gZnVuY3Rpb24gKGRhdGUpIHtcblxuICAgIHZhciBkID0gdG9EYXlzKGRhdGUgfHwgbmV3IERhdGUoKSksXG4gICAgICAgIHMgPSBzdW5Db29yZHMoZCksXG4gICAgICAgIG0gPSBtb29uQ29vcmRzKGQpLFxuXG4gICAgICAgIHNkaXN0ID0gMTQ5NTk4MDAwLCAvLyBkaXN0YW5jZSBmcm9tIEVhcnRoIHRvIFN1biBpbiBrbVxuXG4gICAgICAgIHBoaSA9IGFjb3Moc2luKHMuZGVjKSAqIHNpbihtLmRlYykgKyBjb3Mocy5kZWMpICogY29zKG0uZGVjKSAqIGNvcyhzLnJhIC0gbS5yYSkpLFxuICAgICAgICBpbmMgPSBhdGFuKHNkaXN0ICogc2luKHBoaSksIG0uZGlzdCAtIHNkaXN0ICogY29zKHBoaSkpLFxuICAgICAgICBhbmdsZSA9IGF0YW4oY29zKHMuZGVjKSAqIHNpbihzLnJhIC0gbS5yYSksIHNpbihzLmRlYykgKiBjb3MobS5kZWMpIC1cbiAgICAgICAgICAgICAgICBjb3Mocy5kZWMpICogc2luKG0uZGVjKSAqIGNvcyhzLnJhIC0gbS5yYSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnJhY3Rpb246ICgxICsgY29zKGluYykpIC8gMixcbiAgICAgICAgcGhhc2U6IDAuNSArIDAuNSAqIGluYyAqIChhbmdsZSA8IDAgPyAtMSA6IDEpIC8gTWF0aC5QSSxcbiAgICAgICAgYW5nbGU6IGFuZ2xlXG4gICAgfTtcbn07XG5cblxuZnVuY3Rpb24gaG91cnNMYXRlcihkYXRlLCBoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUudmFsdWVPZigpICsgaCAqIGRheU1zIC8gMjQpO1xufVxuXG4vLyBjYWxjdWxhdGlvbnMgZm9yIG1vb24gcmlzZS9zZXQgdGltZXMgYXJlIGJhc2VkIG9uIGh0dHA6Ly93d3cuc3RhcmdhemluZy5uZXQva2VwbGVyL21vb25yaXNlLmh0bWwgYXJ0aWNsZVxuXG5TdW5DYWxjLmdldE1vb25UaW1lcyA9IGZ1bmN0aW9uIChkYXRlLCBsYXQsIGxuZywgaW5VVEMpIHtcbiAgICB2YXIgdCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGlmIChpblVUQykgdC5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBlbHNlIHQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICB2YXIgaGMgPSAwLjEzMyAqIHJhZCxcbiAgICAgICAgaDAgPSBTdW5DYWxjLmdldE1vb25Qb3NpdGlvbih0LCBsYXQsIGxuZykuYWx0aXR1ZGUgLSBoYyxcbiAgICAgICAgaDEsIGgyLCByaXNlLCBzZXQsIGEsIGIsIHhlLCB5ZSwgZCwgcm9vdHMsIHgxLCB4MiwgZHg7XG5cbiAgICAvLyBnbyBpbiAyLWhvdXIgY2h1bmtzLCBlYWNoIHRpbWUgc2VlaW5nIGlmIGEgMy1wb2ludCBxdWFkcmF0aWMgY3VydmUgY3Jvc3NlcyB6ZXJvICh3aGljaCBtZWFucyByaXNlIG9yIHNldClcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSAyNDsgaSArPSAyKSB7XG4gICAgICAgIGgxID0gU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24oaG91cnNMYXRlcih0LCBpKSwgbGF0LCBsbmcpLmFsdGl0dWRlIC0gaGM7XG4gICAgICAgIGgyID0gU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24oaG91cnNMYXRlcih0LCBpICsgMSksIGxhdCwgbG5nKS5hbHRpdHVkZSAtIGhjO1xuXG4gICAgICAgIGEgPSAoaDAgKyBoMikgLyAyIC0gaDE7XG4gICAgICAgIGIgPSAoaDIgLSBoMCkgLyAyO1xuICAgICAgICB4ZSA9IC1iIC8gKDIgKiBhKTtcbiAgICAgICAgeWUgPSAoYSAqIHhlICsgYikgKiB4ZSArIGgxO1xuICAgICAgICBkID0gYiAqIGIgLSA0ICogYSAqIGgxO1xuICAgICAgICByb290cyA9IDA7XG5cbiAgICAgICAgaWYgKGQgPj0gMCkge1xuICAgICAgICAgICAgZHggPSBNYXRoLnNxcnQoZCkgLyAoTWF0aC5hYnMoYSkgKiAyKTtcbiAgICAgICAgICAgIHgxID0geGUgLSBkeDtcbiAgICAgICAgICAgIHgyID0geGUgKyBkeDtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh4MSkgPD0gMSkgcm9vdHMrKztcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh4MikgPD0gMSkgcm9vdHMrKztcbiAgICAgICAgICAgIGlmICh4MSA8IC0xKSB4MSA9IHgyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvb3RzID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoaDAgPCAwKSByaXNlID0gaSArIHgxO1xuICAgICAgICAgICAgZWxzZSBzZXQgPSBpICsgeDE7XG5cbiAgICAgICAgfSBlbHNlIGlmIChyb290cyA9PT0gMikge1xuICAgICAgICAgICAgcmlzZSA9IGkgKyAoeWUgPCAwID8geDIgOiB4MSk7XG4gICAgICAgICAgICBzZXQgPSBpICsgKHllIDwgMCA/IHgxIDogeDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJpc2UgJiYgc2V0KSBicmVhaztcblxuICAgICAgICBoMCA9IGgyO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSB7fTtcblxuICAgIGlmIChyaXNlKSByZXN1bHQucmlzZSA9IGhvdXJzTGF0ZXIodCwgcmlzZSk7XG4gICAgaWYgKHNldCkgcmVzdWx0LnNldCA9IGhvdXJzTGF0ZXIodCwgc2V0KTtcblxuICAgIGlmICghcmlzZSAmJiAhc2V0KSByZXN1bHRbeWUgPiAwID8gJ2Fsd2F5c1VwJyA6ICdhbHdheXNEb3duJ10gPSB0cnVlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8gZXhwb3J0IGFzIE5vZGUgbW9kdWxlIC8gQU1EIG1vZHVsZSAvIGJyb3dzZXIgdmFyaWFibGVcbmlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gU3VuQ2FsYztcbmVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKFN1bkNhbGMpO1xuZWxzZSB3aW5kb3cuU3VuQ2FsYyA9IFN1bkNhbGM7XG5cbn0oKSk7XG4iLCJpbXBvcnQgTmlnaHQyLCB7IElTX0JST1dTRVIgfSBmcm9tICcuL25pZ2h0Mic7XG5leHBvcnQgZGVmYXVsdCBOaWdodDI7XG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5pZiAoSVNfQlJPV1NFUikge1xuICAoZnVuY3Rpb24gKHdpbmRvdykge1xuICAgIHdpbmRvdy5OaWdodDIgPSBOaWdodDI7XG4gIH0pKHdpbmRvdyk7XG59XG4vKiBlc2xpbnQtZW5hYmxlICovXG4iLCJleHBvcnQgY29uc3QgSVNfQlJPV1NFUiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuXG5pbXBvcnQgU3VuQ2FsYyBmcm9tICdzdW5jYWxjJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmlnaHQyIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MgPSB7fSkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmV4dGVuZFNldHRpbmdzKHNldHRpbmdzKTtcblxuICAgIHRoaXMudG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy50aW1lKG5ldyBEYXRlKCkpLCAxMDAwKTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG8pIHRoaXMuYXV0byh0cnVlKTtcblxuICAgIHRoaXMudGhlbWUoKTtcbiAgfVxuXG4gIHRpbWUobm93KSB7XG4gICAgY29uc3QgbWlkbmlnaHQgPSBuZXcgRGF0ZSgpLnNldEhvdXJzKDI0LCAwLCAwLCAwKTtcblxuICAgIGlmICghbG9jYWxTdG9yYWdlLnRpbWUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aW1lJywgSlNPTi5zdHJpbmdpZnkobWlkbmlnaHQpKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbG9jYWxTdG9yYWdlLmxvY2F0aW9uICYmXG4gICAgICBub3cuZ2V0VGltZSgpID4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UudGltZSlcbiAgICApIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0aW1lJyk7XG5cbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNhY2hlQ2xlYXIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2xvY2F0aW9uJyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uQ2FjaGVDbGVhciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub25DYWNoZUNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGVtZSgpIHtcbiAgICBsb2NhbFN0b3JhZ2UuZGFyayA9PT0gJ3RydWUnID8gdGhpcy5kYXJrKCkgOiB0aGlzLmxpZ2h0KCk7XG4gIH1cblxuICBhdXRvKGluaXQpIHtcbiAgICBpZiAoKGluaXQgJiYgIWxvY2FsU3RvcmFnZS5hdXRvKSB8fCAhaW5pdCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dG8nLCAndHJ1ZScpO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25BdXRvID09PSAnZnVuY3Rpb24nKSB0aGlzLnNldHRpbmdzLm9uQXV0bygpO1xuICAgIH1cblxuICAgIGlmICgnZ2VvbG9jYXRpb24nIGluIG5hdmlnYXRvcikgdGhpcy5teUxvY2F0aW9uKCk7XG4gIH1cblxuICBteUxvY2F0aW9uKCkge1xuICAgIGlmICghbG9jYWxTdG9yYWdlLmxvY2F0aW9uKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuc3VjY2Vzcy5iaW5kKHRoaXMpLCB0aGlzLmVycm9yLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmxvY2F0aW9uKTtcblxuICAgICAgdGhpcy5jaGVja1N1blBvc2l0aW9uKGxvY2F0aW9uLmxhdGl0dWRlLCBsb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgIH1cbiAgfVxuXG4gIHN1Y2Nlc3MocG9zKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB7XG4gICAgICBsYXRpdHVkZTogcG9zLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZTogcG9zLmNvb3Jkcy5sb25naXR1ZGVcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja1N1blBvc2l0aW9uKGxvY2F0aW9uLmxhdGl0dWRlLCBsb2NhdGlvbi5sb25naXR1ZGUpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FjaGUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2NhdGlvbicsIEpTT04uc3RyaW5naWZ5KGxvY2F0aW9uKSk7XG4gICAgfVxuICB9O1xuXG4gIGVycm9yKGVycikge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vbkRlbmllZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5zZXR0aW5ncy5vbkRlbmllZCgpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NtYXJ0RGFya0Vycm9yJywge1xuICAgICAgICBkZXRhaWw6IGVyclxuICAgICAgfSlcbiAgICApO1xuICB9O1xuXG4gIGNoZWNrU3VuUG9zaXRpb24obGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgY29uc3QgdGltZXMgPSBuZXcgU3VuQ2FsYy5nZXRUaW1lcyh0aGlzLnRvZGF5LCBsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgICBjb25zdCBzdW5yaXNlID0gdGltZXMuc3VucmlzZUVuZCAtICh0aW1lcy5zdW5yaXNlRW5kIC0gdGltZXMuc3VucmlzZSkgLyAyO1xuICAgIGNvbnN0IHN1bnNldCA9IHRpbWVzLnN1bnNldCAtICh0aW1lcy5zdW5zZXQgLSB0aW1lcy5zdW5zZXRTdGFydCkgLyAyO1xuXG4gICAgY29uc3QgdmFsdWVzID0ge1xuICAgICAgc3VucmlzZTogbmV3IERhdGUoc3VucmlzZSksXG4gICAgICBzdW5zZXQ6IG5ldyBEYXRlKHN1bnNldCksXG4gICAgICBsYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbWFydERhcmsnLCB7XG4gICAgICAgIGRldGFpbDogdmFsdWVzXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmF1dG8gJiYgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuYXV0bykpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgICBub3cuZ2V0VGltZSgpID4gc3VucmlzZSAmJiBub3cuZ2V0VGltZSgpIDwgc3Vuc2V0ID9cbiAgICAgICAgICB0aGlzLmxpZ2h0KCkgOlxuICAgICAgICAgIHRoaXMuZGFyaygpO1xuICAgICAgfVxuICAgIH0sIDEwMCk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vblJlc2V0ID09PSAnZnVuY3Rpb24nKSB0aGlzLnNldHRpbmdzLm9uUmVzZXQoKTtcbiAgfVxuXG4gIGxpZ2h0KCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vbkxpZ2h0ID09PSAnZnVuY3Rpb24nKSB0aGlzLnNldHRpbmdzLm9uTGlnaHQoKTtcblxuICAgIHRoaXMuaXNEYXJrID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5saWdodENsYXNzKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5saWdodENsYXNzKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5kYXJrQ2xhc3MpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmsnLCAnZmFsc2UnKTtcbiAgfVxuXG4gIGRhcmsoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uRGFyayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zZXR0aW5ncy5vbkRhcmsoKTtcblxuICAgIHRoaXMuaXNEYXJrID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmxpZ2h0Q2xhc3MpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmxpZ2h0Q2xhc3MpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmRhcmtDbGFzcyk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFyaycsICd0cnVlJyk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uVG9nZ2xlID09PSAnZnVuY3Rpb24nKSB0aGlzLnNldHRpbmdzLm9uVG9nZ2xlKCk7XG5cbiAgICB0aGlzLmlzRGFyayA/IHRoaXMubGlnaHQoKSA6IHRoaXMuZGFyaygpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dG8nLCAnZmFsc2UnKTtcbiAgfVxuXG4gIGV4dGVuZFNldHRpbmdzKHNldHRpbmdzKSB7XG4gICAgY29uc3QgZGVmYXVsdFNldHRpbmdzID0ge1xuICAgICAgbGlnaHRDbGFzczogJycsIC8vIGNsYXNzIGFkZGVkIHRvIGJvZHkgd2hlbiBkYXJrIG1vZGUgaXMgZGlzYWJsZWRcbiAgICAgIGRhcmtDbGFzczogJ2RhcmsnLCAvLyBjbGFzcyBhZGRlZCB0byBib2R5IHdoZW4gZGFyayBtb2RlIGlzIGVuYWJsZWRcbiAgICAgIGNhY2hlOiB0cnVlLCAvLyBjYWNoZSBsb2NhdGlvbiBjb29yZGluYXRlcyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICBjYWNoZUNsZWFyOiB0cnVlLCAvLyBjbGVhciBsb2NhdGlvbiBjb29yZGluYXRlcyBpbiBsb2NhbCBzdG9yYWdlIGV2ZXJ5ZGF5IGF0IG1pZG5pZ2h0XG4gICAgICBhdXRvOiB0cnVlLCAvLyBlbmFibGUgc21hcnQgc3dpdGNoIG9uIHNjcmlwdCBpbml0XG5cbiAgICAgIG9uQXV0bzogbnVsbCwgLy8gY2FsbGJhY2sgb24gc21hcnQgc3dpdGNoXG4gICAgICBvbkxpZ2h0OiBudWxsLCAvLyBjYWxsYmFjayB3aGVuIGRhcmsgbW9kZSBpcyBkaXNhYmxlZFxuICAgICAgb25EYXJrOiBudWxsLCAvLyBjYWxsYmFjayB3aGVuIGRhcmsgbW9kZSBpcyBlbmFibGVkXG4gICAgICBvblRvZ2dsZTogbnVsbCwgLy8gY2FsbGJhY2sgb24gZGFyay9saWdodCBtb2RlIHRvZ2dsZVxuICAgICAgb25EZW5pZWQ6IG51bGwsIC8vIGNhbGxiYWNrIG9uIGdlb2xvY2F0aW9uIHBlcm1pc3Npb24gZGVpbmVkXG4gICAgICBvbkNhY2hlQ2xlYXI6IG51bGwsIC8vIGNhbGxiYWNrIHdoZW4gbG9jYXRpb24gY29vcmRpbmF0ZXMgYW5kIG1pZG5pZ2h0IHRpbWUgaW4gbG9jYWwgc3RvcmFnZSBjbGVhcmVkXG4gICAgICBvblJlc2V0OiBudWxsIC8vIGNhbGxiYWNrIG9uIGxvY2FsU3RvcmFnZSByZXNldFxuICAgIH07XG5cbiAgICBjb25zdCBuZXdTZXR0aW5ncyA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkZWZhdWx0U2V0dGluZ3MpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgaWYgKHByb3BlcnR5IGluIHNldHRpbmdzKSBuZXdTZXR0aW5nc1twcm9wZXJ0eV0gPSBzZXR0aW5nc1twcm9wZXJ0eV07XG4gICAgICBlbHNlIG5ld1NldHRpbmdzW3Byb3BlcnR5XSA9IGRlZmF1bHRTZXR0aW5nc1twcm9wZXJ0eV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1NldHRpbmdzO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
