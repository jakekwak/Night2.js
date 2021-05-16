import Night2, { IS_BROWSER } from './night2';
export default Night2;

/* eslint-disable */
if (IS_BROWSER) {
  (function (window) {
    window.Night2 = Night2;
  })(window);
}
/* eslint-enable */
