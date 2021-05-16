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
                    document.getElementById(this.settings.divId).classList.add(this.settings.lightClass);
                  }

                  document.getElementById(this.settings.divId).classList.remove(this.settings.darkClass);
                  localStorage.setItem('dark', 'false');
                }
              },
              {
                key: 'dark',
                value: function dark() {
                  if (typeof this.settings.onDark === 'function') this.settings.onDark();
                  this.isDark = true;

                  if (this.settings.lightClass) {
                    document.getElementById(this.settings.divId).classList.remove(this.settings.lightClass);
                  }

                  document.getElementById(this.settings.divId).classList.add(this.settings.darkClass);
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
                    divId: 'darkmode',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uaWdodDIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25pZ2h0Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uaWdodDIvLi9ub2RlX21vZHVsZXMvc3VuY2FsYy9zdW5jYWxjLmpzIiwid2VicGFjazovL25pZ2h0Mi8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9uaWdodDIvLi9zcmMvbmlnaHQyLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIk5pZ2h0MiIsIklTX0JST1dTRVIiLCJzZXR0aW5ncyIsImV4dGVuZFNldHRpbmdzIiwidG9kYXkiLCJEYXRlIiwic2V0SW50ZXJ2YWwiLCJ0aW1lIiwiYXV0byIsInRoZW1lIiwibm93IiwibWlkbmlnaHQiLCJzZXRIb3VycyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwibG9jYXRpb24iLCJnZXRUaW1lIiwicGFyc2UiLCJyZW1vdmVJdGVtIiwiY2FjaGVDbGVhciIsIm9uQ2FjaGVDbGVhciIsImRhcmsiLCJsaWdodCIsImluaXQiLCJvbkF1dG8iLCJuYXZpZ2F0b3IiLCJteUxvY2F0aW9uIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJzdWNjZXNzIiwiYmluZCIsImVycm9yIiwiY2hlY2tTdW5Qb3NpdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwicG9zIiwiY29vcmRzIiwiY2FjaGUiLCJlcnIiLCJvbkRlbmllZCIsImRvY3VtZW50IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwidGltZXMiLCJnZXRUaW1lcyIsInN1bnJpc2UiLCJzdW5yaXNlRW5kIiwic3Vuc2V0Iiwic3Vuc2V0U3RhcnQiLCJ2YWx1ZXMiLCJjbGVhciIsIm9uUmVzZXQiLCJvbkxpZ2h0IiwiaXNEYXJrIiwibGlnaHRDbGFzcyIsImdldEVsZW1lbnRCeUlkIiwiZGl2SWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkYXJrQ2xhc3MiLCJvbkRhcmsiLCJvblRvZ2dsZSIsImRlZmF1bHRTZXR0aW5ncyIsIm5ld1NldHRpbmdzIiwicHJvcGVydHkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjOztBQUVkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsNkNBQTZDO0FBQ3RFLHlCQUF5Qiw0Q0FBNEM7QUFDckUseUJBQXlCLCtCQUErQjs7O0FBR3hEOztBQUVBLHNCQUFzQjs7QUFFdEIsK0JBQStCLHdEQUF3RDtBQUN2RiwrQkFBK0IseURBQXlEOztBQUV4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QXdCRixlQUFlLENBQUNFLFFBQUQsQ0FBdkM7QUFDTjs7QUFFRCxhQUFPRCxXQUFQO0FBQ0QiLCJmaWxlIjoibmlnaHQyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJuaWdodDJcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibmlnaHQyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5pZ2h0MlwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8qXG4gKGMpIDIwMTEtMjAxNSwgVmxhZGltaXIgQWdhZm9ua2luXG4gU3VuQ2FsYyBpcyBhIEphdmFTY3JpcHQgbGlicmFyeSBmb3IgY2FsY3VsYXRpbmcgc3VuL21vb24gcG9zaXRpb24gYW5kIGxpZ2h0IHBoYXNlcy5cbiBodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9zdW5jYWxjXG4qL1xuXG4oZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbi8vIHNob3J0Y3V0cyBmb3IgZWFzaWVyIHRvIHJlYWQgZm9ybXVsYXNcblxudmFyIFBJICAgPSBNYXRoLlBJLFxuICAgIHNpbiAgPSBNYXRoLnNpbixcbiAgICBjb3MgID0gTWF0aC5jb3MsXG4gICAgdGFuICA9IE1hdGgudGFuLFxuICAgIGFzaW4gPSBNYXRoLmFzaW4sXG4gICAgYXRhbiA9IE1hdGguYXRhbjIsXG4gICAgYWNvcyA9IE1hdGguYWNvcyxcbiAgICByYWQgID0gUEkgLyAxODA7XG5cbi8vIHN1biBjYWxjdWxhdGlvbnMgYXJlIGJhc2VkIG9uIGh0dHA6Ly9hYS5xdWFlLm5sL2VuL3Jla2VuL3pvbnBvc2l0aWUuaHRtbCBmb3JtdWxhc1xuXG5cbi8vIGRhdGUvdGltZSBjb25zdGFudHMgYW5kIGNvbnZlcnNpb25zXG5cbnZhciBkYXlNcyA9IDEwMDAgKiA2MCAqIDYwICogMjQsXG4gICAgSjE5NzAgPSAyNDQwNTg4LFxuICAgIEoyMDAwID0gMjQ1MTU0NTtcblxuZnVuY3Rpb24gdG9KdWxpYW4oZGF0ZSkgeyByZXR1cm4gZGF0ZS52YWx1ZU9mKCkgLyBkYXlNcyAtIDAuNSArIEoxOTcwOyB9XG5mdW5jdGlvbiBmcm9tSnVsaWFuKGopICB7IHJldHVybiBuZXcgRGF0ZSgoaiArIDAuNSAtIEoxOTcwKSAqIGRheU1zKTsgfVxuZnVuY3Rpb24gdG9EYXlzKGRhdGUpICAgeyByZXR1cm4gdG9KdWxpYW4oZGF0ZSkgLSBKMjAwMDsgfVxuXG5cbi8vIGdlbmVyYWwgY2FsY3VsYXRpb25zIGZvciBwb3NpdGlvblxuXG52YXIgZSA9IHJhZCAqIDIzLjQzOTc7IC8vIG9ibGlxdWl0eSBvZiB0aGUgRWFydGhcblxuZnVuY3Rpb24gcmlnaHRBc2NlbnNpb24obCwgYikgeyByZXR1cm4gYXRhbihzaW4obCkgKiBjb3MoZSkgLSB0YW4oYikgKiBzaW4oZSksIGNvcyhsKSk7IH1cbmZ1bmN0aW9uIGRlY2xpbmF0aW9uKGwsIGIpICAgIHsgcmV0dXJuIGFzaW4oc2luKGIpICogY29zKGUpICsgY29zKGIpICogc2luKGUpICogc2luKGwpKTsgfVxuXG5mdW5jdGlvbiBhemltdXRoKEgsIHBoaSwgZGVjKSAgeyByZXR1cm4gYXRhbihzaW4oSCksIGNvcyhIKSAqIHNpbihwaGkpIC0gdGFuKGRlYykgKiBjb3MocGhpKSk7IH1cbmZ1bmN0aW9uIGFsdGl0dWRlKEgsIHBoaSwgZGVjKSB7IHJldHVybiBhc2luKHNpbihwaGkpICogc2luKGRlYykgKyBjb3MocGhpKSAqIGNvcyhkZWMpICogY29zKEgpKTsgfVxuXG5mdW5jdGlvbiBzaWRlcmVhbFRpbWUoZCwgbHcpIHsgcmV0dXJuIHJhZCAqICgyODAuMTYgKyAzNjAuOTg1NjIzNSAqIGQpIC0gbHc7IH1cblxuZnVuY3Rpb24gYXN0cm9SZWZyYWN0aW9uKGgpIHtcbiAgICBpZiAoaCA8IDApIC8vIHRoZSBmb2xsb3dpbmcgZm9ybXVsYSB3b3JrcyBmb3IgcG9zaXRpdmUgYWx0aXR1ZGVzIG9ubHkuXG4gICAgICAgIGggPSAwOyAvLyBpZiBoID0gLTAuMDg5MDExNzkgYSBkaXYvMCB3b3VsZCBvY2N1ci5cblxuICAgIC8vIGZvcm11bGEgMTYuNCBvZiBcIkFzdHJvbm9taWNhbCBBbGdvcml0aG1zXCIgMm5kIGVkaXRpb24gYnkgSmVhbiBNZWV1cyAoV2lsbG1hbm4tQmVsbCwgUmljaG1vbmQpIDE5OTguXG4gICAgLy8gMS4wMiAvIHRhbihoICsgMTAuMjYgLyAoaCArIDUuMTApKSBoIGluIGRlZ3JlZXMsIHJlc3VsdCBpbiBhcmMgbWludXRlcyAtPiBjb252ZXJ0ZWQgdG8gcmFkOlxuICAgIHJldHVybiAwLjAwMDI5NjcgLyBNYXRoLnRhbihoICsgMC4wMDMxMjUzNiAvIChoICsgMC4wODkwMTE3OSkpO1xufVxuXG4vLyBnZW5lcmFsIHN1biBjYWxjdWxhdGlvbnNcblxuZnVuY3Rpb24gc29sYXJNZWFuQW5vbWFseShkKSB7IHJldHVybiByYWQgKiAoMzU3LjUyOTEgKyAwLjk4NTYwMDI4ICogZCk7IH1cblxuZnVuY3Rpb24gZWNsaXB0aWNMb25naXR1ZGUoTSkge1xuXG4gICAgdmFyIEMgPSByYWQgKiAoMS45MTQ4ICogc2luKE0pICsgMC4wMiAqIHNpbigyICogTSkgKyAwLjAwMDMgKiBzaW4oMyAqIE0pKSwgLy8gZXF1YXRpb24gb2YgY2VudGVyXG4gICAgICAgIFAgPSByYWQgKiAxMDIuOTM3MjsgLy8gcGVyaWhlbGlvbiBvZiB0aGUgRWFydGhcblxuICAgIHJldHVybiBNICsgQyArIFAgKyBQSTtcbn1cblxuZnVuY3Rpb24gc3VuQ29vcmRzKGQpIHtcblxuICAgIHZhciBNID0gc29sYXJNZWFuQW5vbWFseShkKSxcbiAgICAgICAgTCA9IGVjbGlwdGljTG9uZ2l0dWRlKE0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVjOiBkZWNsaW5hdGlvbihMLCAwKSxcbiAgICAgICAgcmE6IHJpZ2h0QXNjZW5zaW9uKEwsIDApXG4gICAgfTtcbn1cblxuXG52YXIgU3VuQ2FsYyA9IHt9O1xuXG5cbi8vIGNhbGN1bGF0ZXMgc3VuIHBvc2l0aW9uIGZvciBhIGdpdmVuIGRhdGUgYW5kIGxhdGl0dWRlL2xvbmdpdHVkZVxuXG5TdW5DYWxjLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gKGRhdGUsIGxhdCwgbG5nKSB7XG5cbiAgICB2YXIgbHcgID0gcmFkICogLWxuZyxcbiAgICAgICAgcGhpID0gcmFkICogbGF0LFxuICAgICAgICBkICAgPSB0b0RheXMoZGF0ZSksXG5cbiAgICAgICAgYyAgPSBzdW5Db29yZHMoZCksXG4gICAgICAgIEggID0gc2lkZXJlYWxUaW1lKGQsIGx3KSAtIGMucmE7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhemltdXRoOiBhemltdXRoKEgsIHBoaSwgYy5kZWMpLFxuICAgICAgICBhbHRpdHVkZTogYWx0aXR1ZGUoSCwgcGhpLCBjLmRlYylcbiAgICB9O1xufTtcblxuXG4vLyBzdW4gdGltZXMgY29uZmlndXJhdGlvbiAoYW5nbGUsIG1vcm5pbmcgbmFtZSwgZXZlbmluZyBuYW1lKVxuXG52YXIgdGltZXMgPSBTdW5DYWxjLnRpbWVzID0gW1xuICAgIFstMC44MzMsICdzdW5yaXNlJywgICAgICAgJ3N1bnNldCcgICAgICBdLFxuICAgIFsgIC0wLjMsICdzdW5yaXNlRW5kJywgICAgJ3N1bnNldFN0YXJ0JyBdLFxuICAgIFsgICAgLTYsICdkYXduJywgICAgICAgICAgJ2R1c2snICAgICAgICBdLFxuICAgIFsgICAtMTIsICduYXV0aWNhbERhd24nLCAgJ25hdXRpY2FsRHVzayddLFxuICAgIFsgICAtMTgsICduaWdodEVuZCcsICAgICAgJ25pZ2h0JyAgICAgICBdLFxuICAgIFsgICAgIDYsICdnb2xkZW5Ib3VyRW5kJywgJ2dvbGRlbkhvdXInICBdXG5dO1xuXG4vLyBhZGRzIGEgY3VzdG9tIHRpbWUgdG8gdGhlIHRpbWVzIGNvbmZpZ1xuXG5TdW5DYWxjLmFkZFRpbWUgPSBmdW5jdGlvbiAoYW5nbGUsIHJpc2VOYW1lLCBzZXROYW1lKSB7XG4gICAgdGltZXMucHVzaChbYW5nbGUsIHJpc2VOYW1lLCBzZXROYW1lXSk7XG59O1xuXG5cbi8vIGNhbGN1bGF0aW9ucyBmb3Igc3VuIHRpbWVzXG5cbnZhciBKMCA9IDAuMDAwOTtcblxuZnVuY3Rpb24ganVsaWFuQ3ljbGUoZCwgbHcpIHsgcmV0dXJuIE1hdGgucm91bmQoZCAtIEowIC0gbHcgLyAoMiAqIFBJKSk7IH1cblxuZnVuY3Rpb24gYXBwcm94VHJhbnNpdChIdCwgbHcsIG4pIHsgcmV0dXJuIEowICsgKEh0ICsgbHcpIC8gKDIgKiBQSSkgKyBuOyB9XG5mdW5jdGlvbiBzb2xhclRyYW5zaXRKKGRzLCBNLCBMKSAgeyByZXR1cm4gSjIwMDAgKyBkcyArIDAuMDA1MyAqIHNpbihNKSAtIDAuMDA2OSAqIHNpbigyICogTCk7IH1cblxuZnVuY3Rpb24gaG91ckFuZ2xlKGgsIHBoaSwgZCkgeyByZXR1cm4gYWNvcygoc2luKGgpIC0gc2luKHBoaSkgKiBzaW4oZCkpIC8gKGNvcyhwaGkpICogY29zKGQpKSk7IH1cblxuLy8gcmV0dXJucyBzZXQgdGltZSBmb3IgdGhlIGdpdmVuIHN1biBhbHRpdHVkZVxuZnVuY3Rpb24gZ2V0U2V0SihoLCBsdywgcGhpLCBkZWMsIG4sIE0sIEwpIHtcblxuICAgIHZhciB3ID0gaG91ckFuZ2xlKGgsIHBoaSwgZGVjKSxcbiAgICAgICAgYSA9IGFwcHJveFRyYW5zaXQodywgbHcsIG4pO1xuICAgIHJldHVybiBzb2xhclRyYW5zaXRKKGEsIE0sIEwpO1xufVxuXG5cbi8vIGNhbGN1bGF0ZXMgc3VuIHRpbWVzIGZvciBhIGdpdmVuIGRhdGUgYW5kIGxhdGl0dWRlL2xvbmdpdHVkZVxuXG5TdW5DYWxjLmdldFRpbWVzID0gZnVuY3Rpb24gKGRhdGUsIGxhdCwgbG5nKSB7XG5cbiAgICB2YXIgbHcgPSByYWQgKiAtbG5nLFxuICAgICAgICBwaGkgPSByYWQgKiBsYXQsXG5cbiAgICAgICAgZCA9IHRvRGF5cyhkYXRlKSxcbiAgICAgICAgbiA9IGp1bGlhbkN5Y2xlKGQsIGx3KSxcbiAgICAgICAgZHMgPSBhcHByb3hUcmFuc2l0KDAsIGx3LCBuKSxcblxuICAgICAgICBNID0gc29sYXJNZWFuQW5vbWFseShkcyksXG4gICAgICAgIEwgPSBlY2xpcHRpY0xvbmdpdHVkZShNKSxcbiAgICAgICAgZGVjID0gZGVjbGluYXRpb24oTCwgMCksXG5cbiAgICAgICAgSm5vb24gPSBzb2xhclRyYW5zaXRKKGRzLCBNLCBMKSxcblxuICAgICAgICBpLCBsZW4sIHRpbWUsIEpzZXQsIEpyaXNlO1xuXG5cbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBzb2xhck5vb246IGZyb21KdWxpYW4oSm5vb24pLFxuICAgICAgICBuYWRpcjogZnJvbUp1bGlhbihKbm9vbiAtIDAuNSlcbiAgICB9O1xuXG4gICAgZm9yIChpID0gMCwgbGVuID0gdGltZXMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgdGltZSA9IHRpbWVzW2ldO1xuXG4gICAgICAgIEpzZXQgPSBnZXRTZXRKKHRpbWVbMF0gKiByYWQsIGx3LCBwaGksIGRlYywgbiwgTSwgTCk7XG4gICAgICAgIEpyaXNlID0gSm5vb24gLSAoSnNldCAtIEpub29uKTtcblxuICAgICAgICByZXN1bHRbdGltZVsxXV0gPSBmcm9tSnVsaWFuKEpyaXNlKTtcbiAgICAgICAgcmVzdWx0W3RpbWVbMl1dID0gZnJvbUp1bGlhbihKc2V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLyBtb29uIGNhbGN1bGF0aW9ucywgYmFzZWQgb24gaHR0cDovL2FhLnF1YWUubmwvZW4vcmVrZW4vaGVtZWxwb3NpdGllLmh0bWwgZm9ybXVsYXNcblxuZnVuY3Rpb24gbW9vbkNvb3JkcyhkKSB7IC8vIGdlb2NlbnRyaWMgZWNsaXB0aWMgY29vcmRpbmF0ZXMgb2YgdGhlIG1vb25cblxuICAgIHZhciBMID0gcmFkICogKDIxOC4zMTYgKyAxMy4xNzYzOTYgKiBkKSwgLy8gZWNsaXB0aWMgbG9uZ2l0dWRlXG4gICAgICAgIE0gPSByYWQgKiAoMTM0Ljk2MyArIDEzLjA2NDk5MyAqIGQpLCAvLyBtZWFuIGFub21hbHlcbiAgICAgICAgRiA9IHJhZCAqICg5My4yNzIgKyAxMy4yMjkzNTAgKiBkKSwgIC8vIG1lYW4gZGlzdGFuY2VcblxuICAgICAgICBsICA9IEwgKyByYWQgKiA2LjI4OSAqIHNpbihNKSwgLy8gbG9uZ2l0dWRlXG4gICAgICAgIGIgID0gcmFkICogNS4xMjggKiBzaW4oRiksICAgICAvLyBsYXRpdHVkZVxuICAgICAgICBkdCA9IDM4NTAwMSAtIDIwOTA1ICogY29zKE0pOyAgLy8gZGlzdGFuY2UgdG8gdGhlIG1vb24gaW4ga21cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJhOiByaWdodEFzY2Vuc2lvbihsLCBiKSxcbiAgICAgICAgZGVjOiBkZWNsaW5hdGlvbihsLCBiKSxcbiAgICAgICAgZGlzdDogZHRcbiAgICB9O1xufVxuXG5TdW5DYWxjLmdldE1vb25Qb3NpdGlvbiA9IGZ1bmN0aW9uIChkYXRlLCBsYXQsIGxuZykge1xuXG4gICAgdmFyIGx3ICA9IHJhZCAqIC1sbmcsXG4gICAgICAgIHBoaSA9IHJhZCAqIGxhdCxcbiAgICAgICAgZCAgID0gdG9EYXlzKGRhdGUpLFxuXG4gICAgICAgIGMgPSBtb29uQ29vcmRzKGQpLFxuICAgICAgICBIID0gc2lkZXJlYWxUaW1lKGQsIGx3KSAtIGMucmEsXG4gICAgICAgIGggPSBhbHRpdHVkZShILCBwaGksIGMuZGVjKSxcbiAgICAgICAgLy8gZm9ybXVsYSAxNC4xIG9mIFwiQXN0cm9ub21pY2FsIEFsZ29yaXRobXNcIiAybmQgZWRpdGlvbiBieSBKZWFuIE1lZXVzIChXaWxsbWFubi1CZWxsLCBSaWNobW9uZCkgMTk5OC5cbiAgICAgICAgcGEgPSBhdGFuKHNpbihIKSwgdGFuKHBoaSkgKiBjb3MoYy5kZWMpIC0gc2luKGMuZGVjKSAqIGNvcyhIKSk7XG5cbiAgICBoID0gaCArIGFzdHJvUmVmcmFjdGlvbihoKTsgLy8gYWx0aXR1ZGUgY29ycmVjdGlvbiBmb3IgcmVmcmFjdGlvblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXppbXV0aDogYXppbXV0aChILCBwaGksIGMuZGVjKSxcbiAgICAgICAgYWx0aXR1ZGU6IGgsXG4gICAgICAgIGRpc3RhbmNlOiBjLmRpc3QsXG4gICAgICAgIHBhcmFsbGFjdGljQW5nbGU6IHBhXG4gICAgfTtcbn07XG5cblxuLy8gY2FsY3VsYXRpb25zIGZvciBpbGx1bWluYXRpb24gcGFyYW1ldGVycyBvZiB0aGUgbW9vbixcbi8vIGJhc2VkIG9uIGh0dHA6Ly9pZGxhc3Ryby5nc2ZjLm5hc2EuZ292L2Z0cC9wcm8vYXN0cm8vbXBoYXNlLnBybyBmb3JtdWxhcyBhbmRcbi8vIENoYXB0ZXIgNDggb2YgXCJBc3Ryb25vbWljYWwgQWxnb3JpdGhtc1wiIDJuZCBlZGl0aW9uIGJ5IEplYW4gTWVldXMgKFdpbGxtYW5uLUJlbGwsIFJpY2htb25kKSAxOTk4LlxuXG5TdW5DYWxjLmdldE1vb25JbGx1bWluYXRpb24gPSBmdW5jdGlvbiAoZGF0ZSkge1xuXG4gICAgdmFyIGQgPSB0b0RheXMoZGF0ZSB8fCBuZXcgRGF0ZSgpKSxcbiAgICAgICAgcyA9IHN1bkNvb3JkcyhkKSxcbiAgICAgICAgbSA9IG1vb25Db29yZHMoZCksXG5cbiAgICAgICAgc2Rpc3QgPSAxNDk1OTgwMDAsIC8vIGRpc3RhbmNlIGZyb20gRWFydGggdG8gU3VuIGluIGttXG5cbiAgICAgICAgcGhpID0gYWNvcyhzaW4ocy5kZWMpICogc2luKG0uZGVjKSArIGNvcyhzLmRlYykgKiBjb3MobS5kZWMpICogY29zKHMucmEgLSBtLnJhKSksXG4gICAgICAgIGluYyA9IGF0YW4oc2Rpc3QgKiBzaW4ocGhpKSwgbS5kaXN0IC0gc2Rpc3QgKiBjb3MocGhpKSksXG4gICAgICAgIGFuZ2xlID0gYXRhbihjb3Mocy5kZWMpICogc2luKHMucmEgLSBtLnJhKSwgc2luKHMuZGVjKSAqIGNvcyhtLmRlYykgLVxuICAgICAgICAgICAgICAgIGNvcyhzLmRlYykgKiBzaW4obS5kZWMpICogY29zKHMucmEgLSBtLnJhKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmcmFjdGlvbjogKDEgKyBjb3MoaW5jKSkgLyAyLFxuICAgICAgICBwaGFzZTogMC41ICsgMC41ICogaW5jICogKGFuZ2xlIDwgMCA/IC0xIDogMSkgLyBNYXRoLlBJLFxuICAgICAgICBhbmdsZTogYW5nbGVcbiAgICB9O1xufTtcblxuXG5mdW5jdGlvbiBob3Vyc0xhdGVyKGRhdGUsIGgpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS52YWx1ZU9mKCkgKyBoICogZGF5TXMgLyAyNCk7XG59XG5cbi8vIGNhbGN1bGF0aW9ucyBmb3IgbW9vbiByaXNlL3NldCB0aW1lcyBhcmUgYmFzZWQgb24gaHR0cDovL3d3dy5zdGFyZ2F6aW5nLm5ldC9rZXBsZXIvbW9vbnJpc2UuaHRtbCBhcnRpY2xlXG5cblN1bkNhbGMuZ2V0TW9vblRpbWVzID0gZnVuY3Rpb24gKGRhdGUsIGxhdCwgbG5nLCBpblVUQykge1xuICAgIHZhciB0ID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgaWYgKGluVVRDKSB0LnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIGVsc2UgdC5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgIHZhciBoYyA9IDAuMTMzICogcmFkLFxuICAgICAgICBoMCA9IFN1bkNhbGMuZ2V0TW9vblBvc2l0aW9uKHQsIGxhdCwgbG5nKS5hbHRpdHVkZSAtIGhjLFxuICAgICAgICBoMSwgaDIsIHJpc2UsIHNldCwgYSwgYiwgeGUsIHllLCBkLCByb290cywgeDEsIHgyLCBkeDtcblxuICAgIC8vIGdvIGluIDItaG91ciBjaHVua3MsIGVhY2ggdGltZSBzZWVpbmcgaWYgYSAzLXBvaW50IHF1YWRyYXRpYyBjdXJ2ZSBjcm9zc2VzIHplcm8gKHdoaWNoIG1lYW5zIHJpc2Ugb3Igc2V0KVxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDI0OyBpICs9IDIpIHtcbiAgICAgICAgaDEgPSBTdW5DYWxjLmdldE1vb25Qb3NpdGlvbihob3Vyc0xhdGVyKHQsIGkpLCBsYXQsIGxuZykuYWx0aXR1ZGUgLSBoYztcbiAgICAgICAgaDIgPSBTdW5DYWxjLmdldE1vb25Qb3NpdGlvbihob3Vyc0xhdGVyKHQsIGkgKyAxKSwgbGF0LCBsbmcpLmFsdGl0dWRlIC0gaGM7XG5cbiAgICAgICAgYSA9IChoMCArIGgyKSAvIDIgLSBoMTtcbiAgICAgICAgYiA9IChoMiAtIGgwKSAvIDI7XG4gICAgICAgIHhlID0gLWIgLyAoMiAqIGEpO1xuICAgICAgICB5ZSA9IChhICogeGUgKyBiKSAqIHhlICsgaDE7XG4gICAgICAgIGQgPSBiICogYiAtIDQgKiBhICogaDE7XG4gICAgICAgIHJvb3RzID0gMDtcblxuICAgICAgICBpZiAoZCA+PSAwKSB7XG4gICAgICAgICAgICBkeCA9IE1hdGguc3FydChkKSAvIChNYXRoLmFicyhhKSAqIDIpO1xuICAgICAgICAgICAgeDEgPSB4ZSAtIGR4O1xuICAgICAgICAgICAgeDIgPSB4ZSArIGR4O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgxKSA8PSAxKSByb290cysrO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgyKSA8PSAxKSByb290cysrO1xuICAgICAgICAgICAgaWYgKHgxIDwgLTEpIHgxID0geDI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9vdHMgPT09IDEpIHtcbiAgICAgICAgICAgIGlmIChoMCA8IDApIHJpc2UgPSBpICsgeDE7XG4gICAgICAgICAgICBlbHNlIHNldCA9IGkgKyB4MTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJvb3RzID09PSAyKSB7XG4gICAgICAgICAgICByaXNlID0gaSArICh5ZSA8IDAgPyB4MiA6IHgxKTtcbiAgICAgICAgICAgIHNldCA9IGkgKyAoeWUgPCAwID8geDEgOiB4Mik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmlzZSAmJiBzZXQpIGJyZWFrO1xuXG4gICAgICAgIGgwID0gaDI7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gICAgaWYgKHJpc2UpIHJlc3VsdC5yaXNlID0gaG91cnNMYXRlcih0LCByaXNlKTtcbiAgICBpZiAoc2V0KSByZXN1bHQuc2V0ID0gaG91cnNMYXRlcih0LCBzZXQpO1xuXG4gICAgaWYgKCFyaXNlICYmICFzZXQpIHJlc3VsdFt5ZSA+IDAgPyAnYWx3YXlzVXAnIDogJ2Fsd2F5c0Rvd24nXSA9IHRydWU7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLyBleHBvcnQgYXMgTm9kZSBtb2R1bGUgLyBBTUQgbW9kdWxlIC8gYnJvd3NlciB2YXJpYWJsZVxuaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBTdW5DYWxjO1xuZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoU3VuQ2FsYyk7XG5lbHNlIHdpbmRvdy5TdW5DYWxjID0gU3VuQ2FsYztcblxufSgpKTtcbiIsImltcG9ydCBOaWdodDIsIHsgSVNfQlJPV1NFUiB9IGZyb20gJy4vbmlnaHQyJztcbmV4cG9ydCBkZWZhdWx0IE5pZ2h0MjtcblxuLyogZXNsaW50LWRpc2FibGUgKi9cbmlmIChJU19CUk9XU0VSKSB7XG4gIChmdW5jdGlvbiAod2luZG93KSB7XG4gICAgd2luZG93Lk5pZ2h0MiA9IE5pZ2h0MjtcbiAgfSkod2luZG93KTtcbn1cbi8qIGVzbGludC1lbmFibGUgKi9cbiIsImV4cG9ydCBjb25zdCBJU19CUk9XU0VSID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5cbmltcG9ydCBTdW5DYWxjIGZyb20gJ3N1bmNhbGMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOaWdodDIge1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncyA9IHt9KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZXh0ZW5kU2V0dGluZ3Moc2V0dGluZ3MpO1xuXG4gICAgdGhpcy50b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnRpbWUobmV3IERhdGUoKSksIDEwMDApO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0bykgdGhpcy5hdXRvKHRydWUpO1xuXG4gICAgdGhpcy50aGVtZSgpO1xuICB9XG5cbiAgdGltZShub3cpIHtcbiAgICBjb25zdCBtaWRuaWdodCA9IG5ldyBEYXRlKCkuc2V0SG91cnMoMjQsIDAsIDAsIDApO1xuXG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UudGltZSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RpbWUnLCBKU09OLnN0cmluZ2lmeShtaWRuaWdodCkpO1xuICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmxvY2F0aW9uICYmIG5vdy5nZXRUaW1lKCkgPiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS50aW1lKSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RpbWUnKTtcblxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FjaGVDbGVhcikge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnbG9jYXRpb24nKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25DYWNoZUNsZWFyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy5vbkNhY2hlQ2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoZW1lKCkge1xuICAgIGxvY2FsU3RvcmFnZS5kYXJrID09PSAndHJ1ZScgPyB0aGlzLmRhcmsoKSA6IHRoaXMubGlnaHQoKTtcbiAgfVxuXG4gIGF1dG8oaW5pdCkge1xuICAgIGlmICgoaW5pdCAmJiAhbG9jYWxTdG9yYWdlLmF1dG8pIHx8ICFpbml0KSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXV0bycsICd0cnVlJyk7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vbkF1dG8gPT09ICdmdW5jdGlvbicpIHRoaXMuc2V0dGluZ3Mub25BdXRvKCk7XG4gICAgfVxuXG4gICAgaWYgKCdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yKSB0aGlzLm15TG9jYXRpb24oKTtcbiAgfVxuXG4gIG15TG9jYXRpb24oKSB7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UubG9jYXRpb24pIHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24odGhpcy5zdWNjZXNzLmJpbmQodGhpcyksIHRoaXMuZXJyb3IuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UubG9jYXRpb24pO1xuXG4gICAgICB0aGlzLmNoZWNrU3VuUG9zaXRpb24obG9jYXRpb24ubGF0aXR1ZGUsIGxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgfVxuICB9XG5cbiAgc3VjY2Vzcyhwb3MpIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHtcbiAgICAgIGxhdGl0dWRlOiBwb3MuY29vcmRzLmxhdGl0dWRlLFxuICAgICAgbG9uZ2l0dWRlOiBwb3MuY29vcmRzLmxvbmdpdHVkZVxuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrU3VuUG9zaXRpb24obG9jYXRpb24ubGF0aXR1ZGUsIGxvY2F0aW9uLmxvbmdpdHVkZSk7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jYWNoZSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvY2F0aW9uJywgSlNPTi5zdHJpbmdpZnkobG9jYXRpb24pKTtcbiAgICB9XG4gIH1cblxuICBlcnJvcihlcnIpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25EZW5pZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3Mub25EZW5pZWQoKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbWFydERhcmtFcnJvcicsIHtcbiAgICAgICAgZGV0YWlsOiBlcnJcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGNoZWNrU3VuUG9zaXRpb24obGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgY29uc3QgdGltZXMgPSBuZXcgU3VuQ2FsYy5nZXRUaW1lcyh0aGlzLnRvZGF5LCBsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgICBjb25zdCBzdW5yaXNlID0gdGltZXMuc3VucmlzZUVuZCAtICh0aW1lcy5zdW5yaXNlRW5kIC0gdGltZXMuc3VucmlzZSkgLyAyO1xuICAgIGNvbnN0IHN1bnNldCA9IHRpbWVzLnN1bnNldCAtICh0aW1lcy5zdW5zZXQgLSB0aW1lcy5zdW5zZXRTdGFydCkgLyAyO1xuXG4gICAgY29uc3QgdmFsdWVzID0ge1xuICAgICAgc3VucmlzZTogbmV3IERhdGUoc3VucmlzZSksXG4gICAgICBzdW5zZXQ6IG5ldyBEYXRlKHN1bnNldCksXG4gICAgICBsYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbWFydERhcmsnLCB7XG4gICAgICAgIGRldGFpbDogdmFsdWVzXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmF1dG8gJiYgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuYXV0bykpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgICBub3cuZ2V0VGltZSgpID4gc3VucmlzZSAmJiBub3cuZ2V0VGltZSgpIDwgc3Vuc2V0ID8gdGhpcy5saWdodCgpIDogdGhpcy5kYXJrKCk7XG4gICAgICB9XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uUmVzZXQgPT09ICdmdW5jdGlvbicpIHRoaXMuc2V0dGluZ3Mub25SZXNldCgpO1xuICB9XG5cbiAgbGlnaHQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uTGlnaHQgPT09ICdmdW5jdGlvbicpIHRoaXMuc2V0dGluZ3Mub25MaWdodCgpO1xuXG4gICAgdGhpcy5pc0RhcmsgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmxpZ2h0Q2xhc3MpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuZGl2SWQpLmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5saWdodENsYXNzKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpdklkKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuZGFya0NsYXNzKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrJywgJ2ZhbHNlJyk7XG4gIH1cblxuICBkYXJrKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vbkRhcmsgPT09ICdmdW5jdGlvbicpIHRoaXMuc2V0dGluZ3Mub25EYXJrKCk7XG5cbiAgICB0aGlzLmlzRGFyayA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5saWdodENsYXNzKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpdklkKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MubGlnaHRDbGFzcyk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXZJZCkuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmRhcmtDbGFzcyk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFyaycsICd0cnVlJyk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uVG9nZ2xlID09PSAnZnVuY3Rpb24nKSB0aGlzLnNldHRpbmdzLm9uVG9nZ2xlKCk7XG5cbiAgICB0aGlzLmlzRGFyayA/IHRoaXMubGlnaHQoKSA6IHRoaXMuZGFyaygpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dG8nLCAnZmFsc2UnKTtcbiAgfVxuXG4gIGV4dGVuZFNldHRpbmdzKHNldHRpbmdzKSB7XG4gICAgY29uc3QgZGVmYXVsdFNldHRpbmdzID0ge1xuICAgICAgZGl2SWQ6ICdkYXJrbW9kZScsXG4gICAgICBsaWdodENsYXNzOiAnJywgLy8gY2xhc3MgYWRkZWQgdG8gYm9keSB3aGVuIGRhcmsgbW9kZSBpcyBkaXNhYmxlZFxuICAgICAgZGFya0NsYXNzOiAnZGFyaycsIC8vIGNsYXNzIGFkZGVkIHRvIGJvZHkgd2hlbiBkYXJrIG1vZGUgaXMgZW5hYmxlZFxuICAgICAgY2FjaGU6IHRydWUsIC8vIGNhY2hlIGxvY2F0aW9uIGNvb3JkaW5hdGVzIGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgIGNhY2hlQ2xlYXI6IHRydWUsIC8vIGNsZWFyIGxvY2F0aW9uIGNvb3JkaW5hdGVzIGluIGxvY2FsIHN0b3JhZ2UgZXZlcnlkYXkgYXQgbWlkbmlnaHRcbiAgICAgIGF1dG86IHRydWUsIC8vIGVuYWJsZSBzbWFydCBzd2l0Y2ggb24gc2NyaXB0IGluaXRcblxuICAgICAgb25BdXRvOiBudWxsLCAvLyBjYWxsYmFjayBvbiBzbWFydCBzd2l0Y2hcbiAgICAgIG9uTGlnaHQ6IG51bGwsIC8vIGNhbGxiYWNrIHdoZW4gZGFyayBtb2RlIGlzIGRpc2FibGVkXG4gICAgICBvbkRhcms6IG51bGwsIC8vIGNhbGxiYWNrIHdoZW4gZGFyayBtb2RlIGlzIGVuYWJsZWRcbiAgICAgIG9uVG9nZ2xlOiBudWxsLCAvLyBjYWxsYmFjayBvbiBkYXJrL2xpZ2h0IG1vZGUgdG9nZ2xlXG4gICAgICBvbkRlbmllZDogbnVsbCwgLy8gY2FsbGJhY2sgb24gZ2VvbG9jYXRpb24gcGVybWlzc2lvbiBkZWluZWRcbiAgICAgIG9uQ2FjaGVDbGVhcjogbnVsbCwgLy8gY2FsbGJhY2sgd2hlbiBsb2NhdGlvbiBjb29yZGluYXRlcyBhbmQgbWlkbmlnaHQgdGltZSBpbiBsb2NhbCBzdG9yYWdlIGNsZWFyZWRcbiAgICAgIG9uUmVzZXQ6IG51bGwgLy8gY2FsbGJhY2sgb24gbG9jYWxTdG9yYWdlIHJlc2V0XG4gICAgfTtcblxuICAgIGNvbnN0IG5ld1NldHRpbmdzID0ge307XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGVmYXVsdFNldHRpbmdzKSB7XG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgICAgaWYgKHByb3BlcnR5IGluIHNldHRpbmdzKSBuZXdTZXR0aW5nc1twcm9wZXJ0eV0gPSBzZXR0aW5nc1twcm9wZXJ0eV07XG4gICAgICBlbHNlIG5ld1NldHRpbmdzW3Byb3BlcnR5XSA9IGRlZmF1bHRTZXR0aW5nc1twcm9wZXJ0eV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1NldHRpbmdzO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
