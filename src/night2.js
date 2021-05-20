export const IS_BROWSER = typeof window !== 'undefined';

import SunCalc from 'suncalc';

export default class Night2 {
  constructor(settings = {}) {
    this.settings = this.extendSettings(settings);
    // console.log('constructor auto = ', localStorage.auto);
    // console.log('constructor dark = ', localStorage.dark);
    // console.log('constructor light = ', localStorage.light);

    this.today = new Date();

    this.time(this.today); // 바로 시작하고,  인터벌로 60분마다.

    setInterval(() => this.time(new Date()), this.settings.intervalForTime * 1000 * 60);

    if (this.settings.auto) this.auto(true); // 시작시 auto를 부름.. 여기서
    this.theme();
  }

  time(now) {
    // console.log('time now = ', now);
    const midnight = new Date().setHours(24, 0, 0, 0);

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

  theme() {
    // console.log('theme dark?', localStorage.dark);
    return localStorage.dark === 'true' ? this.dark() : this.light();
  }

  auto(init) {
    // console.log('auto(init)', init);
    // if (this.settings.auto) return; // 이미 auto가 true이면 2개의 interval이 돌고 있음
    if ((init && !localStorage.auto) || !init) {
      // console.log('set auto true', init);
      localStorage.setItem('auto', 'true');

      // setInterval(() => this.time(new Date()), this.settings.intervalForTime); // 매뉴얼 오토시 필요?
      // this.setIntervalCheckMidnight();

      if (typeof this.settings.onAuto === 'function') this.settings.onAuto();
    }

    if ('geolocation' in navigator) this.myLocation();
  }

  myLocation() {
    if (!localStorage.location) {
      // console.log('myLocation localStorage.location', localStorage.location);
      navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this));
    } else {
      const location = JSON.parse(localStorage.location);

      // console.log('myLocation location', location);

      this.checkSunPosition(location.latitude, location.longitude);
    }
  }

  success(pos) {
    // console.log('success');
    const location = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    };

    // console.log('location', location);

    this.checkSunPosition(location.latitude, location.longitude);

    if (this.settings.cache) {
      localStorage.setItem('location', JSON.stringify(location));
    }
  }

  error(err) {
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

  checkSunPosition(latitude, longitude) {
    /* eslint-disable */
    const times = new SunCalc.getTimes(this.today, latitude, longitude);
    /* eslint-enable */

    const sunrise =
      times.sunriseEnd - (times.sunriseEnd - times.sunrise) / 2 + this.settings.offset * 60 * 1000;
    const sunset = times.sunset - (times.sunset - times.sunsetStart) / 2 - this.settings.offset * 60 * 1000;

    const values = {
      sunrise: new Date(sunrise),
      sunset: new Date(sunset),
      latitude,
      longitude
    };

    // console.log('checkSunPosition values', values);

    document.dispatchEvent(
      new CustomEvent('smartDark', {
        detail: values
      })
    );

    // 시작시 한번 실행하고,  다음에 인터벌
    if (localStorage.auto && JSON.parse(localStorage.auto)) {
      // console.log('시작시 한번 실행하고,  다음에 인터벌');
      const now = new Date();

      const state = this.isDark;

      now.getTime() > sunrise && now.getTime() < sunset ? this.light() : this.dark();

      if (state !== this.isDark) {
        if (typeof this.settings.onChange === 'function') {
          this.settings.onChange(this.isDark);
        }
      }
    }

    this.intervalForCheckSunPosition = setInterval(() => {
      // console.log('interval localStorage.auto', localStorage.auto);
      if (localStorage.auto && JSON.parse(localStorage.auto)) {
        // console.log('선 포지션 체크함');
        const now = new Date();

        const state = this.isDark;

        now.getTime() > sunrise && now.getTime() < sunset ? this.light() : this.dark();

        if (state !== this.isDark) {
          if (typeof this.settings.onChange === 'function') {
            this.settings.onChange(this.isDark);
          }
        }
      }
    }, this.settings.intervalForCheckSun * 1000 * 60); // 원래 값이 100 너무 자주 체크??
  }

  reset() {
    // console.log('reset');
    localStorage.clear();
    clearInterval(this.intervalForCheckSunPosition);

    if (typeof this.settings.onReset === 'function') this.settings.onReset();
  }

  light() {
    // console.log('light mode');
    // console.log('    localStorage.auto', localStorage.auto);
    // console.log('    localStorage.dark', localStorage.dark);
    // console.log('    localStorage.time', localStorage.time);
    // console.log('    localStorage.location', localStorage.location);
    if (typeof this.settings.onLight === 'function') this.settings.onLight();

    this.isDark = false;

    if (this.settings.lightClass) {
      document.body.classList.add(this.settings.lightClass);
      // document.getElementById(this.settings.divId).classList.add(this.settings.lightClass);
    }

    document.body.classList.remove(this.settings.darkClass);
    // document.getElementById(this.settings.divId).classList.remove(this.settings.darkClass);

    localStorage.setItem('dark', 'false');
    // localStorage.setItem('auto', 'false'); // Auto 모드 Off
  }

  dark() {
    // console.log('dark mode');
    // console.log('    localStorage.auto', localStorage.auto);
    // console.log('    localStorage.dark', localStorage.dark);
    // console.log('    localStorage.time', localStorage.time);
    // console.log('    localStorage.location', localStorage.location);
    if (typeof this.settings.onDark === 'function') this.settings.onDark();

    this.isDark = true;

    if (this.settings.lightClass) {
      document.body.classList.remove(this.settings.lightClass);
      // document.getElementById(this.settings.divId).classList.remove(this.settings.lightClass);
    }

    document.body.classList.add(this.settings.darkClass);
    // document.getElementById(this.settings.divId).classList.add(this.settings.darkClass);

    localStorage.setItem('dark', 'true');
    // localStorage.setItem('auto', 'false'); // Auto 모드 Off
  }

  toggle() {
    // console.log('toggle');
    this.isDark ? this.light() : this.dark();

    if (typeof this.settings.onToggle === 'function') this.settings.onToggle(this.isDark);

    localStorage.setItem('auto', 'false'); // Auto 모드 Off
  }

  extendSettings(settings) {
    const defaultSettings = {
      // divId: 'default',
      lightClass: '', // class added to body when dark mode is disabled
      darkClass: 'dark', // class added to body when dark mode is enabled
      cache: true, // cache location coordinates in local storage
      cacheClear: true, // clear location coordinates in local storage everyday at midnight
      auto: true, // enable smart switch on script init
      intervalForCheckSun: 10, // 10분 마다 체크
      intervalForTime: 60, // 60분마다 체크
      offset: 30, // 선라이즈+30분, 선셋-30분

      onAuto: null, // callback on smart switch
      onLight: null, // callback when dark mode is disabled
      onDark: null, // callback when dark mode is enabled
      onToggle: null, // callback on dark/light mode toggle
      onChange: null, // callback on 인터발에서 불러주는 펑션
      onDenied: null, // callback on geolocation permission deined
      onCacheClear: null, // callback when location coordinates and midnight time in local storage cleared
      onReset: null // callback on localStorage reset
    };

    const newSettings = {};

    /* eslint-disable */
    for (const property in defaultSettings) {
      /* eslint-enable */
      if (property in settings) newSettings[property] = settings[property];
      else newSettings[property] = defaultSettings[property];
    }

    return newSettings;
  }
}
