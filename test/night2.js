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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uaWdodDIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25pZ2h0Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uaWdodDIvLi9ub2RlX21vZHVsZXMvc3VuY2FsYy9zdW5jYWxjLmpzIiwid2VicGFjazovL25pZ2h0Mi8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9uaWdodDIvLi9zcmMvbmlnaHQyLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIk5pZ2h0MiIsIklTX0JST1dTRVIiLCJzZXR0aW5ncyIsImV4dGVuZFNldHRpbmdzIiwidG9kYXkiLCJEYXRlIiwic2V0SW50ZXJ2YWwiLCJ0aW1lIiwiYXV0byIsInRoZW1lIiwibm93IiwibWlkbmlnaHQiLCJzZXRIb3VycyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwibG9jYXRpb24iLCJnZXRUaW1lIiwicGFyc2UiLCJyZW1vdmVJdGVtIiwiY2FjaGVDbGVhciIsIm9uQ2FjaGVDbGVhciIsImRhcmsiLCJsaWdodCIsImluaXQiLCJvbkF1dG8iLCJuYXZpZ2F0b3IiLCJteUxvY2F0aW9uIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJzdWNjZXNzIiwiYmluZCIsImVycm9yIiwiY2hlY2tTdW5Qb3NpdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwicG9zIiwiY29vcmRzIiwiY2FjaGUiLCJlcnIiLCJvbkRlbmllZCIsImRvY3VtZW50IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwidGltZXMiLCJnZXRUaW1lcyIsInN1bnJpc2UiLCJzdW5yaXNlRW5kIiwic3Vuc2V0Iiwic3Vuc2V0U3RhcnQiLCJ2YWx1ZXMiLCJjbGVhciIsIm9uUmVzZXQiLCJvbkxpZ2h0IiwiaXNEYXJrIiwibGlnaHRDbGFzcyIsImdldEVsZW1lbnRCeUlkIiwiZGl2SWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkYXJrQ2xhc3MiLCJvbkRhcmsiLCJvblRvZ2dsZSIsImRlZmF1bHRTZXR0aW5ncyIsIm5ld1NldHRpbmdzIiwicHJvcGVydHkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjOztBQUVkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsNkNBQTZDO0FBQ3RFLHlCQUF5Qiw0Q0FBNEM7QUFDckUseUJBQXlCLCtCQUErQjs7O0FBR3hEOztBQUVBLHNCQUFzQjs7QUFFdEIsK0JBQStCLHdEQUF3RDtBQUN2RiwrQkFBK0IseURBQXlEOztBQUV4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Q0UsUUFBRCxDQUF2QztBQUNOOztBQUVELGFBQU9ELFdBQVA7QUFDRCIsImZpbGUiOiJuaWdodDIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIm5pZ2h0MlwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuaWdodDJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wibmlnaHQyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLypcbiAoYykgMjAxMS0yMDE1LCBWbGFkaW1pciBBZ2Fmb25raW5cbiBTdW5DYWxjIGlzIGEgSmF2YVNjcmlwdCBsaWJyYXJ5IGZvciBjYWxjdWxhdGluZyBzdW4vbW9vbiBwb3NpdGlvbiBhbmQgbGlnaHQgcGhhc2VzLlxuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3N1bmNhbGNcbiovXG5cbihmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuLy8gc2hvcnRjdXRzIGZvciBlYXNpZXIgdG8gcmVhZCBmb3JtdWxhc1xuXG52YXIgUEkgICA9IE1hdGguUEksXG4gICAgc2luICA9IE1hdGguc2luLFxuICAgIGNvcyAgPSBNYXRoLmNvcyxcbiAgICB0YW4gID0gTWF0aC50YW4sXG4gICAgYXNpbiA9IE1hdGguYXNpbixcbiAgICBhdGFuID0gTWF0aC5hdGFuMixcbiAgICBhY29zID0gTWF0aC5hY29zLFxuICAgIHJhZCAgPSBQSSAvIDE4MDtcblxuLy8gc3VuIGNhbGN1bGF0aW9ucyBhcmUgYmFzZWQgb24gaHR0cDovL2FhLnF1YWUubmwvZW4vcmVrZW4vem9ucG9zaXRpZS5odG1sIGZvcm11bGFzXG5cblxuLy8gZGF0ZS90aW1lIGNvbnN0YW50cyBhbmQgY29udmVyc2lvbnNcblxudmFyIGRheU1zID0gMTAwMCAqIDYwICogNjAgKiAyNCxcbiAgICBKMTk3MCA9IDI0NDA1ODgsXG4gICAgSjIwMDAgPSAyNDUxNTQ1O1xuXG5mdW5jdGlvbiB0b0p1bGlhbihkYXRlKSB7IHJldHVybiBkYXRlLnZhbHVlT2YoKSAvIGRheU1zIC0gMC41ICsgSjE5NzA7IH1cbmZ1bmN0aW9uIGZyb21KdWxpYW4oaikgIHsgcmV0dXJuIG5ldyBEYXRlKChqICsgMC41IC0gSjE5NzApICogZGF5TXMpOyB9XG5mdW5jdGlvbiB0b0RheXMoZGF0ZSkgICB7IHJldHVybiB0b0p1bGlhbihkYXRlKSAtIEoyMDAwOyB9XG5cblxuLy8gZ2VuZXJhbCBjYWxjdWxhdGlvbnMgZm9yIHBvc2l0aW9uXG5cbnZhciBlID0gcmFkICogMjMuNDM5NzsgLy8gb2JsaXF1aXR5IG9mIHRoZSBFYXJ0aFxuXG5mdW5jdGlvbiByaWdodEFzY2Vuc2lvbihsLCBiKSB7IHJldHVybiBhdGFuKHNpbihsKSAqIGNvcyhlKSAtIHRhbihiKSAqIHNpbihlKSwgY29zKGwpKTsgfVxuZnVuY3Rpb24gZGVjbGluYXRpb24obCwgYikgICAgeyByZXR1cm4gYXNpbihzaW4oYikgKiBjb3MoZSkgKyBjb3MoYikgKiBzaW4oZSkgKiBzaW4obCkpOyB9XG5cbmZ1bmN0aW9uIGF6aW11dGgoSCwgcGhpLCBkZWMpICB7IHJldHVybiBhdGFuKHNpbihIKSwgY29zKEgpICogc2luKHBoaSkgLSB0YW4oZGVjKSAqIGNvcyhwaGkpKTsgfVxuZnVuY3Rpb24gYWx0aXR1ZGUoSCwgcGhpLCBkZWMpIHsgcmV0dXJuIGFzaW4oc2luKHBoaSkgKiBzaW4oZGVjKSArIGNvcyhwaGkpICogY29zKGRlYykgKiBjb3MoSCkpOyB9XG5cbmZ1bmN0aW9uIHNpZGVyZWFsVGltZShkLCBsdykgeyByZXR1cm4gcmFkICogKDI4MC4xNiArIDM2MC45ODU2MjM1ICogZCkgLSBsdzsgfVxuXG5mdW5jdGlvbiBhc3Ryb1JlZnJhY3Rpb24oaCkge1xuICAgIGlmIChoIDwgMCkgLy8gdGhlIGZvbGxvd2luZyBmb3JtdWxhIHdvcmtzIGZvciBwb3NpdGl2ZSBhbHRpdHVkZXMgb25seS5cbiAgICAgICAgaCA9IDA7IC8vIGlmIGggPSAtMC4wODkwMTE3OSBhIGRpdi8wIHdvdWxkIG9jY3VyLlxuXG4gICAgLy8gZm9ybXVsYSAxNi40IG9mIFwiQXN0cm9ub21pY2FsIEFsZ29yaXRobXNcIiAybmQgZWRpdGlvbiBieSBKZWFuIE1lZXVzIChXaWxsbWFubi1CZWxsLCBSaWNobW9uZCkgMTk5OC5cbiAgICAvLyAxLjAyIC8gdGFuKGggKyAxMC4yNiAvIChoICsgNS4xMCkpIGggaW4gZGVncmVlcywgcmVzdWx0IGluIGFyYyBtaW51dGVzIC0+IGNvbnZlcnRlZCB0byByYWQ6XG4gICAgcmV0dXJuIDAuMDAwMjk2NyAvIE1hdGgudGFuKGggKyAwLjAwMzEyNTM2IC8gKGggKyAwLjA4OTAxMTc5KSk7XG59XG5cbi8vIGdlbmVyYWwgc3VuIGNhbGN1bGF0aW9uc1xuXG5mdW5jdGlvbiBzb2xhck1lYW5Bbm9tYWx5KGQpIHsgcmV0dXJuIHJhZCAqICgzNTcuNTI5MSArIDAuOTg1NjAwMjggKiBkKTsgfVxuXG5mdW5jdGlvbiBlY2xpcHRpY0xvbmdpdHVkZShNKSB7XG5cbiAgICB2YXIgQyA9IHJhZCAqICgxLjkxNDggKiBzaW4oTSkgKyAwLjAyICogc2luKDIgKiBNKSArIDAuMDAwMyAqIHNpbigzICogTSkpLCAvLyBlcXVhdGlvbiBvZiBjZW50ZXJcbiAgICAgICAgUCA9IHJhZCAqIDEwMi45MzcyOyAvLyBwZXJpaGVsaW9uIG9mIHRoZSBFYXJ0aFxuXG4gICAgcmV0dXJuIE0gKyBDICsgUCArIFBJO1xufVxuXG5mdW5jdGlvbiBzdW5Db29yZHMoZCkge1xuXG4gICAgdmFyIE0gPSBzb2xhck1lYW5Bbm9tYWx5KGQpLFxuICAgICAgICBMID0gZWNsaXB0aWNMb25naXR1ZGUoTSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZWM6IGRlY2xpbmF0aW9uKEwsIDApLFxuICAgICAgICByYTogcmlnaHRBc2NlbnNpb24oTCwgMClcbiAgICB9O1xufVxuXG5cbnZhciBTdW5DYWxjID0ge307XG5cblxuLy8gY2FsY3VsYXRlcyBzdW4gcG9zaXRpb24gZm9yIGEgZ2l2ZW4gZGF0ZSBhbmQgbGF0aXR1ZGUvbG9uZ2l0dWRlXG5cblN1bkNhbGMuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoZGF0ZSwgbGF0LCBsbmcpIHtcblxuICAgIHZhciBsdyAgPSByYWQgKiAtbG5nLFxuICAgICAgICBwaGkgPSByYWQgKiBsYXQsXG4gICAgICAgIGQgICA9IHRvRGF5cyhkYXRlKSxcblxuICAgICAgICBjICA9IHN1bkNvb3JkcyhkKSxcbiAgICAgICAgSCAgPSBzaWRlcmVhbFRpbWUoZCwgbHcpIC0gYy5yYTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGF6aW11dGg6IGF6aW11dGgoSCwgcGhpLCBjLmRlYyksXG4gICAgICAgIGFsdGl0dWRlOiBhbHRpdHVkZShILCBwaGksIGMuZGVjKVxuICAgIH07XG59O1xuXG5cbi8vIHN1biB0aW1lcyBjb25maWd1cmF0aW9uIChhbmdsZSwgbW9ybmluZyBuYW1lLCBldmVuaW5nIG5hbWUpXG5cbnZhciB0aW1lcyA9IFN1bkNhbGMudGltZXMgPSBbXG4gICAgWy0wLjgzMywgJ3N1bnJpc2UnLCAgICAgICAnc3Vuc2V0JyAgICAgIF0sXG4gICAgWyAgLTAuMywgJ3N1bnJpc2VFbmQnLCAgICAnc3Vuc2V0U3RhcnQnIF0sXG4gICAgWyAgICAtNiwgJ2Rhd24nLCAgICAgICAgICAnZHVzaycgICAgICAgIF0sXG4gICAgWyAgIC0xMiwgJ25hdXRpY2FsRGF3bicsICAnbmF1dGljYWxEdXNrJ10sXG4gICAgWyAgIC0xOCwgJ25pZ2h0RW5kJywgICAgICAnbmlnaHQnICAgICAgIF0sXG4gICAgWyAgICAgNiwgJ2dvbGRlbkhvdXJFbmQnLCAnZ29sZGVuSG91cicgIF1cbl07XG5cbi8vIGFkZHMgYSBjdXN0b20gdGltZSB0byB0aGUgdGltZXMgY29uZmlnXG5cblN1bkNhbGMuYWRkVGltZSA9IGZ1bmN0aW9uIChhbmdsZSwgcmlzZU5hbWUsIHNldE5hbWUpIHtcbiAgICB0aW1lcy5wdXNoKFthbmdsZSwgcmlzZU5hbWUsIHNldE5hbWVdKTtcbn07XG5cblxuLy8gY2FsY3VsYXRpb25zIGZvciBzdW4gdGltZXNcblxudmFyIEowID0gMC4wMDA5O1xuXG5mdW5jdGlvbiBqdWxpYW5DeWNsZShkLCBsdykgeyByZXR1cm4gTWF0aC5yb3VuZChkIC0gSjAgLSBsdyAvICgyICogUEkpKTsgfVxuXG5mdW5jdGlvbiBhcHByb3hUcmFuc2l0KEh0LCBsdywgbikgeyByZXR1cm4gSjAgKyAoSHQgKyBsdykgLyAoMiAqIFBJKSArIG47IH1cbmZ1bmN0aW9uIHNvbGFyVHJhbnNpdEooZHMsIE0sIEwpICB7IHJldHVybiBKMjAwMCArIGRzICsgMC4wMDUzICogc2luKE0pIC0gMC4wMDY5ICogc2luKDIgKiBMKTsgfVxuXG5mdW5jdGlvbiBob3VyQW5nbGUoaCwgcGhpLCBkKSB7IHJldHVybiBhY29zKChzaW4oaCkgLSBzaW4ocGhpKSAqIHNpbihkKSkgLyAoY29zKHBoaSkgKiBjb3MoZCkpKTsgfVxuXG4vLyByZXR1cm5zIHNldCB0aW1lIGZvciB0aGUgZ2l2ZW4gc3VuIGFsdGl0dWRlXG5mdW5jdGlvbiBnZXRTZXRKKGgsIGx3LCBwaGksIGRlYywgbiwgTSwgTCkge1xuXG4gICAgdmFyIHcgPSBob3VyQW5nbGUoaCwgcGhpLCBkZWMpLFxuICAgICAgICBhID0gYXBwcm94VHJhbnNpdCh3LCBsdywgbik7XG4gICAgcmV0dXJuIHNvbGFyVHJhbnNpdEooYSwgTSwgTCk7XG59XG5cblxuLy8gY2FsY3VsYXRlcyBzdW4gdGltZXMgZm9yIGEgZ2l2ZW4gZGF0ZSBhbmQgbGF0aXR1ZGUvbG9uZ2l0dWRlXG5cblN1bkNhbGMuZ2V0VGltZXMgPSBmdW5jdGlvbiAoZGF0ZSwgbGF0LCBsbmcpIHtcblxuICAgIHZhciBsdyA9IHJhZCAqIC1sbmcsXG4gICAgICAgIHBoaSA9IHJhZCAqIGxhdCxcblxuICAgICAgICBkID0gdG9EYXlzKGRhdGUpLFxuICAgICAgICBuID0ganVsaWFuQ3ljbGUoZCwgbHcpLFxuICAgICAgICBkcyA9IGFwcHJveFRyYW5zaXQoMCwgbHcsIG4pLFxuXG4gICAgICAgIE0gPSBzb2xhck1lYW5Bbm9tYWx5KGRzKSxcbiAgICAgICAgTCA9IGVjbGlwdGljTG9uZ2l0dWRlKE0pLFxuICAgICAgICBkZWMgPSBkZWNsaW5hdGlvbihMLCAwKSxcblxuICAgICAgICBKbm9vbiA9IHNvbGFyVHJhbnNpdEooZHMsIE0sIEwpLFxuXG4gICAgICAgIGksIGxlbiwgdGltZSwgSnNldCwgSnJpc2U7XG5cblxuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHNvbGFyTm9vbjogZnJvbUp1bGlhbihKbm9vbiksXG4gICAgICAgIG5hZGlyOiBmcm9tSnVsaWFuKEpub29uIC0gMC41KVxuICAgIH07XG5cbiAgICBmb3IgKGkgPSAwLCBsZW4gPSB0aW1lcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICB0aW1lID0gdGltZXNbaV07XG5cbiAgICAgICAgSnNldCA9IGdldFNldEoodGltZVswXSAqIHJhZCwgbHcsIHBoaSwgZGVjLCBuLCBNLCBMKTtcbiAgICAgICAgSnJpc2UgPSBKbm9vbiAtIChKc2V0IC0gSm5vb24pO1xuXG4gICAgICAgIHJlc3VsdFt0aW1lWzFdXSA9IGZyb21KdWxpYW4oSnJpc2UpO1xuICAgICAgICByZXN1bHRbdGltZVsyXV0gPSBmcm9tSnVsaWFuKEpzZXQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vIG1vb24gY2FsY3VsYXRpb25zLCBiYXNlZCBvbiBodHRwOi8vYWEucXVhZS5ubC9lbi9yZWtlbi9oZW1lbHBvc2l0aWUuaHRtbCBmb3JtdWxhc1xuXG5mdW5jdGlvbiBtb29uQ29vcmRzKGQpIHsgLy8gZ2VvY2VudHJpYyBlY2xpcHRpYyBjb29yZGluYXRlcyBvZiB0aGUgbW9vblxuXG4gICAgdmFyIEwgPSByYWQgKiAoMjE4LjMxNiArIDEzLjE3NjM5NiAqIGQpLCAvLyBlY2xpcHRpYyBsb25naXR1ZGVcbiAgICAgICAgTSA9IHJhZCAqICgxMzQuOTYzICsgMTMuMDY0OTkzICogZCksIC8vIG1lYW4gYW5vbWFseVxuICAgICAgICBGID0gcmFkICogKDkzLjI3MiArIDEzLjIyOTM1MCAqIGQpLCAgLy8gbWVhbiBkaXN0YW5jZVxuXG4gICAgICAgIGwgID0gTCArIHJhZCAqIDYuMjg5ICogc2luKE0pLCAvLyBsb25naXR1ZGVcbiAgICAgICAgYiAgPSByYWQgKiA1LjEyOCAqIHNpbihGKSwgICAgIC8vIGxhdGl0dWRlXG4gICAgICAgIGR0ID0gMzg1MDAxIC0gMjA5MDUgKiBjb3MoTSk7ICAvLyBkaXN0YW5jZSB0byB0aGUgbW9vbiBpbiBrbVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmE6IHJpZ2h0QXNjZW5zaW9uKGwsIGIpLFxuICAgICAgICBkZWM6IGRlY2xpbmF0aW9uKGwsIGIpLFxuICAgICAgICBkaXN0OiBkdFxuICAgIH07XG59XG5cblN1bkNhbGMuZ2V0TW9vblBvc2l0aW9uID0gZnVuY3Rpb24gKGRhdGUsIGxhdCwgbG5nKSB7XG5cbiAgICB2YXIgbHcgID0gcmFkICogLWxuZyxcbiAgICAgICAgcGhpID0gcmFkICogbGF0LFxuICAgICAgICBkICAgPSB0b0RheXMoZGF0ZSksXG5cbiAgICAgICAgYyA9IG1vb25Db29yZHMoZCksXG4gICAgICAgIEggPSBzaWRlcmVhbFRpbWUoZCwgbHcpIC0gYy5yYSxcbiAgICAgICAgaCA9IGFsdGl0dWRlKEgsIHBoaSwgYy5kZWMpLFxuICAgICAgICAvLyBmb3JtdWxhIDE0LjEgb2YgXCJBc3Ryb25vbWljYWwgQWxnb3JpdGhtc1wiIDJuZCBlZGl0aW9uIGJ5IEplYW4gTWVldXMgKFdpbGxtYW5uLUJlbGwsIFJpY2htb25kKSAxOTk4LlxuICAgICAgICBwYSA9IGF0YW4oc2luKEgpLCB0YW4ocGhpKSAqIGNvcyhjLmRlYykgLSBzaW4oYy5kZWMpICogY29zKEgpKTtcblxuICAgIGggPSBoICsgYXN0cm9SZWZyYWN0aW9uKGgpOyAvLyBhbHRpdHVkZSBjb3JyZWN0aW9uIGZvciByZWZyYWN0aW9uXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhemltdXRoOiBhemltdXRoKEgsIHBoaSwgYy5kZWMpLFxuICAgICAgICBhbHRpdHVkZTogaCxcbiAgICAgICAgZGlzdGFuY2U6IGMuZGlzdCxcbiAgICAgICAgcGFyYWxsYWN0aWNBbmdsZTogcGFcbiAgICB9O1xufTtcblxuXG4vLyBjYWxjdWxhdGlvbnMgZm9yIGlsbHVtaW5hdGlvbiBwYXJhbWV0ZXJzIG9mIHRoZSBtb29uLFxuLy8gYmFzZWQgb24gaHR0cDovL2lkbGFzdHJvLmdzZmMubmFzYS5nb3YvZnRwL3Byby9hc3Ryby9tcGhhc2UucHJvIGZvcm11bGFzIGFuZFxuLy8gQ2hhcHRlciA0OCBvZiBcIkFzdHJvbm9taWNhbCBBbGdvcml0aG1zXCIgMm5kIGVkaXRpb24gYnkgSmVhbiBNZWV1cyAoV2lsbG1hbm4tQmVsbCwgUmljaG1vbmQpIDE5OTguXG5cblN1bkNhbGMuZ2V0TW9vbklsbHVtaW5hdGlvbiA9IGZ1bmN0aW9uIChkYXRlKSB7XG5cbiAgICB2YXIgZCA9IHRvRGF5cyhkYXRlIHx8IG5ldyBEYXRlKCkpLFxuICAgICAgICBzID0gc3VuQ29vcmRzKGQpLFxuICAgICAgICBtID0gbW9vbkNvb3JkcyhkKSxcblxuICAgICAgICBzZGlzdCA9IDE0OTU5ODAwMCwgLy8gZGlzdGFuY2UgZnJvbSBFYXJ0aCB0byBTdW4gaW4ga21cblxuICAgICAgICBwaGkgPSBhY29zKHNpbihzLmRlYykgKiBzaW4obS5kZWMpICsgY29zKHMuZGVjKSAqIGNvcyhtLmRlYykgKiBjb3Mocy5yYSAtIG0ucmEpKSxcbiAgICAgICAgaW5jID0gYXRhbihzZGlzdCAqIHNpbihwaGkpLCBtLmRpc3QgLSBzZGlzdCAqIGNvcyhwaGkpKSxcbiAgICAgICAgYW5nbGUgPSBhdGFuKGNvcyhzLmRlYykgKiBzaW4ocy5yYSAtIG0ucmEpLCBzaW4ocy5kZWMpICogY29zKG0uZGVjKSAtXG4gICAgICAgICAgICAgICAgY29zKHMuZGVjKSAqIHNpbihtLmRlYykgKiBjb3Mocy5yYSAtIG0ucmEpKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZyYWN0aW9uOiAoMSArIGNvcyhpbmMpKSAvIDIsXG4gICAgICAgIHBoYXNlOiAwLjUgKyAwLjUgKiBpbmMgKiAoYW5nbGUgPCAwID8gLTEgOiAxKSAvIE1hdGguUEksXG4gICAgICAgIGFuZ2xlOiBhbmdsZVxuICAgIH07XG59O1xuXG5cbmZ1bmN0aW9uIGhvdXJzTGF0ZXIoZGF0ZSwgaCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLnZhbHVlT2YoKSArIGggKiBkYXlNcyAvIDI0KTtcbn1cblxuLy8gY2FsY3VsYXRpb25zIGZvciBtb29uIHJpc2Uvc2V0IHRpbWVzIGFyZSBiYXNlZCBvbiBodHRwOi8vd3d3LnN0YXJnYXppbmcubmV0L2tlcGxlci9tb29ucmlzZS5odG1sIGFydGljbGVcblxuU3VuQ2FsYy5nZXRNb29uVGltZXMgPSBmdW5jdGlvbiAoZGF0ZSwgbGF0LCBsbmcsIGluVVRDKSB7XG4gICAgdmFyIHQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICBpZiAoaW5VVEMpIHQuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgZWxzZSB0LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgdmFyIGhjID0gMC4xMzMgKiByYWQsXG4gICAgICAgIGgwID0gU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24odCwgbGF0LCBsbmcpLmFsdGl0dWRlIC0gaGMsXG4gICAgICAgIGgxLCBoMiwgcmlzZSwgc2V0LCBhLCBiLCB4ZSwgeWUsIGQsIHJvb3RzLCB4MSwgeDIsIGR4O1xuXG4gICAgLy8gZ28gaW4gMi1ob3VyIGNodW5rcywgZWFjaCB0aW1lIHNlZWluZyBpZiBhIDMtcG9pbnQgcXVhZHJhdGljIGN1cnZlIGNyb3NzZXMgemVybyAod2hpY2ggbWVhbnMgcmlzZSBvciBzZXQpXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gMjQ7IGkgKz0gMikge1xuICAgICAgICBoMSA9IFN1bkNhbGMuZ2V0TW9vblBvc2l0aW9uKGhvdXJzTGF0ZXIodCwgaSksIGxhdCwgbG5nKS5hbHRpdHVkZSAtIGhjO1xuICAgICAgICBoMiA9IFN1bkNhbGMuZ2V0TW9vblBvc2l0aW9uKGhvdXJzTGF0ZXIodCwgaSArIDEpLCBsYXQsIGxuZykuYWx0aXR1ZGUgLSBoYztcblxuICAgICAgICBhID0gKGgwICsgaDIpIC8gMiAtIGgxO1xuICAgICAgICBiID0gKGgyIC0gaDApIC8gMjtcbiAgICAgICAgeGUgPSAtYiAvICgyICogYSk7XG4gICAgICAgIHllID0gKGEgKiB4ZSArIGIpICogeGUgKyBoMTtcbiAgICAgICAgZCA9IGIgKiBiIC0gNCAqIGEgKiBoMTtcbiAgICAgICAgcm9vdHMgPSAwO1xuXG4gICAgICAgIGlmIChkID49IDApIHtcbiAgICAgICAgICAgIGR4ID0gTWF0aC5zcXJ0KGQpIC8gKE1hdGguYWJzKGEpICogMik7XG4gICAgICAgICAgICB4MSA9IHhlIC0gZHg7XG4gICAgICAgICAgICB4MiA9IHhlICsgZHg7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoeDEpIDw9IDEpIHJvb3RzKys7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoeDIpIDw9IDEpIHJvb3RzKys7XG4gICAgICAgICAgICBpZiAoeDEgPCAtMSkgeDEgPSB4MjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb290cyA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKGgwIDwgMCkgcmlzZSA9IGkgKyB4MTtcbiAgICAgICAgICAgIGVsc2Ugc2V0ID0gaSArIHgxO1xuXG4gICAgICAgIH0gZWxzZSBpZiAocm9vdHMgPT09IDIpIHtcbiAgICAgICAgICAgIHJpc2UgPSBpICsgKHllIDwgMCA/IHgyIDogeDEpO1xuICAgICAgICAgICAgc2V0ID0gaSArICh5ZSA8IDAgPyB4MSA6IHgyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyaXNlICYmIHNldCkgYnJlYWs7XG5cbiAgICAgICAgaDAgPSBoMjtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0ge307XG5cbiAgICBpZiAocmlzZSkgcmVzdWx0LnJpc2UgPSBob3Vyc0xhdGVyKHQsIHJpc2UpO1xuICAgIGlmIChzZXQpIHJlc3VsdC5zZXQgPSBob3Vyc0xhdGVyKHQsIHNldCk7XG5cbiAgICBpZiAoIXJpc2UgJiYgIXNldCkgcmVzdWx0W3llID4gMCA/ICdhbHdheXNVcCcgOiAnYWx3YXlzRG93biddID0gdHJ1ZTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vIGV4cG9ydCBhcyBOb2RlIG1vZHVsZSAvIEFNRCBtb2R1bGUgLyBicm93c2VyIHZhcmlhYmxlXG5pZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IFN1bkNhbGM7XG5lbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShTdW5DYWxjKTtcbmVsc2Ugd2luZG93LlN1bkNhbGMgPSBTdW5DYWxjO1xuXG59KCkpO1xuIiwiaW1wb3J0IE5pZ2h0MiwgeyBJU19CUk9XU0VSIH0gZnJvbSAnLi9uaWdodDInO1xuZXhwb3J0IGRlZmF1bHQgTmlnaHQyO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuaWYgKElTX0JST1dTRVIpIHtcbiAgKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgICB3aW5kb3cuTmlnaHQyID0gTmlnaHQyO1xuICB9KSh3aW5kb3cpO1xufVxuLyogZXNsaW50LWVuYWJsZSAqL1xuIiwiZXhwb3J0IGNvbnN0IElTX0JST1dTRVIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcblxuaW1wb3J0IFN1bkNhbGMgZnJvbSAnc3VuY2FsYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5pZ2h0MiB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzID0ge30pIHtcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5leHRlbmRTZXR0aW5ncyhzZXR0aW5ncyk7XG5cbiAgICB0aGlzLnRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAgIHNldEludGVydmFsKCgpID0+IHRoaXMudGltZShuZXcgRGF0ZSgpKSwgMTAwMCk7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvKSB0aGlzLmF1dG8odHJ1ZSk7XG5cbiAgICB0aGlzLnRoZW1lKCk7XG4gIH1cblxuICB0aW1lKG5vdykge1xuICAgIGNvbnN0IG1pZG5pZ2h0ID0gbmV3IERhdGUoKS5zZXRIb3VycygyNCwgMCwgMCwgMCk7XG5cbiAgICBpZiAoIWxvY2FsU3RvcmFnZS50aW1lKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGltZScsIEpTT04uc3RyaW5naWZ5KG1pZG5pZ2h0KSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGxvY2FsU3RvcmFnZS5sb2NhdGlvbiAmJlxuICAgICAgbm93LmdldFRpbWUoKSA+IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnRpbWUpXG4gICAgKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndGltZScpO1xuXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5jYWNoZUNsZWFyKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdsb2NhdGlvbicpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5vbkNhY2hlQ2xlYXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLnNldHRpbmdzLm9uQ2FjaGVDbGVhcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhlbWUoKSB7XG4gICAgbG9jYWxTdG9yYWdlLmRhcmsgPT09ICd0cnVlJyA/IHRoaXMuZGFyaygpIDogdGhpcy5saWdodCgpO1xuICB9XG5cbiAgYXV0byhpbml0KSB7XG4gICAgaWYgKChpbml0ICYmICFsb2NhbFN0b3JhZ2UuYXV0bykgfHwgIWluaXQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhdXRvJywgJ3RydWUnKTtcblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uQXV0byA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zZXR0aW5ncy5vbkF1dG8oKTtcbiAgICB9XG5cbiAgICBpZiAoJ2dlb2xvY2F0aW9uJyBpbiBuYXZpZ2F0b3IpIHRoaXMubXlMb2NhdGlvbigpO1xuICB9XG5cbiAgbXlMb2NhdGlvbigpIHtcbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5sb2NhdGlvbikge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLnN1Y2Nlc3MuYmluZCh0aGlzKSwgdGhpcy5lcnJvci5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5sb2NhdGlvbik7XG5cbiAgICAgIHRoaXMuY2hlY2tTdW5Qb3NpdGlvbihsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICB9XG4gIH1cblxuICBzdWNjZXNzKHBvcykge1xuICAgIGNvbnN0IGxvY2F0aW9uID0ge1xuICAgICAgbGF0aXR1ZGU6IHBvcy5jb29yZHMubGF0aXR1ZGUsXG4gICAgICBsb25naXR1ZGU6IHBvcy5jb29yZHMubG9uZ2l0dWRlXG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tTdW5Qb3NpdGlvbihsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlKTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmNhY2hlKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9jYXRpb24nLCBKU09OLnN0cmluZ2lmeShsb2NhdGlvbikpO1xuICAgIH1cbiAgfTtcblxuICBlcnJvcihlcnIpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25EZW5pZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3Mub25EZW5pZWQoKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbWFydERhcmtFcnJvcicsIHtcbiAgICAgICAgZGV0YWlsOiBlcnJcbiAgICAgIH0pXG4gICAgKTtcbiAgfTtcblxuICBjaGVja1N1blBvc2l0aW9uKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgIGNvbnN0IHRpbWVzID0gbmV3IFN1bkNhbGMuZ2V0VGltZXModGhpcy50b2RheSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gICAgY29uc3Qgc3VucmlzZSA9IHRpbWVzLnN1bnJpc2VFbmQgLSAodGltZXMuc3VucmlzZUVuZCAtIHRpbWVzLnN1bnJpc2UpIC8gMjtcbiAgICBjb25zdCBzdW5zZXQgPSB0aW1lcy5zdW5zZXQgLSAodGltZXMuc3Vuc2V0IC0gdGltZXMuc3Vuc2V0U3RhcnQpIC8gMjtcblxuICAgIGNvbnN0IHZhbHVlcyA9IHtcbiAgICAgIHN1bnJpc2U6IG5ldyBEYXRlKHN1bnJpc2UpLFxuICAgICAgc3Vuc2V0OiBuZXcgRGF0ZShzdW5zZXQpLFxuICAgICAgbGF0aXR1ZGUsXG4gICAgICBsb25naXR1ZGVcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnc21hcnREYXJrJywge1xuICAgICAgICBkZXRhaWw6IHZhbHVlc1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5hdXRvICYmIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmF1dG8pKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgbm93LmdldFRpbWUoKSA+IHN1bnJpc2UgJiYgbm93LmdldFRpbWUoKSA8IHN1bnNldCA/XG4gICAgICAgICAgdGhpcy5saWdodCgpIDpcbiAgICAgICAgICB0aGlzLmRhcmsoKTtcbiAgICAgIH1cbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25SZXNldCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zZXR0aW5ncy5vblJlc2V0KCk7XG4gIH1cblxuICBsaWdodCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25MaWdodCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zZXR0aW5ncy5vbkxpZ2h0KCk7XG5cbiAgICB0aGlzLmlzRGFyayA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MubGlnaHRDbGFzcykge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXZJZCkuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmxpZ2h0Q2xhc3MpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuZGl2SWQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5kYXJrQ2xhc3MpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmsnLCAnZmFsc2UnKTtcbiAgfVxuXG4gIGRhcmsoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9uRGFyayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zZXR0aW5ncy5vbkRhcmsoKTtcblxuICAgIHRoaXMuaXNEYXJrID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmxpZ2h0Q2xhc3MpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuZGl2SWQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5saWdodENsYXNzKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpdklkKS5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuZGFya0NsYXNzKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrJywgJ3RydWUnKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Mub25Ub2dnbGUgPT09ICdmdW5jdGlvbicpIHRoaXMuc2V0dGluZ3Mub25Ub2dnbGUoKTtcblxuICAgIHRoaXMuaXNEYXJrID8gdGhpcy5saWdodCgpIDogdGhpcy5kYXJrKCk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXV0bycsICdmYWxzZScpO1xuICB9XG5cbiAgZXh0ZW5kU2V0dGluZ3Moc2V0dGluZ3MpIHtcbiAgICBjb25zdCBkZWZhdWx0U2V0dGluZ3MgPSB7XG4gICAgICBkaXZJZDogJ2Rhcmttb2RlJyxcbiAgICAgIGxpZ2h0Q2xhc3M6ICcnLCAvLyBjbGFzcyBhZGRlZCB0byBib2R5IHdoZW4gZGFyayBtb2RlIGlzIGRpc2FibGVkXG4gICAgICBkYXJrQ2xhc3M6ICdkYXJrJywgLy8gY2xhc3MgYWRkZWQgdG8gYm9keSB3aGVuIGRhcmsgbW9kZSBpcyBlbmFibGVkXG4gICAgICBjYWNoZTogdHJ1ZSwgLy8gY2FjaGUgbG9jYXRpb24gY29vcmRpbmF0ZXMgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgY2FjaGVDbGVhcjogdHJ1ZSwgLy8gY2xlYXIgbG9jYXRpb24gY29vcmRpbmF0ZXMgaW4gbG9jYWwgc3RvcmFnZSBldmVyeWRheSBhdCBtaWRuaWdodFxuICAgICAgYXV0bzogdHJ1ZSwgLy8gZW5hYmxlIHNtYXJ0IHN3aXRjaCBvbiBzY3JpcHQgaW5pdFxuXG4gICAgICBvbkF1dG86IG51bGwsIC8vIGNhbGxiYWNrIG9uIHNtYXJ0IHN3aXRjaFxuICAgICAgb25MaWdodDogbnVsbCwgLy8gY2FsbGJhY2sgd2hlbiBkYXJrIG1vZGUgaXMgZGlzYWJsZWRcbiAgICAgIG9uRGFyazogbnVsbCwgLy8gY2FsbGJhY2sgd2hlbiBkYXJrIG1vZGUgaXMgZW5hYmxlZFxuICAgICAgb25Ub2dnbGU6IG51bGwsIC8vIGNhbGxiYWNrIG9uIGRhcmsvbGlnaHQgbW9kZSB0b2dnbGVcbiAgICAgIG9uRGVuaWVkOiBudWxsLCAvLyBjYWxsYmFjayBvbiBnZW9sb2NhdGlvbiBwZXJtaXNzaW9uIGRlaW5lZFxuICAgICAgb25DYWNoZUNsZWFyOiBudWxsLCAvLyBjYWxsYmFjayB3aGVuIGxvY2F0aW9uIGNvb3JkaW5hdGVzIGFuZCBtaWRuaWdodCB0aW1lIGluIGxvY2FsIHN0b3JhZ2UgY2xlYXJlZFxuICAgICAgb25SZXNldDogbnVsbCAvLyBjYWxsYmFjayBvbiBsb2NhbFN0b3JhZ2UgcmVzZXRcbiAgICB9O1xuXG4gICAgY29uc3QgbmV3U2V0dGluZ3MgPSB7fTtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGVmYXVsdFNldHRpbmdzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGlmIChwcm9wZXJ0eSBpbiBzZXR0aW5ncykgbmV3U2V0dGluZ3NbcHJvcGVydHldID0gc2V0dGluZ3NbcHJvcGVydHldO1xuICAgICAgZWxzZSBuZXdTZXR0aW5nc1twcm9wZXJ0eV0gPSBkZWZhdWx0U2V0dGluZ3NbcHJvcGVydHldO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdTZXR0aW5ncztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
