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

              this.settings = this.extendSettings(settings); // console.log('constructor auto = ', localStorage.auto);
              // console.log('constructor dark = ', localStorage.dark);
              // console.log('constructor light = ', localStorage.light);

              this.today = new Date();
              this.time(this.today); // 바로 시작하고,  인터벌로 60분마다.

              setInterval(function () {
                return _this.time(new Date());
              }, this.settings.intervalForTime * 1000 * 60);
              if (this.settings.auto) this.auto(true); // 시작시 auto를 부름.. 여기서

              this.theme();
            }

            _createClass(Night2, [
              {
                key: 'time',
                value: function time(now) {
                  // console.log('time now = ', now);
                  var midnight = new Date().setHours(24, 0, 0, 0);

                  if (!localStorage.time) {
                    localStorage.setItem('time', JSON.stringify(midnight));

                    if (!localStorage.location) {
                      // 로케이션이
                      if ('geolocation' in navigator) this.myLocation();
                    }
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
                  // console.log('theme dark?', localStorage.dark);
                  return localStorage.dark === 'true' ? this.dark() : this.light();
                }
              },
              {
                key: 'auto',
                value: function auto(init) {
                  // console.log('auto(init)', init);
                  // if (this.settings.auto) return; // 이미 auto가 true이면 2개의 interval이 돌고 있음
                  if ((init && !localStorage.auto) || !init) {
                    // console.log('set auto true', init);
                    localStorage.setItem('auto', 'true'); // setInterval(() => this.time(new Date()), this.settings.intervalForTime); // 매뉴얼 오토시 필요?
                    // this.setIntervalCheckMidnight();

                    if (typeof this.settings.onAuto === 'function') this.settings.onAuto();
                  }

                  if ('geolocation' in navigator) this.myLocation();
                }
              },
              {
                key: 'myLocation',
                value: function myLocation() {
                  if (!localStorage.location) {
                    // console.log('myLocation localStorage.location', localStorage.location);
                    navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this));
                  } else {
                    var location = JSON.parse(localStorage.location); // console.log('myLocation location', location);

                    this.checkSunPosition(location.latitude, location.longitude);
                  }
                }
              },
              {
                key: 'success',
                value: function success(pos) {
                  // console.log('success');
                  var location = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                  }; // console.log('location', location);

                  this.checkSunPosition(location.latitude, location.longitude);

                  if (this.settings.cache) {
                    localStorage.setItem('location', JSON.stringify(location));
                  }
                }
              },
              {
                key: 'error',
                value: function error(err) {
                  // console.log('error');
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

                  var sunrise =
                    times.sunriseEnd -
                    (times.sunriseEnd - times.sunrise) / 2 +
                    this.settings.offset * 60 * 1000;
                  var sunset =
                    times.sunset - (times.sunset - times.sunsetStart) / 2 - this.settings.offset * 60 * 1000;
                  var values = {
                    sunrise: new Date(sunrise),
                    sunset: new Date(sunset),
                    latitude: latitude,
                    longitude: longitude
                  }; // console.log('checkSunPosition values', values);

                  document.dispatchEvent(
                    new CustomEvent('smartDark', {
                      detail: values
                    })
                  ); // 시작시 한번 실행하고,  다음에 인터벌

                  if (localStorage.auto && JSON.parse(localStorage.auto)) {
                    // console.log('시작시 한번 실행하고,  다음에 인터벌');
                    var now = new Date();
                    var state = this.isDark;
                    now.getTime() > sunrise && now.getTime() < sunset ? this.light() : this.dark();

                    if (state !== this.isDark) {
                      if (typeof this.settings.onChange === 'function') {
                        this.settings.onChange(this.isDark);
                      }
                    }
                  }

                  this.intervalForCheckSunPosition = setInterval(function () {
                    // console.log('interval localStorage.auto', localStorage.auto);
                    if (localStorage.auto && JSON.parse(localStorage.auto)) {
                      // console.log('선 포지션 체크함');
                      var _now = new Date();

                      var _state = _this2.isDark;
                      _now.getTime() > sunrise && _now.getTime() < sunset ? _this2.light() : _this2.dark();

                      if (_state !== _this2.isDark) {
                        if (typeof _this2.settings.onChange === 'function') {
                          _this2.settings.onChange(_this2.isDark);
                        }
                      }
                    }
                  }, this.settings.intervalForCheckSun * 1000 * 60); // 원래 값이 100 너무 자주 체크??
                }
              },
              {
                key: 'reset',
                value: function reset() {
                  // console.log('reset');
                  localStorage.clear();
                  clearInterval(this.intervalForCheckSunPosition);
                  if (typeof this.settings.onReset === 'function') this.settings.onReset();
                }
              },
              {
                key: 'light',
                value: function light() {
                  // console.log('light mode');
                  // console.log('    localStorage.auto', localStorage.auto);
                  // console.log('    localStorage.dark', localStorage.dark);
                  // console.log('    localStorage.time', localStorage.time);
                  // console.log('    localStorage.location', localStorage.location);
                  if (typeof this.settings.onLight === 'function') this.settings.onLight();
                  this.isDark = false;

                  if (this.settings.lightClass) {
                    document.body.classList.add(this.settings.lightClass); // document.getElementById(this.settings.divId).classList.add(this.settings.lightClass);
                  }

                  document.body.classList.remove(this.settings.darkClass); // document.getElementById(this.settings.divId).classList.remove(this.settings.darkClass);

                  localStorage.setItem('dark', 'false'); // localStorage.setItem('auto', 'false'); // Auto 모드 Off
                }
              },
              {
                key: 'dark',
                value: function dark() {
                  // console.log('dark mode');
                  // console.log('    localStorage.auto', localStorage.auto);
                  // console.log('    localStorage.dark', localStorage.dark);
                  // console.log('    localStorage.time', localStorage.time);
                  // console.log('    localStorage.location', localStorage.location);
                  if (typeof this.settings.onDark === 'function') this.settings.onDark();
                  this.isDark = true;

                  if (this.settings.lightClass) {
                    document.body.classList.remove(this.settings.lightClass); // document.getElementById(this.settings.divId).classList.remove(this.settings.lightClass);
                  }

                  document.body.classList.add(this.settings.darkClass); // document.getElementById(this.settings.divId).classList.add(this.settings.darkClass);

                  localStorage.setItem('dark', 'true'); // localStorage.setItem('auto', 'false'); // Auto 모드 Off
                }
              },
              {
                key: 'toggle',
                value: function toggle() {
                  // console.log('toggle');
                  this.isDark ? this.light() : this.dark();
                  if (typeof this.settings.onToggle === 'function') this.settings.onToggle(this.isDark);
                  localStorage.setItem('auto', 'false'); // Auto 모드 Off
                }
              },
              {
                key: 'extendSettings',
                value: function extendSettings(settings) {
                  var defaultSettings = {
                    divId: 'default',
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
                    intervalForCheckSun: 10,
                    // 10분 마다 체크
                    intervalForTime: 60,
                    // 60분마다 체크
                    offset: 30,
                    // 선라이즈+30분, 선셋-30분
                    onAuto: null,
                    // callback on smart switch
                    onLight: null,
                    // callback when dark mode is disabled
                    onDark: null,
                    // callback when dark mode is enabled
                    onToggle: null,
                    // callback on dark/light mode toggle
                    onChange: null,
                    // callback on 인터발에서 불러주는 펑션
                    onDenied: null,
                    // callback on geolocation permission deined
                    onCacheClear: null,
                    // callback when location coordinates and midnight time in local storage cleared
                    onReset: null // callback on localStorage reset
                  };
                  var newSettings = {};
                  /* eslint-disable */

                  for (var property in defaultSettings) {
                    /* eslint-enable */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uaWdodDIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25pZ2h0Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uaWdodDIvLi9ub2RlX21vZHVsZXMvc3VuY2FsYy9zdW5jYWxjLmpzIiwid2VicGFjazovL25pZ2h0Mi8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9uaWdodDIvLi9zcmMvbmlnaHQyLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIk5pZ2h0MiIsIklTX0JST1dTRVIiLCJzZXR0aW5ncyIsImV4dGVuZFNldHRpbmdzIiwidG9kYXkiLCJEYXRlIiwidGltZSIsInNldEludGVydmFsIiwiaW50ZXJ2YWxGb3JUaW1lIiwiYXV0byIsInRoZW1lIiwibm93IiwibWlkbmlnaHQiLCJzZXRIb3VycyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwibG9jYXRpb24iLCJuYXZpZ2F0b3IiLCJteUxvY2F0aW9uIiwiZ2V0VGltZSIsInBhcnNlIiwicmVtb3ZlSXRlbSIsImNhY2hlQ2xlYXIiLCJvbkNhY2hlQ2xlYXIiLCJkYXJrIiwibGlnaHQiLCJpbml0Iiwib25BdXRvIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJzdWNjZXNzIiwiYmluZCIsImVycm9yIiwiY2hlY2tTdW5Qb3NpdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwicG9zIiwiY29vcmRzIiwiY2FjaGUiLCJlcnIiLCJvbkRlbmllZCIsImRvY3VtZW50IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwidGltZXMiLCJnZXRUaW1lcyIsInN1bnJpc2UiLCJzdW5yaXNlRW5kIiwib2Zmc2V0Iiwic3Vuc2V0Iiwic3Vuc2V0U3RhcnQiLCJ2YWx1ZXMiLCJzdGF0ZSIsImlzRGFyayIsIm9uQ2hhbmdlIiwiaW50ZXJ2YWxGb3JDaGVja1N1blBvc2l0aW9uIiwiaW50ZXJ2YWxGb3JDaGVja1N1biIsImNsZWFyIiwiY2xlYXJJbnRlcnZhbCIsIm9uUmVzZXQiLCJvbkxpZ2h0IiwibGlnaHRDbGFzcyIsImJvZHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkYXJrQ2xhc3MiLCJvbkRhcmsiLCJvblRvZ2dsZSIsImRlZmF1bHRTZXR0aW5ncyIsImRpdklkIiwibmV3U2V0dGluZ3MiLCJwcm9wZXJ0eSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWM7O0FBRWQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlCQUF5Qiw2Q0FBNkM7QUFDdEUseUJBQXlCLDRDQUE0QztBQUNyRSx5QkFBeUIsK0JBQStCOzs7QUFHeEQ7O0FBRUEsc0JBQXNCOztBQUV0QiwrQkFBK0Isd0RBQXdEO0FBQ3ZGLCtCQUErQix5REFBeUQ7O0FBRXhGLGdDQUFnQyw4REFBOEQ7QUFDOUYsZ0NBQWdDLGlFQUFpRTs7QUFFakcsOEJBQThCLDhDQUE4Qzs7QUFFNUU7QUFDQTtBQUNBLGNBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsOEJBQThCLDBDQUEwQzs7QUFFeEU7O0FBRUE7QUFDQSwyQkFBMkI7O0FBRTNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBLDZCQUE2QiwyQ0FBMkM7O0FBRXhFLG1DQUFtQyxzQ0FBc0M7QUFDekUsbUNBQW1DLDJEQUEyRDs7QUFFOUYsK0JBQStCLGlFQUFpRTs7QUFFaEc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsU0FBUztBQUM1Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQSx3QkFBd0I7O0FBRXhCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBLElBQUksSUFBNEQ7QUFDaEUsS0FBSyxFQUN5Qjs7QUFFOUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JURDs7Ozs7OztBQUdBOzs7O0FBQ0EsdUJBQWdCO0FBQ2QsR0FBQyxVQUFVQSxNQUFWLEVBQWtCO0FBQ2pCQSxVQUFNLENBQUNDLE1BQVA7QUFDRCxHQUZELEVBRUdELE1BRkg7QUFHRDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7Ozs7Ozs7Ozs7QUFGTyxJQUFNRSxVQUFVLEdBQUcsT0FBT0YsTUFBUCxLQUFrQixXQUFyQzs7O0lBSWNDLE07QUFDbkIsb0JBQTJCO0FBQUE7O0FBQUEsUUFBZkUsUUFBZSx1RUFBSixFQUFJOztBQUFBOztBQUN6QixTQUFLQSxRQUFMLEdBQWdCLEtBQUtDLGNBQUwsQ0FBb0JELFFBQXBCLENBQWhCLENBRHlCLENBRXpCO0FBQ0E7QUFDQTs7QUFFQSxTQUFLRSxLQUFMLEdBQWEsSUFBSUMsSUFBSixFQUFiO0FBRUEsU0FBS0MsSUFBTCxDQUFVLEtBQUtGLEtBQWYsRUFSeUIsQ0FRRjs7QUFFdkJHLGVBQVcsQ0FBQztBQUFBLGFBQU0sS0FBSSxDQUFDRCxJQUFMLENBQVUsSUFBSUQsSUFBSixFQUFWLENBQU47QUFBQSxLQUFELEVBQThCLEtBQUtILFFBQUwsQ0FBY00sZUFBZCxHQUFnQyxJQUFoQyxHQUF1QyxFQUFyRSxDQUFYO0FBRUEsUUFBSSxLQUFLTixRQUFMLENBQWNPLElBQWxCLEVBQXdCLEtBQUtBLElBQUwsQ0FBVSxJQUFWLEVBWkMsQ0FZZ0I7O0FBQ3pDLFNBQUtDLEtBQUw7QUFDRDs7Ozt5QkFFSUMsRyxFQUFLO0FBQ1I7QUFDQSxVQUFNQyxRQUFRLEdBQUcsSUFBSVAsSUFBSixHQUFXUSxRQUFYLENBQW9CLEVBQXBCLEVBQXdCLENBQXhCLEVBQTJCLENBQTNCLEVBQThCLENBQTlCLENBQWpCOztBQUVBLFVBQUksQ0FBQ0MsWUFBWSxDQUFDUixJQUFsQixFQUF3QjtBQUN0QlEsb0JBQVksQ0FBQ0MsT0FBYixDQUFxQixNQUFyQixFQUE2QkMsSUFBSSxDQUFDQyxTQUFMLENBQWVMLFFBQWYsQ0FBN0I7O0FBQ0EsWUFBSSxDQUFDRSxZQUFZLENBQUNJLFFBQWxCLEVBQTRCO0FBQzFCO0FBQ0EsY0FBSSxpQkFBaUJDLFNBQXJCLEVBQWdDLEtBQUtDLFVBQUw7QUFDakM7QUFDRixPQU5ELE1BTU8sSUFBSU4sWUFBWSxDQUFDSSxRQUFiLElBQXlCUCxHQUFHLENBQUNVLE9BQUosS0FBZ0JMLElBQUksQ0FBQ00sS0FBTCxDQUFXUixZQUFZLENBQUNSLElBQXhCLENBQTdDLEVBQTRFO0FBQ2pGUSxvQkFBWSxDQUFDUyxVQUFiLENBQXdCLE1BQXhCOztBQUVBLFlBQUksS0FBS3JCLFFBQUwsQ0FBY3NCLFVBQWxCLEVBQThCO0FBQzVCVixzQkFBWSxDQUFDUyxVQUFiLENBQXdCLFVBQXhCOztBQUVBLGNBQUksT0FBTyxLQUFLckIsUUFBTCxDQUFjdUIsWUFBckIsS0FBc0MsVUFBMUMsRUFBc0Q7QUFDcEQsaUJBQUt2QixRQUFMLENBQWN1QixZQUFkO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7Ozs0QkFFTztBQUNOO0FBQ0EsYUFBT1gsWUFBWSxDQUFDWSxJQUFiLEtBQXNCLE1BQXRCLEdBQStCLEtBQUtBLElBQUwsRUFBL0IsR0FBNkMsS0FBS0MsS0FBTCxFQUFwRDtBQUNEOzs7eUJBRUlDLEksRUFBTTtBQUNUO0FBQ0E7QUFDQSxVQUFLQSxJQUFJLElBQUksQ0FBQ2QsWUFBWSxDQUFDTCxJQUF2QixJQUFnQyxDQUFDbUIsSUFBckMsRUFBMkM7QUFDekM7QUFDQWQsb0JBQVksQ0FBQ0MsT0FBYixDQUFxQixNQUFyQixFQUE2QixNQUE3QixFQUZ5QyxDQUl6QztBQUNBOztBQUVBLFlBQUksT0FBTyxLQUFLYixRQUFMLENBQWMyQixNQUFyQixLQUFnQyxVQUFwQyxFQUFnRCxLQUFLM0IsUUFBTCxDQUFjMkIsTUFBZDtBQUNqRDs7QUFFRCxVQUFJLGlCQUFpQlYsU0FBckIsRUFBZ0MsS0FBS0MsVUFBTDtBQUNqQzs7O2lDQUVZO0FBQ1gsVUFBSSxDQUFDTixZQUFZLENBQUNJLFFBQWxCLEVBQTRCO0FBQzFCO0FBQ0FDLGlCQUFTLENBQUNXLFdBQVYsQ0FBc0JDLGtCQUF0QixDQUF5QyxLQUFLQyxPQUFMLENBQWFDLElBQWIsQ0FBa0IsSUFBbEIsQ0FBekMsRUFBa0UsS0FBS0MsS0FBTCxDQUFXRCxJQUFYLENBQWdCLElBQWhCLENBQWxFO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsWUFBTWYsUUFBUSxHQUFHRixJQUFJLENBQUNNLEtBQUwsQ0FBV1IsWUFBWSxDQUFDSSxRQUF4QixDQUFqQixDQURLLENBR0w7O0FBRUEsYUFBS2lCLGdCQUFMLENBQXNCakIsUUFBUSxDQUFDa0IsUUFBL0IsRUFBeUNsQixRQUFRLENBQUNtQixTQUFsRDtBQUNEO0FBQ0Y7Ozs0QkFFT0MsRyxFQUFLO0FBQ1g7QUFDQSxVQUFNcEIsUUFBUSxHQUFHO0FBQ2ZrQixnQkFBUSxFQUFFRSxHQUFHLENBQUNDLE1BQUosQ0FBV0gsUUFETjtBQUVmQyxpQkFBUyxFQUFFQyxHQUFHLENBQUNDLE1BQUosQ0FBV0Y7QUFGUCxPQUFqQixDQUZXLENBT1g7O0FBRUEsV0FBS0YsZ0JBQUwsQ0FBc0JqQixRQUFRLENBQUNrQixRQUEvQixFQUF5Q2xCLFFBQVEsQ0FBQ21CLFNBQWxEOztBQUVBLFVBQUksS0FBS25DLFFBQUwsQ0FBY3NDLEtBQWxCLEVBQXlCO0FBQ3ZCMUIsb0JBQVksQ0FBQ0MsT0FBYixDQUFxQixVQUFyQixFQUFpQ0MsSUFBSSxDQUFDQyxTQUFMLENBQWVDLFFBQWYsQ0FBakM7QUFDRDtBQUNGOzs7MEJBRUt1QixHLEVBQUs7QUFDVDtBQUNBLFVBQUksT0FBTyxLQUFLdkMsUUFBTCxDQUFjd0MsUUFBckIsS0FBa0MsVUFBdEMsRUFBa0Q7QUFDaEQsYUFBS3hDLFFBQUwsQ0FBY3dDLFFBQWQ7QUFDRDs7QUFFREMsY0FBUSxDQUFDQyxhQUFULENBQ0UsSUFBSUMsV0FBSixDQUFnQixnQkFBaEIsRUFBa0M7QUFDaENDLGNBQU0sRUFBRUw7QUFEd0IsT0FBbEMsQ0FERjtBQUtEOzs7cUNBRWdCTCxRLEVBQVVDLFMsRUFBVztBQUFBOztBQUNwQztBQUNBLFVBQU1VLEtBQUssR0FBRyxJQUFJLGlCQUFRQyxRQUFaLENBQXFCLEtBQUs1QyxLQUExQixFQUFpQ2dDLFFBQWpDLEVBQTJDQyxTQUEzQyxDQUFkO0FBQ0E7O0FBRUEsVUFBTVksT0FBTyxHQUNYRixLQUFLLENBQUNHLFVBQU4sR0FBbUIsQ0FBQ0gsS0FBSyxDQUFDRyxVQUFOLEdBQW1CSCxLQUFLLENBQUNFLE9BQTFCLElBQXFDLENBQXhELEdBQTRELEtBQUsvQyxRQUFMLENBQWNpRCxNQUFkLEdBQXVCLEVBQXZCLEdBQTRCLElBRDFGO0FBRUEsVUFBTUMsTUFBTSxHQUFHTCxLQUFLLENBQUNLLE1BQU4sR0FBZSxDQUFDTCxLQUFLLENBQUNLLE1BQU4sR0FBZUwsS0FBSyxDQUFDTSxXQUF0QixJQUFxQyxDQUFwRCxHQUF3RCxLQUFLbkQsUUFBTCxDQUFjaUQsTUFBZCxHQUF1QixFQUF2QixHQUE0QixJQUFuRztBQUVBLFVBQU1HLE1BQU0sR0FBRztBQUNiTCxlQUFPLEVBQUUsSUFBSTVDLElBQUosQ0FBUzRDLE9BQVQsQ0FESTtBQUViRyxjQUFNLEVBQUUsSUFBSS9DLElBQUosQ0FBUytDLE1BQVQsQ0FGSztBQUdiaEIsZ0JBQVEsRUFBUkEsUUFIYTtBQUliQyxpQkFBUyxFQUFUQTtBQUphLE9BQWYsQ0FUb0MsQ0FnQnBDOztBQUVBTSxjQUFRLENBQUNDLGFBQVQsQ0FDRSxJQUFJQyxXQUFKLENBQWdCLFdBQWhCLEVBQTZCO0FBQzNCQyxjQUFNLEVBQUVRO0FBRG1CLE9BQTdCLENBREYsRUFsQm9DLENBd0JwQzs7QUFDQSxVQUFJeEMsWUFBWSxDQUFDTCxJQUFiLElBQXFCTyxJQUFJLENBQUNNLEtBQUwsQ0FBV1IsWUFBWSxDQUFDTCxJQUF4QixDQUF6QixFQUF3RDtBQUN0RDtBQUNBLFlBQU1FLEdBQUcsR0FBRyxJQUFJTixJQUFKLEVBQVo7QUFFQSxZQUFNa0QsS0FBSyxHQUFHLEtBQUtDLE1BQW5CO0FBRUE3QyxXQUFHLENBQUNVLE9BQUosS0FBZ0I0QixPQUFoQixJQUEyQnRDLEdBQUcsQ0FBQ1UsT0FBSixLQUFnQitCLE1BQTNDLEdBQW9ELEtBQUt6QixLQUFMLEVBQXBELEdBQW1FLEtBQUtELElBQUwsRUFBbkU7O0FBRUEsWUFBSTZCLEtBQUssS0FBSyxLQUFLQyxNQUFuQixFQUEyQjtBQUN6QixjQUFJLE9BQU8sS0FBS3RELFFBQUwsQ0FBY3VELFFBQXJCLEtBQWtDLFVBQXRDLEVBQWtEO0FBQ2hELGlCQUFLdkQsUUFBTCxDQUFjdUQsUUFBZCxDQUF1QixLQUFLRCxNQUE1QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxXQUFLRSwyQkFBTCxHQUFtQ25ELFdBQVcsQ0FBQyxZQUFNO0FBQ25EO0FBQ0EsWUFBSU8sWUFBWSxDQUFDTCxJQUFiLElBQXFCTyxJQUFJLENBQUNNLEtBQUwsQ0FBV1IsWUFBWSxDQUFDTCxJQUF4QixDQUF6QixFQUF3RDtBQUN0RDtBQUNBLGNBQU1FLElBQUcsR0FBRyxJQUFJTixJQUFKLEVBQVo7O0FBRUEsY0FBTWtELE1BQUssR0FBRyxNQUFJLENBQUNDLE1BQW5CO0FBRUE3QyxjQUFHLENBQUNVLE9BQUosS0FBZ0I0QixPQUFoQixJQUEyQnRDLElBQUcsQ0FBQ1UsT0FBSixLQUFnQitCLE1BQTNDLEdBQW9ELE1BQUksQ0FBQ3pCLEtBQUwsRUFBcEQsR0FBbUUsTUFBSSxDQUFDRCxJQUFMLEVBQW5FOztBQUVBLGNBQUk2QixNQUFLLEtBQUssTUFBSSxDQUFDQyxNQUFuQixFQUEyQjtBQUN6QixnQkFBSSxPQUFPLE1BQUksQ0FBQ3RELFFBQUwsQ0FBY3VELFFBQXJCLEtBQWtDLFVBQXRDLEVBQWtEO0FBQ2hELG9CQUFJLENBQUN2RCxRQUFMLENBQWN1RCxRQUFkLENBQXVCLE1BQUksQ0FBQ0QsTUFBNUI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQWhCNkMsRUFnQjNDLEtBQUt0RCxRQUFMLENBQWN5RCxtQkFBZCxHQUFvQyxJQUFwQyxHQUEyQyxFQWhCQSxDQUE5QyxDQXhDb0MsQ0F3RGU7QUFDcEQ7Ozs0QkFFTztBQUNOO0FBQ0E3QyxrQkFBWSxDQUFDOEMsS0FBYjtBQUNBQyxtQkFBYSxDQUFDLEtBQUtILDJCQUFOLENBQWI7QUFFQSxVQUFJLE9BQU8sS0FBS3hELFFBQUwsQ0FBYzRELE9BQXJCLEtBQWlDLFVBQXJDLEVBQWlELEtBQUs1RCxRQUFMLENBQWM0RCxPQUFkO0FBQ2xEOzs7NEJBRU87QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBSSxPQUFPLEtBQUs1RCxRQUFMLENBQWM2RCxPQUFyQixLQUFpQyxVQUFyQyxFQUFpRCxLQUFLN0QsUUFBTCxDQUFjNkQsT0FBZDtBQUVqRCxXQUFLUCxNQUFMLEdBQWMsS0FBZDs7QUFFQSxVQUFJLEtBQUt0RCxRQUFMLENBQWM4RCxVQUFsQixFQUE4QjtBQUM1QnJCLGdCQUFRLENBQUNzQixJQUFULENBQWNDLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLEtBQUtqRSxRQUFMLENBQWM4RCxVQUExQyxFQUQ0QixDQUU1QjtBQUNEOztBQUVEckIsY0FBUSxDQUFDc0IsSUFBVCxDQUFjQyxTQUFkLENBQXdCRSxNQUF4QixDQUErQixLQUFLbEUsUUFBTCxDQUFjbUUsU0FBN0MsRUFmTSxDQWdCTjs7QUFFQXZELGtCQUFZLENBQUNDLE9BQWIsQ0FBcUIsTUFBckIsRUFBNkIsT0FBN0IsRUFsQk0sQ0FtQk47QUFDRDs7OzJCQUVNO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQUksT0FBTyxLQUFLYixRQUFMLENBQWNvRSxNQUFyQixLQUFnQyxVQUFwQyxFQUFnRCxLQUFLcEUsUUFBTCxDQUFjb0UsTUFBZDtBQUVoRCxXQUFLZCxNQUFMLEdBQWMsSUFBZDs7QUFFQSxVQUFJLEtBQUt0RCxRQUFMLENBQWM4RCxVQUFsQixFQUE4QjtBQUM1QnJCLGdCQUFRLENBQUNzQixJQUFULENBQWNDLFNBQWQsQ0FBd0JFLE1BQXhCLENBQStCLEtBQUtsRSxRQUFMLENBQWM4RCxVQUE3QyxFQUQ0QixDQUU1QjtBQUNEOztBQUVEckIsY0FBUSxDQUFDc0IsSUFBVCxDQUFjQyxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixLQUFLakUsUUFBTCxDQUFjbUUsU0FBMUMsRUFmSyxDQWdCTDs7QUFFQXZELGtCQUFZLENBQUNDLE9BQWIsQ0FBcUIsTUFBckIsRUFBNkIsTUFBN0IsRUFsQkssQ0FtQkw7QUFDRDs7OzZCQUVRO0FBQ1A7QUFDQSxXQUFLeUMsTUFBTCxHQUFjLEtBQUs3QixLQUFMLEVBQWQsR0FBNkIsS0FBS0QsSUFBTCxFQUE3QjtBQUVBLFVBQUksT0FBTyxLQUFLeEIsUUFBTCxDQUFjcUUsUUFBckIsS0FBa0MsVUFBdEMsRUFBa0QsS0FBS3JFLFFBQUwsQ0FBY3FFLFFBQWQsQ0FBdUIsS0FBS2YsTUFBNUI7QUFFbEQxQyxrQkFBWSxDQUFDQyxPQUFiLENBQXFCLE1BQXJCLEVBQTZCLE9BQTdCLEVBTk8sQ0FNZ0M7QUFDeEM7OzttQ0FFY2IsUSxFQUFVO0FBQ3ZCLFVBQU1zRSxlQUFlLEdBQUc7QUFDdEJDLGFBQUssRUFBRSxTQURlO0FBRXRCVCxrQkFBVSxFQUFFLEVBRlU7QUFFTjtBQUNoQkssaUJBQVMsRUFBRSxNQUhXO0FBR0g7QUFDbkI3QixhQUFLLEVBQUUsSUFKZTtBQUlUO0FBQ2JoQixrQkFBVSxFQUFFLElBTFU7QUFLSjtBQUNsQmYsWUFBSSxFQUFFLElBTmdCO0FBTVY7QUFDWmtELDJCQUFtQixFQUFFLEVBUEM7QUFPRztBQUN6Qm5ELHVCQUFlLEVBQUUsRUFSSztBQVFEO0FBQ3JCMkMsY0FBTSxFQUFFLEVBVGM7QUFTVjtBQUVadEIsY0FBTSxFQUFFLElBWGM7QUFXUjtBQUNka0MsZUFBTyxFQUFFLElBWmE7QUFZUDtBQUNmTyxjQUFNLEVBQUUsSUFiYztBQWFSO0FBQ2RDLGdCQUFRLEVBQUUsSUFkWTtBQWNOO0FBQ2hCZCxnQkFBUSxFQUFFLElBZlk7QUFlTjtBQUNoQmYsZ0JBQVEsRUFBRSxJQWhCWTtBQWdCTjtBQUNoQmpCLG9CQUFZLEVBQUUsSUFqQlE7QUFpQkY7QUFDcEJxQyxlQUFPLEVBQUUsSUFsQmEsQ0FrQlI7O0FBbEJRLE9BQXhCO0FBcUJBLFVBQU1ZLFdBQVcsR0FBRyxFQUFwQjtBQUVBOztBQUNBLFdBQUssSUFBTUMsUUFBWCxJQUF1QkgsZUFBdkIsRUFBd0M7QUFDdEM7QUFDQSxZQUFJRyxRQUFRLElBQUl6RSxRQUFoQixFQUEwQndFLFdBQVcsQ0FBQ0MsUUFBRCxDQUFYLEdBQXdCekUsUUFBUSxDQUFDeUUsUUFBRCxDQUFoQyxDQUExQixLQUNLRCxXQUFXLENBQUNDLFFBQUQsQ0FBWCxHQUF3QkgsZUFBZSxDQUFDRyxRQUFELENBQXZDO0FBQ047O0FBRUQsYUFBT0QsV0FBUDtBQUNEIiwiZmlsZSI6Im5pZ2h0Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwibmlnaHQyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5pZ2h0MlwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuaWdodDJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKlxuIChjKSAyMDExLTIwMTUsIFZsYWRpbWlyIEFnYWZvbmtpblxuIFN1bkNhbGMgaXMgYSBKYXZhU2NyaXB0IGxpYnJhcnkgZm9yIGNhbGN1bGF0aW5nIHN1bi9tb29uIHBvc2l0aW9uIGFuZCBsaWdodCBwaGFzZXMuXG4gaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvc3VuY2FsY1xuKi9cblxuKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4vLyBzaG9ydGN1dHMgZm9yIGVhc2llciB0byByZWFkIGZvcm11bGFzXG5cbnZhciBQSSAgID0gTWF0aC5QSSxcbiAgICBzaW4gID0gTWF0aC5zaW4sXG4gICAgY29zICA9IE1hdGguY29zLFxuICAgIHRhbiAgPSBNYXRoLnRhbixcbiAgICBhc2luID0gTWF0aC5hc2luLFxuICAgIGF0YW4gPSBNYXRoLmF0YW4yLFxuICAgIGFjb3MgPSBNYXRoLmFjb3MsXG4gICAgcmFkICA9IFBJIC8gMTgwO1xuXG4vLyBzdW4gY2FsY3VsYXRpb25zIGFyZSBiYXNlZCBvbiBodHRwOi8vYWEucXVhZS5ubC9lbi9yZWtlbi96b25wb3NpdGllLmh0bWwgZm9ybXVsYXNcblxuXG4vLyBkYXRlL3RpbWUgY29uc3RhbnRzIGFuZCBjb252ZXJzaW9uc1xuXG52YXIgZGF5TXMgPSAxMDAwICogNjAgKiA2MCAqIDI0LFxuICAgIEoxOTcwID0gMjQ0MDU4OCxcbiAgICBKMjAwMCA9IDI0NTE1NDU7XG5cbmZ1bmN0aW9uIHRvSnVsaWFuKGRhdGUpIHsgcmV0dXJuIGRhdGUudmFsdWVPZigpIC8gZGF5TXMgLSAwLjUgKyBKMTk3MDsgfVxuZnVuY3Rpb24gZnJvbUp1bGlhbihqKSAgeyByZXR1cm4gbmV3IERhdGUoKGogKyAwLjUgLSBKMTk3MCkgKiBkYXlNcyk7IH1cbmZ1bmN0aW9uIHRvRGF5cyhkYXRlKSAgIHsgcmV0dXJuIHRvSnVsaWFuKGRhdGUpIC0gSjIwMDA7IH1cblxuXG4vLyBnZW5lcmFsIGNhbGN1bGF0aW9ucyBmb3IgcG9zaXRpb25cblxudmFyIGUgPSByYWQgKiAyMy40Mzk3OyAvLyBvYmxpcXVpdHkgb2YgdGhlIEVhcnRoXG5cbmZ1bmN0aW9uIHJpZ2h0QXNjZW5zaW9uKGwsIGIpIHsgcmV0dXJuIGF0YW4oc2luKGwpICogY29zKGUpIC0gdGFuKGIpICogc2luKGUpLCBjb3MobCkpOyB9XG5mdW5jdGlvbiBkZWNsaW5hdGlvbihsLCBiKSAgICB7IHJldHVybiBhc2luKHNpbihiKSAqIGNvcyhlKSArIGNvcyhiKSAqIHNpbihlKSAqIHNpbihsKSk7IH1cblxuZnVuY3Rpb24gYXppbXV0aChILCBwaGksIGRlYykgIHsgcmV0dXJuIGF0YW4oc2luKEgpLCBjb3MoSCkgKiBzaW4ocGhpKSAtIHRhbihkZWMpICogY29zKHBoaSkpOyB9XG5mdW5jdGlvbiBhbHRpdHVkZShILCBwaGksIGRlYykgeyByZXR1cm4gYXNpbihzaW4ocGhpKSAqIHNpbihkZWMpICsgY29zKHBoaSkgKiBjb3MoZGVjKSAqIGNvcyhIKSk7IH1cblxuZnVuY3Rpb24gc2lkZXJlYWxUaW1lKGQsIGx3KSB7IHJldHVybiByYWQgKiAoMjgwLjE2ICsgMzYwLjk4NTYyMzUgKiBkKSAtIGx3OyB9XG5cbmZ1bmN0aW9uIGFzdHJvUmVmcmFjdGlvbihoKSB7XG4gICAgaWYgKGggPCAwKSAvLyB0aGUgZm9sbG93aW5nIGZvcm11bGEgd29ya3MgZm9yIHBvc2l0aXZlIGFsdGl0dWRlcyBvbmx5LlxuICAgICAgICBoID0gMDsgLy8gaWYgaCA9IC0wLjA4OTAxMTc5IGEgZGl2LzAgd291bGQgb2NjdXIuXG5cbiAgICAvLyBmb3JtdWxhIDE2LjQgb2YgXCJBc3Ryb25vbWljYWwgQWxnb3JpdGhtc1wiIDJuZCBlZGl0aW9uIGJ5IEplYW4gTWVldXMgKFdpbGxtYW5uLUJlbGwsIFJpY2htb25kKSAxOTk4LlxuICAgIC8vIDEuMDIgLyB0YW4oaCArIDEwLjI2IC8gKGggKyA1LjEwKSkgaCBpbiBkZWdyZWVzLCByZXN1bHQgaW4gYXJjIG1pbnV0ZXMgLT4gY29udmVydGVkIHRvIHJhZDpcbiAgICByZXR1cm4gMC4wMDAyOTY3IC8gTWF0aC50YW4oaCArIDAuMDAzMTI1MzYgLyAoaCArIDAuMDg5MDExNzkpKTtcbn1cblxuLy8gZ2VuZXJhbCBzdW4gY2FsY3VsYXRpb25zXG5cbmZ1bmN0aW9uIHNvbGFyTWVhbkFub21hbHkoZCkgeyByZXR1cm4gcmFkICogKDM1Ny41MjkxICsgMC45ODU2MDAyOCAqIGQpOyB9XG5cbmZ1bmN0aW9uIGVjbGlwdGljTG9uZ2l0dWRlKE0pIHtcblxuICAgIHZhciBDID0gcmFkICogKDEuOTE0OCAqIHNpbihNKSArIDAuMDIgKiBzaW4oMiAqIE0pICsgMC4wMDAzICogc2luKDMgKiBNKSksIC8vIGVxdWF0aW9uIG9mIGNlbnRlclxuICAgICAgICBQID0gcmFkICogMTAyLjkzNzI7IC8vIHBlcmloZWxpb24gb2YgdGhlIEVhcnRoXG5cbiAgICByZXR1cm4gTSArIEMgKyBQICsgUEk7XG59XG5cbmZ1bmN0aW9uIHN1bkNvb3JkcyhkKSB7XG5cbiAgICB2YXIgTSA9IHNvbGFyTWVhbkFub21hbHkoZCksXG4gICAgICAgIEwgPSBlY2xpcHRpY0xvbmdpdHVkZShNKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlYzogZGVjbGluYXRpb24oTCwgMCksXG4gICAgICAgIHJhOiByaWdodEFzY2Vuc2lvbihMLCAwKVxuICAgIH07XG59XG5cblxudmFyIFN1bkNhbGMgPSB7fTtcblxuXG4vLyBjYWxjdWxhdGVzIHN1biBwb3NpdGlvbiBmb3IgYSBnaXZlbiBkYXRlIGFuZCBsYXRpdHVkZS9sb25naXR1ZGVcblxuU3VuQ2FsYy5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChkYXRlLCBsYXQsIGxuZykge1xuXG4gICAgdmFyIGx3ICA9IHJhZCAqIC1sbmcsXG4gICAgICAgIHBoaSA9IHJhZCAqIGxhdCxcbiAgICAgICAgZCAgID0gdG9EYXlzKGRhdGUpLFxuXG4gICAgICAgIGMgID0gc3VuQ29vcmRzKGQpLFxuICAgICAgICBIICA9IHNpZGVyZWFsVGltZShkLCBsdykgLSBjLnJhO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXppbXV0aDogYXppbXV0aChILCBwaGksIGMuZGVjKSxcbiAgICAgICAgYWx0aXR1ZGU6IGFsdGl0dWRlKEgsIHBoaSwgYy5kZWMpXG4gICAgfTtcbn07XG5cblxuLy8gc3VuIHRpbWVzIGNvbmZpZ3VyYXRpb24gKGFuZ2xlLCBtb3JuaW5nIG5hbWUsIGV2ZW5pbmcgbmFtZSlcblxudmFyIHRpbWVzID0gU3VuQ2FsYy50aW1lcyA9IFtcbiAgICBbLTAuODMzLCAnc3VucmlzZScsICAgICAgICdzdW5zZXQnICAgICAgXSxcbiAgICBbICAtMC4zLCAnc3VucmlzZUVuZCcsICAgICdzdW5zZXRTdGFydCcgXSxcbiAgICBbICAgIC02LCAnZGF3bicsICAgICAgICAgICdkdXNrJyAgICAgICAgXSxcbiAgICBbICAgLTEyLCAnbmF1dGljYWxEYXduJywgICduYXV0aWNhbER1c2snXSxcbiAgICBbICAgLTE4LCAnbmlnaHRFbmQnLCAgICAgICduaWdodCcgICAgICAgXSxcbiAgICBbICAgICA2LCAnZ29sZGVuSG91ckVuZCcsICdnb2xkZW5Ib3VyJyAgXVxuXTtcblxuLy8gYWRkcyBhIGN1c3RvbSB0aW1lIHRvIHRoZSB0aW1lcyBjb25maWdcblxuU3VuQ2FsYy5hZGRUaW1lID0gZnVuY3Rpb24gKGFuZ2xlLCByaXNlTmFtZSwgc2V0TmFtZSkge1xuICAgIHRpbWVzLnB1c2goW2FuZ2xlLCByaXNlTmFtZSwgc2V0TmFtZV0pO1xufTtcblxuXG4vLyBjYWxjdWxhdGlvbnMgZm9yIHN1biB0aW1lc1xuXG52YXIgSjAgPSAwLjAwMDk7XG5cbmZ1bmN0aW9uIGp1bGlhbkN5Y2xlKGQsIGx3KSB7IHJldHVybiBNYXRoLnJvdW5kKGQgLSBKMCAtIGx3IC8gKDIgKiBQSSkpOyB9XG5cbmZ1bmN0aW9uIGFwcHJveFRyYW5zaXQoSHQsIGx3LCBuKSB7IHJldHVybiBKMCArIChIdCArIGx3KSAvICgyICogUEkpICsgbjsgfVxuZnVuY3Rpb24gc29sYXJUcmFuc2l0SihkcywgTSwgTCkgIHsgcmV0dXJuIEoyMDAwICsgZHMgKyAwLjAwNTMgKiBzaW4oTSkgLSAwLjAwNjkgKiBzaW4oMiAqIEwpOyB9XG5cbmZ1bmN0aW9uIGhvdXJBbmdsZShoLCBwaGksIGQpIHsgcmV0dXJuIGFjb3MoKHNpbihoKSAtIHNpbihwaGkpICogc2luKGQpKSAvIChjb3MocGhpKSAqIGNvcyhkKSkpOyB9XG5cbi8vIHJldHVybnMgc2V0IHRpbWUgZm9yIHRoZSBnaXZlbiBzdW4gYWx0aXR1ZGVcbmZ1bmN0aW9uIGdldFNldEooaCwgbHcsIHBoaSwgZGVjLCBuLCBNLCBMKSB7XG5cbiAgICB2YXIgdyA9IGhvdXJBbmdsZShoLCBwaGksIGRlYyksXG4gICAgICAgIGEgPSBhcHByb3hUcmFuc2l0KHcsIGx3LCBuKTtcbiAgICByZXR1cm4gc29sYXJUcmFuc2l0SihhLCBNLCBMKTtcbn1cblxuXG4vLyBjYWxjdWxhdGVzIHN1biB0aW1lcyBmb3IgYSBnaXZlbiBkYXRlIGFuZCBsYXRpdHVkZS9sb25naXR1ZGVcblxuU3VuQ2FsYy5nZXRUaW1lcyA9IGZ1bmN0aW9uIChkYXRlLCBsYXQsIGxuZykge1xuXG4gICAgdmFyIGx3ID0gcmFkICogLWxuZyxcbiAgICAgICAgcGhpID0gcmFkICogbGF0LFxuXG4gICAgICAgIGQgPSB0b0RheXMoZGF0ZSksXG4gICAgICAgIG4gPSBqdWxpYW5DeWNsZShkLCBsdyksXG4gICAgICAgIGRzID0gYXBwcm94VHJhbnNpdCgwLCBsdywgbiksXG5cbiAgICAgICAgTSA9IHNvbGFyTWVhbkFub21hbHkoZHMpLFxuICAgICAgICBMID0gZWNsaXB0aWNMb25naXR1ZGUoTSksXG4gICAgICAgIGRlYyA9IGRlY2xpbmF0aW9uKEwsIDApLFxuXG4gICAgICAgIEpub29uID0gc29sYXJUcmFuc2l0SihkcywgTSwgTCksXG5cbiAgICAgICAgaSwgbGVuLCB0aW1lLCBKc2V0LCBKcmlzZTtcblxuXG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgc29sYXJOb29uOiBmcm9tSnVsaWFuKEpub29uKSxcbiAgICAgICAgbmFkaXI6IGZyb21KdWxpYW4oSm5vb24gLSAwLjUpXG4gICAgfTtcblxuICAgIGZvciAoaSA9IDAsIGxlbiA9IHRpbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIHRpbWUgPSB0aW1lc1tpXTtcblxuICAgICAgICBKc2V0ID0gZ2V0U2V0Sih0aW1lWzBdICogcmFkLCBsdywgcGhpLCBkZWMsIG4sIE0sIEwpO1xuICAgICAgICBKcmlzZSA9IEpub29uIC0gKEpzZXQgLSBKbm9vbik7XG5cbiAgICAgICAgcmVzdWx0W3RpbWVbMV1dID0gZnJvbUp1bGlhbihKcmlzZSk7XG4gICAgICAgIHJlc3VsdFt0aW1lWzJdXSA9IGZyb21KdWxpYW4oSnNldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8gbW9vbiBjYWxjdWxhdGlvbnMsIGJhc2VkIG9uIGh0dHA6Ly9hYS5xdWFlLm5sL2VuL3Jla2VuL2hlbWVscG9zaXRpZS5odG1sIGZvcm11bGFzXG5cbmZ1bmN0aW9uIG1vb25Db29yZHMoZCkgeyAvLyBnZW9jZW50cmljIGVjbGlwdGljIGNvb3JkaW5hdGVzIG9mIHRoZSBtb29uXG5cbiAgICB2YXIgTCA9IHJhZCAqICgyMTguMzE2ICsgMTMuMTc2Mzk2ICogZCksIC8vIGVjbGlwdGljIGxvbmdpdHVkZVxuICAgICAgICBNID0gcmFkICogKDEzNC45NjMgKyAxMy4wNjQ5OTMgKiBkKSwgLy8gbWVhbiBhbm9tYWx5XG4gICAgICAgIEYgPSByYWQgKiAoOTMuMjcyICsgMTMuMjI5MzUwICogZCksICAvLyBtZWFuIGRpc3RhbmNlXG5cbiAgICAgICAgbCAgPSBMICsgcmFkICogNi4yODkgKiBzaW4oTSksIC8vIGxvbmdpdHVkZVxuICAgICAgICBiICA9IHJhZCAqIDUuMTI4ICogc2luKEYpLCAgICAgLy8gbGF0aXR1ZGVcbiAgICAgICAgZHQgPSAzODUwMDEgLSAyMDkwNSAqIGNvcyhNKTsgIC8vIGRpc3RhbmNlIHRvIHRoZSBtb29uIGluIGttXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByYTogcmlnaHRBc2NlbnNpb24obCwgYiksXG4gICAgICAgIGRlYzogZGVjbGluYXRpb24obCwgYiksXG4gICAgICAgIGRpc3Q6IGR0XG4gICAgfTtcbn1cblxuU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24gPSBmdW5jdGlvbiAoZGF0ZSwgbGF0LCBsbmcpIHtcblxuICAgIHZhciBsdyAgPSByYWQgKiAtbG5nLFxuICAgICAgICBwaGkgPSByYWQgKiBsYXQsXG4gICAgICAgIGQgICA9IHRvRGF5cyhkYXRlKSxcblxuICAgICAgICBjID0gbW9vbkNvb3JkcyhkKSxcbiAgICAgICAgSCA9IHNpZGVyZWFsVGltZShkLCBsdykgLSBjLnJhLFxuICAgICAgICBoID0gYWx0aXR1ZGUoSCwgcGhpLCBjLmRlYyksXG4gICAgICAgIC8vIGZvcm11bGEgMTQuMSBvZiBcIkFzdHJvbm9taWNhbCBBbGdvcml0aG1zXCIgMm5kIGVkaXRpb24gYnkgSmVhbiBNZWV1cyAoV2lsbG1hbm4tQmVsbCwgUmljaG1vbmQpIDE5OTguXG4gICAgICAgIHBhID0gYXRhbihzaW4oSCksIHRhbihwaGkpICogY29zKGMuZGVjKSAtIHNpbihjLmRlYykgKiBjb3MoSCkpO1xuXG4gICAgaCA9IGggKyBhc3Ryb1JlZnJhY3Rpb24oaCk7IC8vIGFsdGl0dWRlIGNvcnJlY3Rpb24gZm9yIHJlZnJhY3Rpb25cblxuICAgIHJldHVybiB7XG4gICAgICAgIGF6aW11dGg6IGF6aW11dGgoSCwgcGhpLCBjLmRlYyksXG4gICAgICAgIGFsdGl0dWRlOiBoLFxuICAgICAgICBkaXN0YW5jZTogYy5kaXN0LFxuICAgICAgICBwYXJhbGxhY3RpY0FuZ2xlOiBwYVxuICAgIH07XG59O1xuXG5cbi8vIGNhbGN1bGF0aW9ucyBmb3IgaWxsdW1pbmF0aW9uIHBhcmFtZXRlcnMgb2YgdGhlIG1vb24sXG4vLyBiYXNlZCBvbiBodHRwOi8vaWRsYXN0cm8uZ3NmYy5uYXNhLmdvdi9mdHAvcHJvL2FzdHJvL21waGFzZS5wcm8gZm9ybXVsYXMgYW5kXG4vLyBDaGFwdGVyIDQ4IG9mIFwiQXN0cm9ub21pY2FsIEFsZ29yaXRobXNcIiAybmQgZWRpdGlvbiBieSBKZWFuIE1lZXVzIChXaWxsbWFubi1CZWxsLCBSaWNobW9uZCkgMTk5OC5cblxuU3VuQ2FsYy5nZXRNb29uSWxsdW1pbmF0aW9uID0gZnVuY3Rpb24gKGRhdGUpIHtcblxuICAgIHZhciBkID0gdG9EYXlzKGRhdGUgfHwgbmV3IERhdGUoKSksXG4gICAgICAgIHMgPSBzdW5Db29yZHMoZCksXG4gICAgICAgIG0gPSBtb29uQ29vcmRzKGQpLFxuXG4gICAgICAgIHNkaXN0ID0gMTQ5NTk4MDAwLCAvLyBkaXN0YW5jZSBmcm9tIEVhcnRoIHRvIFN1biBpbiBrbVxuXG4gICAgICAgIHBoaSA9IGFjb3Moc2luKHMuZGVjKSAqIHNpbihtLmRlYykgKyBjb3Mocy5kZWMpICogY29zKG0uZGVjKSAqIGNvcyhzLnJhIC0gbS5yYSkpLFxuICAgICAgICBpbmMgPSBhdGFuKHNkaXN0ICogc2luKHBoaSksIG0uZGlzdCAtIHNkaXN0ICogY29zKHBoaSkpLFxuICAgICAgICBhbmdsZSA9IGF0YW4oY29zKHMuZGVjKSAqIHNpbihzLnJhIC0gbS5yYSksIHNpbihzLmRlYykgKiBjb3MobS5kZWMpIC1cbiAgICAgICAgICAgICAgICBjb3Mocy5kZWMpICogc2luKG0uZGVjKSAqIGNvcyhzLnJhIC0gbS5yYSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnJhY3Rpb246ICgxICsgY29zKGluYykpIC8gMixcbiAgICAgICAgcGhhc2U6IDAuNSArIDAuNSAqIGluYyAqIChhbmdsZSA8IDAgPyAtMSA6IDEpIC8gTWF0aC5QSSxcbiAgICAgICAgYW5nbGU6IGFuZ2xlXG4gICAgfTtcbn07XG5cblxuZnVuY3Rpb24gaG91cnNMYXRlcihkYXRlLCBoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUudmFsdWVPZigpICsgaCAqIGRheU1zIC8gMjQpO1xufVxuXG4vLyBjYWxjdWxhdGlvbnMgZm9yIG1vb24gcmlzZS9zZXQgdGltZXMgYXJlIGJhc2VkIG9uIGh0dHA6Ly93d3cuc3RhcmdhemluZy5uZXQva2VwbGVyL21vb25yaXNlLmh0bWwgYXJ0aWNsZVxuXG5TdW5DYWxjLmdldE1vb25UaW1lcyA9IGZ1bmN0aW9uIChkYXRlLCBsYXQsIGxuZywgaW5VVEMpIHtcbiAgICB2YXIgdCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGlmIChpblVUQykgdC5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBlbHNlIHQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICB2YXIgaGMgPSAwLjEzMyAqIHJhZCxcbiAgICAgICAgaDAgPSBTdW5DYWxjLmdldE1vb25Qb3NpdGlvbih0LCBsYXQsIGxuZykuYWx0aXR1ZGUgLSBoYyxcbiAgICAgICAgaDEsIGgyLCByaXNlLCBzZXQsIGEsIGIsIHhlLCB5ZSwgZCwgcm9vdHMsIHgxLCB4MiwgZHg7XG5cbiAgICAvLyBnbyBpbiAyLWhvdXIgY2h1bmtzLCBlYWNoIHRpbWUgc2VlaW5nIGlmIGEgMy1wb2ludCBxdWFkcmF0aWMgY3VydmUgY3Jvc3NlcyB6ZXJvICh3aGljaCBtZWFucyByaXNlIG9yIHNldClcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSAyNDsgaSArPSAyKSB7XG4gICAgICAgIGgxID0gU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24oaG91cnNMYXRlcih0LCBpKSwgbGF0LCBsbmcpLmFsdGl0dWRlIC0gaGM7XG4gICAgICAgIGgyID0gU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24oaG91cnNMYXRlcih0LCBpICsgMSksIGxhdCwgbG5nKS5hbHRpdHVkZSAtIGhjO1xuXG4gICAgICAgIGEgPSAoaDAgKyBoMikgLyAyIC0gaDE7XG4gICAgICAgIGIgPSAoaDIgLSBoMCkgLyAyO1xuICAgICAgICB4ZSA9IC1iIC8gKDIgKiBhKTtcbiAgICAgICAgeWUgPSAoYSAqIHhlICsgYikgKiB4ZSArIGgxO1xuICAgICAgICBkID0gYiAqIGIgLSA0ICogYSAqIGgxO1xuICAgICAgICByb290cyA9IDA7XG5cbiAgICAgICAgaWYgKGQgPj0gMCkge1xuICAgICAgICAgICAgZHggPSBNYXRoLnNxcnQoZCkgLyAoTWF0aC5hYnMoYSkgKiAyKTtcbiAgICAgICAgICAgIHgxID0geGUgLSBkeDtcbiAgICAgICAgICAgIHgyID0geGUgKyBkeDtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh4MSkgPD0gMSkgcm9vdHMrKztcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh4MikgPD0gMSkgcm9vdHMrKztcbiAgICAgICAgICAgIGlmICh4MSA8IC0xKSB4MSA9IHgyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvb3RzID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoaDAgPCAwKSByaXNlID0gaSArIHgxO1xuICAgICAgICAgICAgZWxzZSBzZXQgPSBpICsgeDE7XG5cbiAgICAgICAgfSBlbHNlIGlmIChyb290cyA9PT0gMikge1xuICAgICAgICAgICAgcmlzZSA9IGkgKyAoeWUgPCAwID8geDIgOiB4MSk7XG4gICAgICAgICAgICBzZXQgPSBpICsgKHllIDwgMCA/IHgxIDogeDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJpc2UgJiYgc2V0KSBicmVhaztcblxuICAgICAgICBoMCA9IGgyO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSB7fTtcblxuICAgIGlmIChyaXNlKSByZXN1bHQucmlzZSA9IGhvdXJzTGF0ZXIodCwgcmlzZSk7XG4gICAgaWYgKHNldCkgcmVzdWx0LnNldCA9IGhvdXJzTGF0ZXIodCwgc2V0KTtcblxuICAgIGlmICghcmlzZSAmJiAhc2V0KSByZXN1bHRbeWUgPiAwID8gJ2Fsd2F5c1VwJyA6ICdhbHdheXNEb3duJ10gPSB0cnVlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8gZXhwb3J0IGFzIE5vZGUgbW9kdWxlIC8gQU1EIG1vZHVsZSAvIGJyb3dzZXIgdmFyaWFibGVcbmlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gU3VuQ2FsYztcbmVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKFN1bkNhbGMpO1xuZWxzZSB3aW5kb3cuU3VuQ2FsYyA9IFN1bkNhbGM7XG5cbn0oKSk7XG4iLCJpbXBvcnQgTmlnaHQyLCB7IElTX0JST1dTRVIgfSBmcm9tICcuL25pZ2h0Mic7XG5leHBvcnQgZGVmYXVsdCBOaWdodDI7XG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5pZiAoSVNfQlJPV1NFUikge1xuICAoZnVuY3Rpb24gKHdpbmRvdykge1xuICAgIHdpbmRvdy5OaWdodDIgPSBOaWdodDI7XG4gIH0pKHdpbmRvdyk7XG59XG4vKiBlc2xpbnQtZW5hYmxlICovXG4iLCJleHBvcnQgY29uc3QgSVNfQlJPV1NFUiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuXG5pbXBvcnQgU3VuQ2FsYyBmcm9tICdzdW5jYWxjJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmlnaHQyIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MgPSB7fSkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmV4dGVuZFNldHRpbmdzKHNldHRpbmdzKTtcbiAgICAvLyBjb25zb2xlLmxvZygnY29uc3RydWN0b3IgYXV0byA9ICcsIGxvY2FsU3RvcmFnZS5hdXRvKTtcbiAgICAvLyBjb25zb2xlLmxvZygnY29uc3RydWN0b3IgZGFyayA9ICcsIGxvY2FsU3RvcmFnZS5kYXJrKTtcbiAgICAvLyBjb25zb2xlLmxvZygnY29uc3RydWN0b3IgbGlnaHQgPSAnLCBsb2NhbFN0b3JhZ2UubGlnaHQpO1xuXG4gICAgdGhpcy50b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICB0aGlzLnRpbWUodGhpcy50b2RheSk7IC8vIOuwlOuhnCDsi5zsnpHtlZjqs6AsICDsnbjthLDrsozroZwgNjDrtoTrp4jri6QuXG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnRpbWUobmV3IERhdGUoKSksIHRoaXMuc2V0dGluZ3MuaW50ZXJ2YWxGb3JUaW1lICogMTAwMCAqIDYwKTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG8pIHRoaXMuYXV0byh0cnVlKTsgLy8g7Iuc7J6R7IucIGF1dG/rpbwg67aA66aELi4g7Jes6riw7IScXG4gICAgdGhpcy50aGVtZSgpO1xuICB9XG5cbiAgdGltZShub3cpIHtcbiAgICAvLyBjb25zb2xlLmxvZygndGltZSBub3cgPSAnLCBub3cpO1xuICAgIGNvbnN0IG1pZG5pZ2h0ID0gbmV3IERhdGUoKS5zZXRIb3VycygyNCwgMCwgMCwgMCk7XG5cbiAgICBpZiAoIWxvY2FsU3RvcmFnZS50aW1lKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGltZScsIEpTT04uc3RyaW5naWZ5KG1pZG5pZ2h0KSk7XG4gICAgICBpZiAoIWxvY2FsU3RvcmFnZS5sb2NhdGlvbikge1xuICAgICAgICAvLyDroZzsvIDsnbTshZjsnbRcbiAgICAgICAgaWYgKCdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yKSB0aGlzLm15TG9jYXRpb24oKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5sb2NhdGlvbiAmJiBub3cuZ2V0VGltZSgpID4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UudGltZSkpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0aW1lJyk7XG5cbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNhY2hlQ2xlYXIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2xvY2F0aW9uJyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uQ2FjaGVDbGVhciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub25DYWNoZUNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGVtZSgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygndGhlbWUgZGFyaz8nLCBsb2NhbFN0b3JhZ2UuZGFyayk7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5kYXJrID09PSAndHJ1ZScgPyB0aGlzLmRhcmsoKSA6IHRoaXMubGlnaHQoKTtcbiAgfVxuXG4gIGF1dG8oaW5pdCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdhdXRvKGluaXQpJywgaW5pdCk7XG4gICAgLy8gaWYgKHRoaXMuc2V0dGluZ3MuYXV0bykgcmV0dXJuOyAvLyDsnbTrr7ggYXV0b+qwgCB0cnVl7J2066m0IDLqsJzsnZggaW50ZXJ2YWzsnbQg64+M6rOgIOyeiOydjFxuICAgIGlmICgoaW5pdCAmJiAhbG9jYWxTdG9yYWdlLmF1dG8pIHx8ICFpbml0KSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc2V0IGF1dG8gdHJ1ZScsIGluaXQpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dG8nLCAndHJ1ZScpO1xuXG4gICAgICAvLyBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnRpbWUobmV3IERhdGUoKSksIHRoaXMuc2V0dGluZ3MuaW50ZXJ2YWxGb3JUaW1lKTsgLy8g66ek64m07Ja8IOyYpO2GoOyLnCDtlYTsmpQ/XG4gICAgICAvLyB0aGlzLnNldEludGVydmFsQ2hlY2tNaWRuaWdodCgpO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25BdXRvID09PSAnZnVuY3Rpb24nKSB0aGlzLnNldHRpbmdzLm9uQXV0bygpO1xuICAgIH1cblxuICAgIGlmICgnZ2VvbG9jYXRpb24nIGluIG5hdmlnYXRvcikgdGhpcy5teUxvY2F0aW9uKCk7XG4gIH1cblxuICBteUxvY2F0aW9uKCkge1xuICAgIGlmICghbG9jYWxTdG9yYWdlLmxvY2F0aW9uKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnbXlMb2NhdGlvbiBsb2NhbFN0b3JhZ2UubG9jYXRpb24nLCBsb2NhbFN0b3JhZ2UubG9jYXRpb24pO1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLnN1Y2Nlc3MuYmluZCh0aGlzKSwgdGhpcy5lcnJvci5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5sb2NhdGlvbik7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdteUxvY2F0aW9uIGxvY2F0aW9uJywgbG9jYXRpb24pO1xuXG4gICAgICB0aGlzLmNoZWNrU3VuUG9zaXRpb24obG9jYXRpb24ubGF0aXR1ZGUsIGxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgfVxuICB9XG5cbiAgc3VjY2Vzcyhwb3MpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcycpO1xuICAgIGNvbnN0IGxvY2F0aW9uID0ge1xuICAgICAgbGF0aXR1ZGU6IHBvcy5jb29yZHMubGF0aXR1ZGUsXG4gICAgICBsb25naXR1ZGU6IHBvcy5jb29yZHMubG9uZ2l0dWRlXG4gICAgfTtcblxuICAgIC8vIGNvbnNvbGUubG9nKCdsb2NhdGlvbicsIGxvY2F0aW9uKTtcblxuICAgIHRoaXMuY2hlY2tTdW5Qb3NpdGlvbihsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlKTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmNhY2hlKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9jYXRpb24nLCBKU09OLnN0cmluZ2lmeShsb2NhdGlvbikpO1xuICAgIH1cbiAgfVxuXG4gIGVycm9yKGVycikge1xuICAgIC8vIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vbkRlbmllZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5zZXR0aW5ncy5vbkRlbmllZCgpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NtYXJ0RGFya0Vycm9yJywge1xuICAgICAgICBkZXRhaWw6IGVyclxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgY2hlY2tTdW5Qb3NpdGlvbihsYXRpdHVkZSwgbG9uZ2l0dWRlKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICBjb25zdCB0aW1lcyA9IG5ldyBTdW5DYWxjLmdldFRpbWVzKHRoaXMudG9kYXksIGxhdGl0dWRlLCBsb25naXR1ZGUpO1xuICAgIC8qIGVzbGludC1lbmFibGUgKi9cblxuICAgIGNvbnN0IHN1bnJpc2UgPVxuICAgICAgdGltZXMuc3VucmlzZUVuZCAtICh0aW1lcy5zdW5yaXNlRW5kIC0gdGltZXMuc3VucmlzZSkgLyAyICsgdGhpcy5zZXR0aW5ncy5vZmZzZXQgKiA2MCAqIDEwMDA7XG4gICAgY29uc3Qgc3Vuc2V0ID0gdGltZXMuc3Vuc2V0IC0gKHRpbWVzLnN1bnNldCAtIHRpbWVzLnN1bnNldFN0YXJ0KSAvIDIgLSB0aGlzLnNldHRpbmdzLm9mZnNldCAqIDYwICogMTAwMDtcblxuICAgIGNvbnN0IHZhbHVlcyA9IHtcbiAgICAgIHN1bnJpc2U6IG5ldyBEYXRlKHN1bnJpc2UpLFxuICAgICAgc3Vuc2V0OiBuZXcgRGF0ZShzdW5zZXQpLFxuICAgICAgbGF0aXR1ZGUsXG4gICAgICBsb25naXR1ZGVcbiAgICB9O1xuXG4gICAgLy8gY29uc29sZS5sb2coJ2NoZWNrU3VuUG9zaXRpb24gdmFsdWVzJywgdmFsdWVzKTtcblxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NtYXJ0RGFyaycsIHtcbiAgICAgICAgZGV0YWlsOiB2YWx1ZXNcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIOyLnOyekeyLnCDtlZzrsogg7Iuk7ZaJ7ZWY6rOgLCAg64uk7J2M7JeQIOyduO2EsOuyjFxuICAgIGlmIChsb2NhbFN0b3JhZ2UuYXV0byAmJiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5hdXRvKSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ+yLnOyekeyLnCDtlZzrsogg7Iuk7ZaJ7ZWY6rOgLCAg64uk7J2M7JeQIOyduO2EsOuyjCcpO1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmlzRGFyaztcblxuICAgICAgbm93LmdldFRpbWUoKSA+IHN1bnJpc2UgJiYgbm93LmdldFRpbWUoKSA8IHN1bnNldCA/IHRoaXMubGlnaHQoKSA6IHRoaXMuZGFyaygpO1xuXG4gICAgICBpZiAoc3RhdGUgIT09IHRoaXMuaXNEYXJrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub25DaGFuZ2UodGhpcy5pc0RhcmspO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcnZhbEZvckNoZWNrU3VuUG9zaXRpb24gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnaW50ZXJ2YWwgbG9jYWxTdG9yYWdlLmF1dG8nLCBsb2NhbFN0b3JhZ2UuYXV0byk7XG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmF1dG8gJiYgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuYXV0bykpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+yEoCDtj6zsp4DshZgg7LK07YGs7ZWoJyk7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmlzRGFyaztcblxuICAgICAgICBub3cuZ2V0VGltZSgpID4gc3VucmlzZSAmJiBub3cuZ2V0VGltZSgpIDwgc3Vuc2V0ID8gdGhpcy5saWdodCgpIDogdGhpcy5kYXJrKCk7XG5cbiAgICAgICAgaWYgKHN0YXRlICE9PSB0aGlzLmlzRGFyaykge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5vbkNoYW5nZSh0aGlzLmlzRGFyayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgdGhpcy5zZXR0aW5ncy5pbnRlcnZhbEZvckNoZWNrU3VuICogMTAwMCAqIDYwKTsgLy8g7JuQ656YIOqwkuydtCAxMDAg64SI66y0IOyekOyjvCDssrTtgaw/P1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3Jlc2V0Jyk7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsRm9yQ2hlY2tTdW5Qb3NpdGlvbik7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25SZXNldCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zZXR0aW5ncy5vblJlc2V0KCk7XG4gIH1cblxuICBsaWdodCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnbGlnaHQgbW9kZScpO1xuICAgIC8vIGNvbnNvbGUubG9nKCcgICAgbG9jYWxTdG9yYWdlLmF1dG8nLCBsb2NhbFN0b3JhZ2UuYXV0byk7XG4gICAgLy8gY29uc29sZS5sb2coJyAgICBsb2NhbFN0b3JhZ2UuZGFyaycsIGxvY2FsU3RvcmFnZS5kYXJrKTtcbiAgICAvLyBjb25zb2xlLmxvZygnICAgIGxvY2FsU3RvcmFnZS50aW1lJywgbG9jYWxTdG9yYWdlLnRpbWUpO1xuICAgIC8vIGNvbnNvbGUubG9nKCcgICAgbG9jYWxTdG9yYWdlLmxvY2F0aW9uJywgbG9jYWxTdG9yYWdlLmxvY2F0aW9uKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25MaWdodCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zZXR0aW5ncy5vbkxpZ2h0KCk7XG5cbiAgICB0aGlzLmlzRGFyayA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MubGlnaHRDbGFzcykge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MubGlnaHRDbGFzcyk7XG4gICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpdklkKS5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MubGlnaHRDbGFzcyk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuZGFya0NsYXNzKTtcbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpdklkKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuZGFya0NsYXNzKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrJywgJ2ZhbHNlJyk7XG4gICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dG8nLCAnZmFsc2UnKTsgLy8gQXV0byDrqqjrk5wgT2ZmXG4gIH1cblxuICBkYXJrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdkYXJrIG1vZGUnKTtcbiAgICAvLyBjb25zb2xlLmxvZygnICAgIGxvY2FsU3RvcmFnZS5hdXRvJywgbG9jYWxTdG9yYWdlLmF1dG8pO1xuICAgIC8vIGNvbnNvbGUubG9nKCcgICAgbG9jYWxTdG9yYWdlLmRhcmsnLCBsb2NhbFN0b3JhZ2UuZGFyayk7XG4gICAgLy8gY29uc29sZS5sb2coJyAgICBsb2NhbFN0b3JhZ2UudGltZScsIGxvY2FsU3RvcmFnZS50aW1lKTtcbiAgICAvLyBjb25zb2xlLmxvZygnICAgIGxvY2FsU3RvcmFnZS5sb2NhdGlvbicsIGxvY2FsU3RvcmFnZS5sb2NhdGlvbik7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uRGFyayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zZXR0aW5ncy5vbkRhcmsoKTtcblxuICAgIHRoaXMuaXNEYXJrID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmxpZ2h0Q2xhc3MpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmxpZ2h0Q2xhc3MpO1xuICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXZJZCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmxpZ2h0Q2xhc3MpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmRhcmtDbGFzcyk7XG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXZJZCkuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmRhcmtDbGFzcyk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFyaycsICd0cnVlJyk7XG4gICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dG8nLCAnZmFsc2UnKTsgLy8gQXV0byDrqqjrk5wgT2ZmXG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3RvZ2dsZScpO1xuICAgIHRoaXMuaXNEYXJrID8gdGhpcy5saWdodCgpIDogdGhpcy5kYXJrKCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25Ub2dnbGUgPT09ICdmdW5jdGlvbicpIHRoaXMuc2V0dGluZ3Mub25Ub2dnbGUodGhpcy5pc0RhcmspO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dG8nLCAnZmFsc2UnKTsgLy8gQXV0byDrqqjrk5wgT2ZmXG4gIH1cblxuICBleHRlbmRTZXR0aW5ncyhzZXR0aW5ncykge1xuICAgIGNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHtcbiAgICAgIGRpdklkOiAnZGVmYXVsdCcsXG4gICAgICBsaWdodENsYXNzOiAnJywgLy8gY2xhc3MgYWRkZWQgdG8gYm9keSB3aGVuIGRhcmsgbW9kZSBpcyBkaXNhYmxlZFxuICAgICAgZGFya0NsYXNzOiAnZGFyaycsIC8vIGNsYXNzIGFkZGVkIHRvIGJvZHkgd2hlbiBkYXJrIG1vZGUgaXMgZW5hYmxlZFxuICAgICAgY2FjaGU6IHRydWUsIC8vIGNhY2hlIGxvY2F0aW9uIGNvb3JkaW5hdGVzIGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgIGNhY2hlQ2xlYXI6IHRydWUsIC8vIGNsZWFyIGxvY2F0aW9uIGNvb3JkaW5hdGVzIGluIGxvY2FsIHN0b3JhZ2UgZXZlcnlkYXkgYXQgbWlkbmlnaHRcbiAgICAgIGF1dG86IHRydWUsIC8vIGVuYWJsZSBzbWFydCBzd2l0Y2ggb24gc2NyaXB0IGluaXRcbiAgICAgIGludGVydmFsRm9yQ2hlY2tTdW46IDEwLCAvLyAxMOu2hCDrp4jri6Qg7LK07YGsXG4gICAgICBpbnRlcnZhbEZvclRpbWU6IDYwLCAvLyA2MOu2hOuniOuLpCDssrTtgaxcbiAgICAgIG9mZnNldDogMzAsIC8vIOyEoOudvOydtOymiCszMOu2hCwg7ISg7IWLLTMw67aEXG5cbiAgICAgIG9uQXV0bzogbnVsbCwgLy8gY2FsbGJhY2sgb24gc21hcnQgc3dpdGNoXG4gICAgICBvbkxpZ2h0OiBudWxsLCAvLyBjYWxsYmFjayB3aGVuIGRhcmsgbW9kZSBpcyBkaXNhYmxlZFxuICAgICAgb25EYXJrOiBudWxsLCAvLyBjYWxsYmFjayB3aGVuIGRhcmsgbW9kZSBpcyBlbmFibGVkXG4gICAgICBvblRvZ2dsZTogbnVsbCwgLy8gY2FsbGJhY2sgb24gZGFyay9saWdodCBtb2RlIHRvZ2dsZVxuICAgICAgb25DaGFuZ2U6IG51bGwsIC8vIGNhbGxiYWNrIG9uIOyduO2EsOuwnOyXkOyEnCDrtojrn6zso7zripQg7Y6R7IWYXG4gICAgICBvbkRlbmllZDogbnVsbCwgLy8gY2FsbGJhY2sgb24gZ2VvbG9jYXRpb24gcGVybWlzc2lvbiBkZWluZWRcbiAgICAgIG9uQ2FjaGVDbGVhcjogbnVsbCwgLy8gY2FsbGJhY2sgd2hlbiBsb2NhdGlvbiBjb29yZGluYXRlcyBhbmQgbWlkbmlnaHQgdGltZSBpbiBsb2NhbCBzdG9yYWdlIGNsZWFyZWRcbiAgICAgIG9uUmVzZXQ6IG51bGwgLy8gY2FsbGJhY2sgb24gbG9jYWxTdG9yYWdlIHJlc2V0XG4gICAgfTtcblxuICAgIGNvbnN0IG5ld1NldHRpbmdzID0ge307XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGVmYXVsdFNldHRpbmdzKSB7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgICBpZiAocHJvcGVydHkgaW4gc2V0dGluZ3MpIG5ld1NldHRpbmdzW3Byb3BlcnR5XSA9IHNldHRpbmdzW3Byb3BlcnR5XTtcbiAgICAgIGVsc2UgbmV3U2V0dGluZ3NbcHJvcGVydHldID0gZGVmYXVsdFNldHRpbmdzW3Byb3BlcnR5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3U2V0dGluZ3M7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
